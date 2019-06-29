
import base64 from 'base-64';

// const fakeAuth = {
//     isAuthenticated: false,
//     authenticate(cb) {
//       this.isAuthenticated = true;
//       setTimeout(cb, 100); // fake async
//     },
//     signout(cb) {
//       this.isAuthenticated = false;
//       setTimeout(cb, 100);
//     }
//   };


export default function fakeAuth () {
  
  console.log(user)

let headers = new Headers();


// //headers.append('Content-Type', 'text/json');
// headers.append('Authorization', 'Basic' + base64.encode(username + ":" + password));

// fetch(url, {method:'GET',
//         headers: headers,
//         //credentials: 'user:passwd'
//        })
// .then(response => response.json())
// .then(json => console.log(json));
//.done();

  // function parseJSON(response) {
  // return response.json()
  // }
}
