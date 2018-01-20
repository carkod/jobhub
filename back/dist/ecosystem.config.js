module.exports = {
  apps : [
      {
        name: "Back-end",
        script: "dist/server.js",
        watch: true,
        env: {
          "PORT":80,
          "NODE_ENV": "production",
        }
      }
  ]
}