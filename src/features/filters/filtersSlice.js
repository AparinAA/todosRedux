const initialState = {
    status: 'All',
    colors: []
};
const ACTION_TYPE = {
    'filters_statusFilterChanged': 'filters/statusFilterChanged'
};

export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed',
}

export default function filtersReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPE.filters_statusFilterChanged:
            return {
                ...state,
                status: action.payload
            }
        default:
            return state;
    }
}