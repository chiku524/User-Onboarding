import React from 'react';

const Team = props => {
    return (
        <div className='teamMember'>
            Name: {props.name} <br />
            Email: {props.email} <br />
            Role: {props.role} <br />
        </div>
    )
}

export default Team;