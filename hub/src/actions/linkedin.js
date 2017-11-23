/* eslint-disable */

const redirect = 'http%3A%2F%2Fcv-generator-carkod.c9users.io%3A8080%2Fjobs%2Flinkedin';

const API_URL = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78n5odk9nuiotg&redirect_uri=http%3A%2F%2Fcv-generator-carkod.c9users.io%3A8080%2F&state=48295620';

export function authorization () {
    console.log('requesting authorization')
    
    fetch(API_URL, {
       method: 'get',
       
   }).then(res => console.log(res))
}