const path = require("path");
const fs = require("fs");
const dbFile = "db.json";
const filePath = path.join(__dirname, "..", dbFile);

if (!fs.existsSync(filePath)) {
  try {
    console.log("No database found. Creating database.");
    const defaults = { words: [] };
    write(defaults);
  } catch (ex) {
    console.error("Error in creating database.");
    process.exit(1);
  }
}

function read() {
  try {
    const jsonString = fs.readFileSync(filePath);
    return JSON.parse(jsonString);
  } catch (ex) {
    console.error(ex);
    return "Database error.";
  }
}

function write(input) {
  try {
    const data = JSON.stringify(input);
    fs.writeFileSync(filePath, data);
  } catch (ex) {
    console.error(ex);
    return "Database error.";
  }
}

function getAll() {
  const data = read();
  return data.words.length === 0
    ? [{ id: 0, title: "No entries found." }]
    : data.words;
}

function add(input) {
  const data = read();

  const id =
    data.words.length === 0 ? 1 : data.words[data.words.length - 1].id + 1;

  const entry = { id, ...input };

  data.words.push(entry);
  write(data);

  return entry;
}

function get(id) {
  const data = read();

  const result = data.words.filter((item) => item.id === id);
  return result.length === 0
    ? { id: 0, title: "No data with the given id found." }
    : result;
}

function update(id, body) {
  const data = read();

  const index = data.words.findIndex((x) => x.id === id);

  if (index > -1) {
    data.words[index] = { id, ...body };
    write(data);
    return data.words[index];
  }
  return { id: 0, title: "No data with the given id found." };
}

function remove(id) {
  const data = read();

  const index = data.words.findIndex((x) => x.id === id);

  if (index > -1) {
    const removed = data.words.splice(index, 1);
    write(data);
    return removed;
  }
  return { id: 0, title: "No data with the given id found." };
}

module.exports = {
  getAll,
  add,
  get,
  update,
  remove,
};
