import React from 'react';

function Header(props) {
    return (
        <header className="header">
            <input
                className="new-todo"
                placeholder="What needs to be done?"
            />
        </header>
    );
}

export default Header;