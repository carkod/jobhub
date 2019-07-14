module.exports = {
  apps : [
      {
        name: "jobhub",
        version: "0.9.3",
        script: "back/dist/server.js",
        //watch: true,
        env_production: {
            "PORT": 8081,
            "NODE_ENV": "production",
        }
      }
  ]
}