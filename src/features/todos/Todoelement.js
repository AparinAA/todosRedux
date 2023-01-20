import React from 'react';

function Todoelement(props) {
    const { id, text } = props.todo;

    return (
        <div>
            <label htmlFor={id}>
                <input type="checkbox" id={id} />
                {text}
            </label>
        </div>
    );
}

export default Todoelement;