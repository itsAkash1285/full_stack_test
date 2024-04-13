const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./route/auth");
const { connectToDB } = require("./db/db");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({
  origin: "*", // Change this to your frontend's origin
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

connectToDB();

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

