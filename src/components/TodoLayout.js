import React from 'react';

function TodoLayout({ children }) {
    return (
        <div className='todoapp'>
            {children}
        </div>
    );
}

export default TodoLayout;