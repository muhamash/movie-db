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