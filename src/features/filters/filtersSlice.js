export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed',
};

const initialState = {
    status: StatusFilters.All,
    colors: []
};

const ACTION_TYPE = {
    'filters_statusFilterChanged': 'filters/statusFilterChanged',
    'filters_colorFilterChanged': 'filters/colorFilterChanged'
};


export default function filtersReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPE.filters_statusFilterChanged:
            return {
                ...state,
                status: action.payload
            }
        case ACTION_TYPE.filters_colorFilterChanged:
            const { color } = action.payload;
            const index = state.colors.indexOf(color);
            if (index === -1) {
                return {
                    ...state,
                    colors: state.colors.splice(index, 1)
                }
            }
            return {
                ...state,
                colors: state.colors.push(color)
            }
        default:
            return state;
    }
}

export const colorFilters = (color, changeType) => {
    return {
        type: 'filters/colorFilterChanged',
        payload: { color, changeType }
    }
}