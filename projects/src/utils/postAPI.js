import axios from 'axios';

function postAPI(data){
try{
    let response =
    axios.post('https://jsonplaceholder.typicode.com/users', data
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

export default postAPI