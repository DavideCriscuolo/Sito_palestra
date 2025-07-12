const express = require("express");
const app = express();
app.use(express.json());
const port = 3080;
const gymRouter = require("./routes/gym");
// app.use(express.static("public"))  per assets statici
app.use("/gym", gymRouter);

app.listen(port, () => {
  console.log(`Sto ascoltando il server alla porta http://localhost:${port}`);
});
