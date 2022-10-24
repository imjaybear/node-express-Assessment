const Express = require("express");
const getZoos = require("./utils/getZoos.js");
const validateZip = require("./middleware/validateZip.js");
const app = Express();

app.get("/check/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  if (getZoos(zip)) {
    res.send(`${zip} exists in our records.`);
  } else {
    res.send(`${zip} does not exist in our records.`);
  }
});

app.get("/zoos/all", (req, res, next) => {
  if (req.query.admin !== "true") {
    res.send("You do not have access to that route.");
    next();
  }
  res.send(`All zoos: ${getZoos("all").join("; ")}`);
});

app.get("/zoos/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  const filterZoos = getZoos(zip).join("; ");
  if (getZoos(zip).length > 0) {
    res.send(`${zip} zoos: ${filterZoos}`);
  } else {
    res.send(`${zip} has no zoos.`);
  }
});


app.use((req, res, next) => {
  res.send("That route could not be found!");
});

app.use((err, req, res, next) => {
  res.send(err);
});

module.exports = app;