export default function Api(app) {
  app.get('/api', (req, res) => {
      return res.status(200).json({"message": "API v1 is online!"})
  });
}
