module.exports = {
  apps : [
      {
        name: "JobHub Back-end",
<<<<<<< HEAD
        script: "dist/server.js",
=======
        script: "back/dist/server.js",
>>>>>>> 4f3ad616a89520241b914a5f7eda274665d494f1
        //watch: true,
        env_production: {
            "PORT": 8081,
            "NODE_ENV": "production",
        }
      }
  ]
}