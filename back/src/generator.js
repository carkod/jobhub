import dotenv from 'dotenv';
import puppeteer from 'puppeteer';

dotenv.config()

export async function generatePDF(url) {
    // launch a new chrome instance
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true,
    })

    // create a new page
    const page = await browser.newPage()
  
    // set your html as the pages content
    await page.goto(url)
  
    // create a pdf buffer
    const pdfBuffer = await page.pdf({
      format: 'A4',
      displayHeaderFooter: true,
      footerTemplate: '<div><div class="pageNumber"></div></div>',
      headerTemplate: 'Curriculum vitae - Updated: <div class="date"></div>',
      margin: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
      }
    });

    // close the browser
    await browser.close()
    return pdfBuffer;
}
