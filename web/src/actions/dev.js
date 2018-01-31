//const API_URL = "http://node18.codenvy.io:47083/api";
//const API_URL = "http://jobhub-carkodesign834441.codeanyapp.com:8081/api";
let API_URL;

if (process.env.NODE_ENV === "development") {
  API_URL = `https://cv-generator-carkod.c9users.io:8081/api`;  
} else if (process.env.NODE_ENV === "production") {
  API_URL = `http://carloswu.xyz:8081/api`; 
}

export default API_URL;