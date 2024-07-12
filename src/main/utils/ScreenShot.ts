import { test, Page, TestInfo } from '@playwright/test';
import { ImageWrite } from './ImageWrite';
import { UtilGeneric } from './UtilGeneric';



const utils = new UtilGeneric();
const imageWrite = new ImageWrite();
export class ScreenShot {
  readonly page: Page;
  testName: string;
  testinfo: TestInfo;
  ls;
  triggerControl = 0;
  control: number;
  dateFolderAsign: string;
  dateLocal: string;


  constructor(page: Page, testinfo: TestInfo, ls) {
    this.page = page;
    this.testinfo = testinfo;
    this.ls = ls;
    this.control = this.triggerControl;
    let date = new Date();

    this.dateFolderAsign = date.getDate().toString() + date.getMonth().toString() + date.getFullYear().toString() + date.getMilliseconds().toString();
  }


  titlePad(testName: string, dirname: string) {
    let path = dirname.substring(66, dirname.length - 8);
    this.testName = this.testinfo.title + '\\' + utils.replaceAll(path, '\\', '-') + '-' + utils.replaceAll(testName, ' ', '-') + '-' + 'firefox';

  }

  async fullScreenShot(fullPage?: boolean) {

    let conta;
    let img;
    let dateNow = new Date();
    let valor = parseInt(this.ls("valor")) + 1;

    if (valor >= 1) {
      conta = valor
    }
    let valorst = valor.toString();
    while (valorst == "0") {
      valor = conta;
      valorst = valor.toString();
      this.ls("valor", valorst);
    }
    let path = './test-results/ouputWithOut' + valor + '.png';
    let url = await this.page.url().toString();

    if (fullPage == undefined) {
      img = await this.page.screenshot({ path: path, fullPage: true });

      this.testinfo.attach('screen' + valor, { body: imageWrite.escribirImagen(this.dateFolderAsign, this.control, img, url, dateNow.toLocaleString(), valor, this.testinfo), contentType: 'image/png' });
      this.ls("valor", valorst);
      this.control = 1;
    } else {
      img = await this.page.screenshot({ path: path, fullPage: fullPage });

      this.testinfo.attach('screen' + valor, { body: imageWrite.escribirImagen(this.dateFolderAsign, this.control, img, url, dateNow.toLocaleString(), valor, this.testinfo), contentType: 'image/png' });
      this.ls("valor", valorst);
      this.control = 1;


    }
  }

  getPath() {
    return imageWrite.getPaht().toString();
  }


  bufferReturn(screen, conta) {
    this.testinfo.attach('screen' + conta, { body: screen, contentType: 'image/png' });
  }


  async screenshotWithScroll(cont: number, box: any) {

    await this.page.waitForTimeout(500)
    if (box) {
      let contaScreen = 0;
      const y = box.y;

      for (let index = 0; index < cont; index++) {
        await this.page.mouse.wheel(0, y);


        await this.fullScreenShot(false)



      }
    }
  }



}