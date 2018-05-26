//const API_URL = "http://node18.codenvy.io:47083/api";
//const API_URL = "http://jobhub-carkodesign834441.codeanyapp.com:8081/api";
let API_URL, PDF_URL; 
if (process.env.NODE_ENV === "development") {
    // API_URL = `https://cv-generator-carkod.c9users.io:8081/api`;
    // PDF_URL = `https://cv-generator-carkod.c9users.io:8081/pdf`;    
    API_URL = `localhost:8081/api`;
    PDF_URL = `localhost:8081/pdf`;   
} else {
    API_URL = `http://carloswu.xyz:8081/api`;
    PDF_URL = `http://carloswu.xyz:8081/pdf`;    
}

export {API_URL, PDF_URL};
