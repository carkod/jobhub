let API_URL, PDF_URL; 
if (process.env.NODE_ENV === "development") {
<<<<<<< HEAD
    API_URL = `http://localhost:8081/api`;
    PDF_URL = `http://localhost:8081/pdf`;    
=======
    // API_URL = `https://cv-generator-carkod.c9users.io:8081/api`;
    // PDF_URL = `https://cv-generator-carkod.c9users.io:8081/pdf`;    
    API_URL = `http://localhost:8081/api`;
    PDF_URL = `http://localhost:8081/pdf`;   
>>>>>>> fba7f0530dc9e208b3335df8602b36bd8fda325a
} else {
    API_URL = `http://carloswu.xyz:8081/api`;
    PDF_URL = `http://carloswu.xyz:8081/pdf`;    
}

export {API_URL, PDF_URL};
