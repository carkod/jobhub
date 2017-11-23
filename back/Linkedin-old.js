import Linkedin from 'node-linkedin';

const clientID = '860ovzjwbapxf9';
const authorization = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id={clientID}&redirect_uri=http%3A%2F%2Fcv-generator-carkod.c9users.io%3A8080%2F&state=48295620&scope=r_basicprofile`;
const callbackURL = 'http://cv-generator-carkod.c9users.io:8081/api/linkedin';

const li = Linkedin(clientID, 'zzz9PHYftEZ2Guvn', IN);
li.auth.setCallback('callback-url');


const accessToken = 'AQT0qvp7h2M3Z4-BhffPXgbKzY3IfKqAWDx2vBD9mz8qtza573OtqnRcXiNDaMhg1CS7YCMFPvrvh_WLkQEuGp-SZqDTdPezT283OTQIpmcGN6Syzg1HjKZk5KqBF7Zx4cDReXWeVswMfA6nGT0';

let linkedin = Linkedin.init(accessToken, {
    timeout: 10000 
});

const scope = ['r_basicprofile', 'r_fullprofile', 'r_emailaddress', 'r_network', 'r_contactinfo', 'rw_nus', 'rw_groups', 'w_messages'];


const IN = (app) => {
    
    app.get('/api/linkedin', (req, res) => {
       app.get('/oauth/linkedin', function(req, res) {
        Linkedin.auth.authorize(res, scope, '48295620');
            linkedin.people.me( (err, user) => { 
                if (err) throw err;
                console.log (user); 
                
            });
        });
    });
    
}

export { IN };
/*export default function Linkedin (app) {
    
    
        
    app.post('/api/cvs', (req, res) => {
        

    });
    
    app.delete('/api/cvs/:_id', (req, res) => {
        
    });
}*/