const express = require("express")
const app = express();
const PORT = 8083;
const TOKEN = process.env.PRERENDER_TOKEN;
app.use(
  require("prerender-node").set("prerenderToken", [TOKEN])
);
app.listen(PORT, () => console.log(`Server rendering is up listening on port ${PORT}`));
