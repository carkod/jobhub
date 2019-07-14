module.exports = {
  apps : [
      {
        name: "JobHub Back-end",
        script: "back/dist/src/server.js",
        //watch: true,
        env_production: {
            "PORT": 8081,
            "NODE_ENV": "production",
        }
      }
  ]
}