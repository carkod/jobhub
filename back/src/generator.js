import dotenv from 'dotenv';
import puppeteer from 'puppeteer';

dotenv.config()

export async function generatePDF(url, title, updatedDate) {
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
      footerTemplate: `
        <div style="
          color: #000; 
          font-size: 12px;
          font-family: "Source Sans Pro", sans-serif;
          height: 100%;
          position: relative;
          ">
          <div class="pageNumber" style="position: absolute; top: 800px; right: 250px;"></div>
        </div>
      `,
      headerTemplate: `
        <div style="
          width:100%;
          color: #000;
          font-size: 12px;
          font-family: "Source Sans Pro", sans-serif;
          float: right;
          position: relative;
        ">
          <span style="text-transform: capitalize; position: absolute; top: 10px; left: 10px;">
            ${title}
          </span>
          <span style="position: absolute; top: 10px; right: 210px;">
             Updated: ${updatedDate}
          </span>
        </div>
      `,
      margin: {
        top: 70,
        bottom: 70,
        left: 70,
        right: 70,
      }
    });

    // close the browser
    await browser.close()
    return pdfBuffer;
}
