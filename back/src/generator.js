import dotenv from "dotenv";
import puppeteer from "puppeteer";
import moment from "moment";

dotenv.config();

export function buildInternalPdfUrl(viewPath) {
  if (
    typeof viewPath !== "string" ||
    !viewPath.startsWith("/") ||
    viewPath.startsWith("//")
  ) {
    throw new Error("PDF view path must be an internal absolute path");
  }

  const baseOrigin =
    process.env.PDF_INTERNAL_ORIGIN ||
    process.env.BACK_INTERNAL_ORIGIN ||
    `http://127.0.0.1:${process.env.BACK_PORT || 3000}`;
  const baseUrl = new URL(baseOrigin);

  if (!["http:", "https:"].includes(baseUrl.protocol)) {
    throw new Error("PDF internal origin must use http or https");
  }

  const url = new URL(viewPath, baseUrl);

  if (url.origin !== baseUrl.origin || !url.pathname.startsWith("/pdf/view/")) {
    throw new Error("PDF generation can only navigate to internal PDF views");
  }

  return url.toString();
}

function getPuppeteerLaunchOptions() {
  const launchOptions = {
    devtools: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: "new",
    dumpio: true,
  };
  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;

  if (executablePath) {
    launchOptions.executablePath = executablePath;
  }

  return launchOptions;
}

export async function generatePDF(viewPath, title, updatedDate) {
  let browser;

  try {
    const url = buildInternalPdfUrl(viewPath);

    // launch a new chrome instance
    browser = await puppeteer.launch(getPuppeteerLaunchOptions());

    // create a new page
    const page = await browser.newPage();

    // set your html as the pages content
    await page.goto(url, {
      waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"],
    });

    // Generates a PDF with 'screen' media type.
    await page.emulateMediaType("screen");

    const currentDate = moment().format("DD/MM/YYYY");
    const pdfBuffer = await page.pdf({
      printBackground: true,
      format: "A4",
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
      },
    });

    return pdfBuffer;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
