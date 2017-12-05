import axios from 'axios';
import querystring from 'querystring';

const personID = '620093172';
const url = `https://api.linkedin.com/v2/people/id=${personID}`;

const name = {
    name: 'Carlos'
}

const UpdateProfile = (resp) => {
    const config = {
        url: url,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        /*params: {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: 'http://cv-generator-carkod.c9users.io:8081/api/linkedin',//should match as in Linkedin application setup
            client_id: '78n5odk9nuiotg',
            client_secret: '7Q1pIbXkNWbXMzWa',
            state: state,
        },
        paramsSerializer: function(params) {
            return querystring.stringify(params)
        },*/
    }
    
    const data = {
  "patch": {
    "$set": {
      "birthDate": {
        "day": 1,
        "month": 1,
        "year": 1974
      }
    }
  }
}
    
    axios(config)
    
    console.log(resp)
}


export { UpdateProfile };