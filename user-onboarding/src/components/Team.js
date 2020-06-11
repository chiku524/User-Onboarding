import React from 'react';

const Team = props => {
    return (
        <div className='teamMember'>
            Name: {props.name} <br />
            Email: {props.email} <br />
        </div>
    )
}

export default Team;