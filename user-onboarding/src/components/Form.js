import React, {useState, useEffect} from 'react';
import axios from 'axios';
import * as yup from 'yup';
import Team from './Team';

const Form = (props) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        terms_of_service: false,
        role: 'Android Developer'
    })

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        terms_of_service: '',
        role: ''
    })

    const [post, setPost] = useState([]);

    const [buttonDisabled, setButtonDisabled] = useState("");

    const formSchema = yup.object().shape({
        name: yup.string().required("Name is a required field"),
        email: yup.string().email("Must be a valid email").required(),
        password: yup
            .string()
            .required("Please enter your password")
            .min(8, "Password is too short - should be 8 characters minimum.")
            .matches(/[a-zA-Z@]/),
        terms_of_service: yup.boolean().oneOf([true], "Please agree to terms of service"),
        role: yup.string()
    })

    useEffect(() => {
        formSchema.isValid(user).then((valid) => {
            setButtonDisabled(!valid);
        })
    }, [user, formSchema]);

    const validate = (event) => {
        yup
          .reach(formSchema, event.target.name)
          .validate(event.target.value)
          .then((valid) => {
            setErrors({
              ...errors,
              [event.target.name]: "",
            });
          })
          .catch((error) => {
              console.log(error.errors)
            setErrors({
              ...errors,
              [event.target.name]: error.errors[0]
            });
            
          });
      };

    const formSubmit = (event) => {
        event.preventDefault();
        axios.post('https://reqres.in/api/users', user)
            .then((response => {
                setPost([...post, response.data]);
                console.log(post);
                setUser({
                    name: '',
                    email: '',
                    password: '',
                    terms_of_service: '',
                    role: ''
                })
            }))
            .catch((error) => {
                console.log(error)
            })
    }

    const inputChange = (event) => {
        event.persist();
        const newFormData = {
          ...user,
          [event.target.name]:
            event.target.type === "checkbox" ? event.target.checked : event.target.value,
        };
        validate(event);
        setUser(newFormData);
      };

    return (
        <div>
            <form onSubmit={formSubmit} className='form'> 
                <label htmlFor='name'>Name
                    <input type='text' data-cy='name' placeholder='name' name='name' value={user.name} onChange={inputChange} /> {errors.email.length > 0 ? <p className='error'>{errors.email}</p> : null} <br />
                </label>
                <label htmlFor='email'>Email
                    <input type='text' data-cy='email' placeholder='email' name='email' value={user.email} onChange={inputChange} /> <br />
                </label>
                <label htmlFor='password'>Password
                    <input type='text' data-cy='password' placeholder='password' name='password' value={user.password} onChange={inputChange} /> {errors.password.length > 0 ? <p className='error'>{errors.password}</p> : null} <br />
                </label>
                <label htmlFor='terms_of_service'>I have read the Terms and Conditions
                    <input type='checkbox' data-cy='terms_of_service' name='terms_of_service' onChange={inputChange} checked={user.terms_of_service} /> <br />
                </label>
                <label htmlFor='role'>Role
                    <select name='role' data-cy='role' value={user.role} onChange={inputChange}>
                        <option value='Android Developer'>Android Developer</option>
                        <option value='iPhone Developer'>iPhone Developer</option>
                        <option value='Full-stack Developer'>Full-stack Developer</option>
                        <option value='Back-end Developer'>Back-end Developer</option>
                        <option value='Front-end Developer'>Front-end Developer</option>
                        <option value='Data Science'>Data Science</option>    
                    </select> <br />
                </label>
                <button disabled={buttonDisabled} data-cy='submit'>Submit</button>
            </form>
            {post.map((user) => (<Team className='teamMember' name={user.name} email={user.email} terms_of_service={user.terms_of_service} role={user.role} /> ))}
        </div>
    )
}

export default Form;