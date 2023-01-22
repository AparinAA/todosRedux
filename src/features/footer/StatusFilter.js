import React from "react";
import filtersReducer from '../filters/filtersSlice';

const StatusFilter = ({ value: status, onChange }) => {
    const renderedFilters = Object.keys(filtersReducer).map((key) => {
        const value = filtersReducer[key]
        const handleClick = () => onChange(value)
        const className = value === status ? 'selected' : ''

        return (
            <li key={value}>
                <button className={className} onClick={handleClick}>
                    {key}
                </button>
            </li>
        )
    })

    return (
        <div className="filters filtersReducer">
            <h5>Filter by Status</h5>
            <ul>{renderedFilters}</ul>
        </div>
    )
}

export default StatusFilter;