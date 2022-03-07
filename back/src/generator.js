import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import moment from "moment";

dotenv.config()

export async function generatePDF(url, title, updatedDate) {
  try {
    // launch a new chrome instance
    const browser = await puppeteer.launch({
      devtools: true,
      args: ['--no-sandbox', "--disable-setuid-sandbox"],
      headless: true,
      dumpio: true,
    })

    // create a new page
    const page = await browser.newPage()

    // set your html as the pages content
    await page.goto(url, { waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"]})

    // Generates a PDF with 'screen' media type.
    await page.emulateMediaType('screen');

    const currentDate = moment().format("DD/MM/YYYY");
    const pdfBuffer = await page.pdf({
      printBackground: true,
      format: 'A4',
      displayHeaderFooter: true,
      footerTemplate: `
        <div style="
          color: #000; 
          font-size: 8px;
          font-family: "Source Sans Pro", Arial, sans-serif;
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
          <span style="text-transform: capitalize; position: absolute; top: 10px; left: 10px; font-size: 8px;">
            ${title}
          </span>
          <span style="position: absolute; top: 10px; right: 210px; font-size: 8px;">
             updated: ${updatedDate}, generated: ${currentDate}
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

    browser.close()
  
    return pdfBuffer;
  } catch (e) {
    throw e;
  }
    
}
