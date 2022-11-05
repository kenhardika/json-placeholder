import axios from 'axios';

function deleteAPI(dataid){
try{
    let response =
    axios.delete(`https://jsonplaceholder.typicode.com/users/${dataid}`
    ,{
        headers: {
            'Content-Type': 'application/json' 
          }      
    }
    );
    return response
  }
catch{
    throw Error('Error Fetch API');
  }
}

export default deleteAPI