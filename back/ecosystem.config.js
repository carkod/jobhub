module.exports = {
  apps : [
      {
        name: "JobHub Back-end",
        script: "dist/server.js",
        //watch: true,
        env_production: {
            "PORT": 8081,
            "NODE_ENV": "production",
        }
      }
  ]
}