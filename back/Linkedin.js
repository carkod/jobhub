import axios from 'axios';
import querystring from 'querystring';

const IN = (app) => {
    
    app.get('/api/linkedin', (req, res) => {
        const {error} = req.query;
        const {error_description} = req.query;
        const {code} = req.query;
        const {state} = req.query;
        
        if (error) {
            new Error(error);
        }
        
        handshake(req.query.code, res, state);
        
    });
    
}

const handshake = (code, ores, state) => {
  //set all required post parameters
    
    const config = {
        url: 'https://www.linkedin.com/oauth/v2/accessToken',
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        params: {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: 'http://cv-generator-carkod.c9users.io:8081/api/linkedin',//should match as in Linkedin application setup
            client_id: '78n5odk9nuiotg',
            client_secret: '7Q1pIbXkNWbXMzWa',
            state: state,
        },
        paramsSerializer: function(params) {
            return querystring.stringify(params)
        },
    }
    
    axios(config).then(resp => {
        const {access_token} = resp;
        const {expires_in} = resp;
        console.log(resp);
    }).catch(error => {
        console.log('error in axios request');
    }).then(() => ores.redirect('http://cv-generator-carkod.c9users.io:8080/jobs/linkedin'));
    
}

export { IN };