/* eslint-disable */

const redirect_uri = 'http%3A%2F%2Fcv-generator-carkod.c9users.io%3A8081%2Fapi%2Flinkedin';

export function authorization (id) {
    const API_URL = 'http://cv-generator-carkod.c9users.io:8081/api/linkedin?id=' + id;
    fetch(API_URL).then(res => window.location = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78n5odk9nuiotg&redirect_uri=${redirect_uri}&state=48295620`)
}