import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { DataDTO } from './data-dto';

@Injectable()
export class FormAutomationService {
  private readonly logger = new Logger(FormAutomationService.name);

  async fillFormWithData(headless: string, formData: DataDTO[]) {
    try {
      const isHeadLess = headless === 'false' ? false : true;
      const browser = await puppeteer.launch({
        headless: isHeadLess,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();

      const formUrl = 'https://bukabantuan.bukalapak.com/form/175';
      this.logger.log('Loading form...');
      await page.goto(formUrl);
      this.logger.log('form is loaded');
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

      this.logger.log('Filled the form data..');
      this.logger.log('Submitting the form');
      const submitButtonSelector = 'button[type="submit"]';
      await page.click(submitButtonSelector);
      await page.waitForNavigation({ timeout: 40000 });

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
      return 'Form submitted successfully';
    } catch (err: any) {
      this.logger.error(err);
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

  async waitForErrorMessage(page: puppeteer.Page, browser: puppeteer.Browser) {
    try {
      const errorMessageSelector = '.bl-snackbar div';
      page
        .waitForSelector(errorMessageSelector, { timeout: 50000 })
        .then(async (msg) => {
          const errorMessage = await page.$eval(
            errorMessageSelector,
            (element) => element.textContent,
          );
          this.logger.log(errorMessage);
          if (
            errorMessage.trim() ==
            'Saat ini kamu belum bisa kirim form. Coba lagi nanti.'
          ) {
            this.logger.log(errorMessage);
            await browser.close();
            throw new Error(
              'At this time you cannot send the form. Try again later.',
            );
          }
        });

      // Get the text content of the error message
    } catch (err) {
      console.log(err);
    }
  }
}
