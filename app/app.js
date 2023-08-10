
const bodyParser = require('body-parser');
const express = require("express");
const axios = require('axios');
const puppeteer = require('puppeteer');
const porta = 1603;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



  app.post("/convert/url-pdf", (req, res, next) => {
    
    
      
      req.body.arquivo='anexos/'+performance.now()+'-'+Math.random()+'documento.pdf';
      
      (async () => {
        // Iniciar o Puppeteer
        const browser = await puppeteer.launch({
          executablePath: '/usr/bin/google-chrome-stable'
          // outras opções de configuração
        });
        const page = await browser.newPage();
      
        // Definir as margens do PDF
        const margin = {
          top: '15mm',
          bottom: '15mm',
          left: '10mm',
          right: '10mm'
        };
        try{
          // Navegar para a URL desejada
          await page.goto(req.body.anexo);
        }catch(error){
          console.log('error');
          res.end('error');
          return 0;
        }
        // Capturar o PDF com margens definidas
        const pdfBuffer = await page.pdf({
          format: 'A4',
          margin,
          printBackground: true
        });
      
        // Fechar o navegador
        await browser.close();

        // Salvar o PDF em um arquivo
        const fs = require('fs');
        console.log(pdfBuffer);
        fs.writeFileSync(req.body.arquivo, pdfBuffer);
        

        req.body.TIPO='convert';
          console.log(req.body)
        axios.post(req.body.webhook, req.body)
        .then(response => {
            console.log('Resposta:', response);
        })
        .catch(error => {
        //console.error('Erro:', error);
        });        


      })();
      return res.status(200).json({arq:req.body.arquivo,'type':'webhook'});

  });

  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ mensagem: 'Corpo da requisição não é um JSON válido' });
    }
    next();
  });

  app.use(express.static(path.join(__dirname, 'anexos')));

  app.listen(porta, () => {
    console.log("servidor rodando na porta " + porta);
  });