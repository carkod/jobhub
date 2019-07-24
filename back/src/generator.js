import wkhtmltopdf from 'wkhtmltopdf';
import moment from 'moment';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv'

dotenv.config()

// CRITIAL!! If no folder, wkhtmltopdf will fail
const dir = path.join(__dirname, '../', '/docs');

// remote host api.carloswu.com (not application host localhost:9000)
const host = process.env.NODE_ENV === "development" ? process.env.ENV_DEV : process.env.ENV_PROD

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

export default function generatePDF(req, data, printType, headerText) {
    let options, pdfURL, url;
    let { locale } = data.cats;
    const { _id } = data;

    if (printType === 'f' && locale === 'es-ES') {

        url = req.protocol + '://' + req.get('host') + '/pdf/fullprint-esp/' + _id;
    } else if (printType === 'q' && locale === 'es-ES') {
        url = req.protocol + '://' + req.get('host') + '/pdf/quickprint-esp/' + _id;
    } else if (printType === 'f' && locale !== 'es-ES') {
        url = req.protocol + '://' + req.get('host') + '/pdf/fullprint/' + _id;
    } else if (printType === 'q' && locale !== 'es-ES') {
        url = req.protocol + '://' + req.get('host') + '/pdf/quickprint/' + _id;
    } else if (printType === 'cl') {
        url = req.protocol + '://' + req.get('host') + '/pdf/coverletter/' + _id;
    } else {
        url = req.protocol + '://' + req.get('host') + '/pdf/fullprint/' + _id;
    }

    if (printType === 'q' || printType === 'f') {

        if (locale !== undefined && locale === 'es-ES') {
            const footerURL = 'www.carloswu.xyz';
            const name = data.name.replace(/\s/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            const position = data.cats.position;
            const updated = 'Actualizado ' + moment(data.updatedAt).year();
            const folder = path.join(__dirname, '../', '/docs');
            // const folder = 'docs';
            const uri = folder + `/CarlosWu-${name}-${printType}-${_id}.pdf`;
            const relativeUri = `/docs/CarlosWu-${name}-${printType}-${_id}.pdf`;
            options = {
                output: uri,
                ignore: ['QFont::setPixelSize: Pixel size <= 0 (0)', 'QPainter::begin():'],
                headerRight: `${footerURL}`,
                footerRight: '[page]',
                footerLeft: `${updated}`,
                minimumFontSize: 12,
                headerFontSize: 8,
                footerFontSize: 8,
                enableSmartShrinking: false,
                enableExternalLinks: true,
                enableInternalLinks: true,
                lowquality: true,
                marginTop: 12,
                marginBottom: 12,
                marginLeft: 12,
                marginRight: 12
            }

            pdfURL = {
                name: printType === 'q' ? 'Quick Version' : 'Full Version',
                value: printType,
                link: host + relativeUri,

            }

        } else {
            const footerURL = 'www.carloswu.xyz';
            const name = data.name.replace(/\s/g, '').replace(/[^A-Za-z0-9]/g, '-');
            const position = data.cats.position;
            const updated = 'Updated ' + moment(data.updatedAt).year();
            const folder = path.join(__dirname, '../', '/docs');
            const uri = folder + `/CarlosWu-${name}-${printType}-${_id}.pdf`;
            const relativeUri = `/docs/CarlosWu-${name}-${printType}-${_id}.pdf`;
            options = {
                output: uri,
                ignore: ['QFont::setPixelSize: Pixel size <= 0 (0)', 'QPainter::begin():'],
                headerRight: `${footerURL}`,
                footerRight: '[page]',
                headerLeft: `${headerText} - ${position}`,
                footerLeft: `${updated}`,
                minimumFontSize: 12,
                headerFontSize: 8,
                footerFontSize: 8,
                enableSmartShrinking: false,
                enableExternalLinks: true,
                enableInternalLinks: true,
                lowquality: true,
                marginTop: 12,
                marginBottom: 12,
                marginLeft: 12,
                marginRight: 12
            }

            pdfURL = {
                name: printType === 'q' ? 'Quick Version' : 'Full Version',
                value: printType,
                link: host + relativeUri,

            }
        }
    } else if (printType === 'cl') {
        const footerURL = 'www.carloswu.xyz';
        const name = data.name.replace(/\s/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        const folder = path.join(__dirname, '../', '/docs');
        const uri = folder + `/CarlosWu-${name}-${printType}-${_id}.pdf`;
        const relativeUri = `/docs/CarlosWu-${name}-${printType}-${_id}.pdf`;
        options = {
            output: uri,
            ignore: ['QFont::setPixelSize: Pixel size <= 0 (0)', 'QPainter::begin():'],
            headerRight: `Carlos Wu`,
            footerRight: '[page]',
            footerLeft: `Generated by ${footerURL}`,
            minimumFontSize: 12,
            headerFontSize: 8,
            footerFontSize: 8,
            enableSmartShrinking: false,
            enableExternalLinks: true,
            enableInternalLinks: true,
            lowquality: true,
            marginTop: 12,
            marginBottom: 12,
            marginLeft: 12,
            marginRight: 12
        }

        pdfURL = {
            name: 'Cover Letter default version',
            value: printType,
            link: host + relativeUri,
        }
    }

    return new Promise((ok, fail) => {
        wkhtmltopdf(url, options, (err) => {
            if (err) {
                console.log('wkhtmltopdf promise failed')
                fail(err);
            } else {
                console.log('wkhtmltopdf promise passed')
                ok(pdfURL);
            }

        });
    });

}