const express = require("express");
const bodyParser = require("body-parser");
// These are now route imports, not database imports!
const employee = require("./routes/employee");
const app = express();
const port = 3000;
// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
// Logging Middlewaare
app.use((req, res, next) => {
  const time = new Date();
  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});
// Use our Routes
app.use("/api/employee", employee);
app.get("/", (req, res) => {
  res.send("Work in progress!");
});
// 404 Middleware
app.use((req, res) => {
  res.status(404);
  res.json({ error: "Resource Not Found" });
});
app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});



