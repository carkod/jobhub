import axios from 'axios';
import querystring from 'querystring';

const frontendURL = 'http://cv-generator-carkod.c9users.io:8080/cv/';
const backendURL = 'http://cv-generator-carkod.c9users.io:8081/api/linkedin';

let id, code, state, error, error_description;

const IN = (app) => {
    
    app.get('/api/linkedin', (req, res) => {
        if (req.query.id) {
            id = req.query.id;
        } else if (!req.query.id && req.query.code) {
            code = req.query.code;
            state = req.query.state;
            handshake(req.query.code, res, state);
        } else if (req.query.error) {
            error = req.query.error
            error_description = req.query.error_description;
            new Error(error);
        }
        
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
        //console.log(resp);
    }).catch(error => {
        console.log('error in axios request');
    }).then(() => ores.redirect(frontendURL + 'id=' + id));
    
}

export { IN };