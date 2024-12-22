import { searchMovie } from "./getMovie";

const getOrdinalSuffix = ( day ) =>
{
    if ( day > 3 && day < 21 ) return 'th';
    switch ( day % 10 )
    {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
};

export const formatDate = ( dateString ) =>
{
    const date = new Date( dateString );
    const day = date.getDate();
    const month = date.toLocaleString( 'default', { month: 'long' } );
    const year = date.getFullYear();
    return `${day}${getOrdinalSuffix( day )} ${month} ${year}`;
};

export const debounce = ( func, delay ) =>
{
    let timer;
    return ( ...args ) =>
    {
        clearTimeout( timer );
        timer = setTimeout( () => func( ...args ), delay );
    };
};

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
