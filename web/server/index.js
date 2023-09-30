const express = require("express")
const app = express();
const PORT = 8083;
const TOKEN = process.env.PRERENDER_TOKEN;
const fetchBlogApi = require("../../src/actions/blog")
// app.use(
//   require("prerender-node").set("prerenderToken", [TOKEN])
// );
// static resources should just be served as they are
app.use(express.static(
  path.resolve(__dirname, '..', 'build'),
  { maxAge: '30d' },
));

app.get('/blog/:id', (req, res, next) => {
  fs.readFile(indexPath, 'utf8', async (err, htmlData) => {
      if (err) {
          console.error('Error during file reading', err);
          return res.status(404).end()
      }
      
      // get post info
      const postId = await fetchBlogApi(req.params.id);
      const post = getPostById(postId);
      if(!post) return res.status(404).send("Post not found");

      // inject meta tags
      htmlData = htmlData.replace(
          "__META_TITLE__",
          `${post.title}`
      )
      .replace('__META_OG_TITLE__', post.title)
      .replace('__META_OG_DESCRIPTION__', post.description)
      .replace('__META_DESCRIPTION__', post.description)
      .replace('__META_OG_IMAGE__', post.thumbnail)
      return res.send(htmlData);
  });
});
app.listen(PORT, () => console.log(`Server rendering is up listening on port ${PORT}`));
