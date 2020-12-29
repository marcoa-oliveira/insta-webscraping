const puppeteer = require('puppeteer');
const fs = require('fs');

const user = ''
 
(async () => {
  const lauchOptions = {headless: false, args:['--start-maximized'], defaultViewport: null}
  const browser = await puppeteer.launch(lauchOptions); //abre o brownser   .launch({headless: false}) faz com que a janela do navegador 
  const page = await browser.newPage(); //abre uma nova aba                                                      seja exibida
  await page.goto(`https://www.instagram.com/"${user}"/`); //abre um determinado site
  //await page.screenshot({path: 'instagram.png'});


  const imgList = await page.evaluate(() => {
      //toda a função será executada no browser

      //selecionar todas as imagens que estão na área de posts
      const nodeList = document.querySelectorAll('article img')
      
      //transformar o nodeListImg em array
      const imgArray = [...nodeList] //espalha nodeList no array
      
      //transformar os elementos html do array (nodes) em objetos JS
      const imgList = imgArray.map( ({src}) => ({ //retorna direto um objeto com o atributo src da imagem
          src
      }))

      //passar para fora da função
      return imgList

  })

  //escrever dados em um arquivo local
  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
      if(err) throw new Error('Algo deu errado!')
      console.log('Tudo Certo!')
  })  //JSON.stringify(dado, null, formatação do array)

  //await browser.close();    
  
})(); // (func () => {...})()   função autoexecutável

//--------------EXPLICAÇÃO---------------------------
//seria o mesmo que:
// async function run(){
//   const browser = await puppeteer.launch(); //abre o brownser
//   const page = await browser.newPage(); //abre uma nova aba
//   await page.goto('https://example.com'); //abre um determinado site
//   await page.screenshot({path: 'example.png'});
 
//   await browser.close();
// }

// run()

//----------------------------------------------------


