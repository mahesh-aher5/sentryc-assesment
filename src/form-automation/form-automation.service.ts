import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { DataDTO } from './data-dto';

@Injectable()
export class FormAutomationService {
  async fillFormWithData(headless: string,formData: DataDTO[]) {
    try {
      const isHeadLess = headless === 'false' ? false : true
      const browser = await puppeteer.launch({
        headless: isHeadLess,
      });
      const page = await browser.newPage();

      const formUrl = 'https://bukabantuan.bukalapak.com/form/175';

      await page.goto(formUrl);

      for (const item of formData) {
        const { type, name, value } = item;
        if (type === 'input') {
          await page.type(`input[name="${name}"]`, value);
        } else if (type === 'textarea') {
          await page.type(`textarea[name="${name}"]`, value);
        } else if (type === 'img') {
          await this.uploadFiles(page, name, value);
        } else if (type === 'radio') {
          await this.clickOnRadio(page, name, value);
        }
      }

      await page.click("[type='checkbox']");

      const submitButtonSelector = 'button[type="submit"]';
      await page.click(submitButtonSelector);
      await page.waitForNavigation({timeout:40000});

      const pageContent = await page.evaluate(() => {
        return document.body.textContent;
      });
      if (
        pageContent.includes(
          'Terima kasih. Kamu telah masuk antrian layanan BukaBantuan.',
        )
      ) {
        await browser.close();
      }

      await browser.close();
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }

  async clickOnRadio(page: puppeteer.Page, name: string, value: string) {
    await page.$eval(`input[name="${name}"][value="${value}"]`, (radio) => {
      radio.click();
    });
  }

  async uploadFiles(page: puppeteer.Page, name: string, value: string) {
    const fileHtmlInput = (await page.$(`input[name="${name}"]`)) as any;
    await fileHtmlInput.uploadFile('./img.png');
  }
}
