
const http = require('http');
const puppeteer = require('puppeteer');

const server = http.createServer((req, res) => {
   
    if(req.url=='/favicon.ico' || req.url=='/' ){
        
        res.end('error');
        return 0;
    }  
    let linkhtml = req.url.slice(1);
    console.log(linkhtml);
    let arquivo = 'anexos/'+performance.now()+'documento.pdf';
  res.statusCode = 200;
  (async () => {
    // Iniciar o Puppeteer
    const browser = await puppeteer.launch();
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
    await page.goto(linkhtml);
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
  
    // Salvar o PDF em um arquivo
    const fs = require('fs');
    console.log(pdfBuffer);
    fs.writeFileSync(arquivo, pdfBuffer);
  
    // Fechar o navegador
    await browser.close();
  })();

  res.end(arquivo);
  
});

server.listen(3000, 'ec2-3-22-81-96.us-east-2.compute.amazonaws.com', () => {
  console.log('Servidor em execução em http://ec2-3-22-81-96.us-east-2.compute.amazonaws.com:3000/');
});


