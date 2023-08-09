

const express = require("express");
const porta = 1603;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

  app.post("/convert/url-pdf", (req, res, next) => {s
  

      res.send("já existe");
  });


  app.listen(porta, () => {
    console.log("servidor rodando na porta " + porta);
  });