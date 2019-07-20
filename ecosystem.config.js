module.exports = {
  apps : [
      {
        name: "jobhub",
        version: "0.9.6",
        script: "back/dist/server.js",
        //watch: true,
        env_production: {
            "PORT": 8081,
            "NODE_ENV": "production",
        }
      },
      {
        name: "jobhub-webhook",
        version: "0.0.3",
        script: "webhook.js",
        watch: "webhook.js",
        env_production: {
          "PORT": 7000,
          "NODE_ENV": "production"
        }
      }
  ]
}