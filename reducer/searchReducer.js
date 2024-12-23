export const initialState = {
    query: "",
    results: [],
    isLoading: false,
    error: null,
    isDropdownVisible: false,
};
    
export const searchReducer = ( state, action ) =>
{
    switch ( action.type )
    {
        case "START_SEARCH":
            return { ...state, isLoading: true, error: null, results: [] };
        case "SEARCH_SUCCESS":
            return { ...state, isLoading: false, results: action.payload };
        case "SEARCH_ERROR":
            return { ...state, isLoading: false, error: action.payload };
        case "SET_QUERY":
            return { ...state, query: action.payload };
        case "TOGGLE_DROPDOWN":
            return { ...state, isDropdownVisible: action.payload };
        case "CLEAR_QUERY":
            return { ...state, query: "", isDropdownVisible: false };
        default:
            return state;
    }
};