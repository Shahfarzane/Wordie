const express = require("express");
const port = 3000;
const app = express();


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/api/words", (req, res) => {
  res.send(model.getAll());
});

app.post("/api/words", (req, res) => {
  const result = model.add(req.body);
  res.send(result);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
