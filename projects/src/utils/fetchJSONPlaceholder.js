import axios from 'axios';

function fetchJSONPlaceholder(link){

    try{
        const fetchJSON = axios.get(link);
        return fetchJSON
    }
    catch{
        throw Error('Error: FetchAPI JSON Failed');
    }

}

export default fetchJSONPlaceholder