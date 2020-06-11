import React, {useState} from 'react';

const Form = (props) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        terms_of_service: false
    })

    const formSubmit = (event) => {
        event.preventDefault();
    }

    const inputChange = (event) => {
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setUser({...user, [event.target.name]: event.target.value });
    }

    return (
        <form onSubmit={formSubmit}>
            <label htmlFor="user">User
                <label htmlFor='name'>Name
                    <input type='text' placeholder='name' name='name' value={user.name} onChange={inputChange} /> <br />
                </label>
                <label htmlFor='email'>Email
                    <input type='text' placeholder='email' name='email' value={user.email} onChange={inputChange} /> <br />
                </label>
                <label htmlFor='password'>Password
                    <input type='text' placeholder='password' name='password' value={user.password} onChange={inputChange} /> <br />
                </label>
                <label htmlFor='terms_of_service'>I have read the Terms and Conditions
                    <input type='checkbox' name='terms_of_service' onChange={inputChange} checked={user.terms_of_service} /> <br />
                </label>
                <button>Submit</button>
            </label>
        </form>
    )
}

export default Form;