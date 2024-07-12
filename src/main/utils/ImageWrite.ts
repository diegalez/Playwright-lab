import * as fs from 'fs';
export class ImageWrite {

   path4: string;

   getPaht() {
      return this.path4;

   }

   escribirImagen(dateFolder, triggerControl, imgPath, url: string, fechaHora, path, testInfo) {

      const { createCanvas, Image } = require('canvas')// importa canvas
      const img = new Image();

      img.src = imgPath;
      const width = img.width; //ancho alto
      const height = img.height;
      const canvas = createCanvas(width, height + 70);
      const context = canvas.getContext('2d');// objeto texto

      context.drawImage(img, 0, 0);
      // context.fillStyle = '#00f'
      context.fillStyle = '#fff';
      context.fillRect(0, height, width, 70);
      context.font = 'bold 12pt Sans'; // si se cambia la fuente cambiar el higt del la fecha
      context.textAlign = 'end';
      context.textBaseline = 'hanging';
      context.fillStyle = '#000';
      const text = 'URL: ' + url;
      const textWidth = context.measureText(text).width;

      if (textWidth < width - 10) {
         context.fillStyle = '#000';
         context.fillText(text, textWidth + 2, height + 1, width - 20);

      } else {

         context.fillStyle = '#000';
         context.fillText(text, width, height + 1, width - 5);

      }
      context.fillStyle = '#000';
      context.font = 'bold 12pt Sans';
      let fecha = fechaHora;
      let fechaWidth = context.measureText(fecha).width;
      context.fillText(fecha, fechaWidth + 2, height + 20);

      if (triggerControl == 0) {
         fs.mkdirSync("./Resultados/" + testInfo.title + " " + dateFolder);
         const path4 = './Resultados/' + testInfo.title + " " + dateFolder;
         this.path4 = path4;

      }
      const buffer: Buffer = canvas.toBuffer('image/png')
      fs.writeFileSync('./Resultados/' + testInfo.title + " " + dateFolder + '/ouput' + path + '.png', buffer)


      return buffer;



   }

   borrarImagen(path) {

      const fs = require('fs')
      try {
         fs.unlink(path)

      } catch (err) {
         console.error('Something wrong happened removing the file', err)
      }

   }

}