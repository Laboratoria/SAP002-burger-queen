import React from 'react';

function Toggle(props) {
    return (
    <>
        <input className="Toggle" type={props.type} name={props.name}
        id={props.id} value={props.value} onChange={props.onChange} checked={props.checked}/>
    </>
    );
}

export default Toggle;