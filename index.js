const express = require("express");
const port = 3000;
const app = express();
const model = require("./model/words");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/api/words", (req, res) => {
  res.send(model.getAll());
});

app.post("/api/words", (req, res) => {
  const result = model.add(req.body);
  res.send(result);
});

app.get("/api/words/:id", (req, res) => {
  const result = model.get(parseInt(req.params.id));
  res.send(result);
});

app.put("/api/words/:id", (req, res) => {
  const result = model.update(parseInt(req.params.id), req.body);
  res.send(result);
});

app.delete("/api/words/:id", (req, res) => {
  const result = model.remove(parseInt(req.params.id));
  res.send(result);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});

