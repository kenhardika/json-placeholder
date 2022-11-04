import axios from 'axios';

function editAPI(data){
try{
    let response =
    axios.put(`https://jsonplaceholder.typicode.com/users/${data.id}`, data
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

export default editAPI