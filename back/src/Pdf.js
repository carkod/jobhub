

export default function Pdf(app, db) {
  app.use('/pdf/assets', express.static(__dirname + '/pdf/assets'));
  app.use('/pdf/assets/vendor', express.static(__dirname + '/node_modules/semantic-ui-css'));
  app.set('views', __dirname + '/pdf/views');
  app.set('view engine', 'jsx');
  app.engine('jsx', require('express-react-views').createEngine());

  app.get('/pdf/fullprint/:id', (req, res, next) => {
      const { id } = req.params;
      CVModel.findOne({ _id: id }, (findErr, content) => {
          if (findErr) throw findErr;
          res.render('FullPrint.jsx', content, (err, html) => {
              if (err) throw err;
              res.send(html)
          })

      })
  })

    app.get('/pdf/quickprint/:id', (req, res, next) => {
        const { id } = req.params;
        CVModel.findOne({ _id: id }, (findErr, content) => {
            if (findErr) throw findErr;
            res.render('QuickPrint.jsx', content, (err, html) => {
                if (err) throw err;
                res.send(html)
            })

        })
    })

    app.get('/pdf/fullprint-esp/:id', (req, res, next) => {
        const { id } = req.params;
        CVModel.findOne({ _id: id }, (findErr, content) => {
            if (findErr) throw findErr;
            res.render('FullPrint.esp.jsx', content, (err, html) => {
                if (err) throw err;
                res.send(html)
            })

        })
    })

    app.get('/pdf/quickprint-esp/:id', (req, res, next) => {
        const { id } = req.params;
        CVModel.findOne({ _id: id }, (findErr, content) => {
            if (findErr) throw findErr;
            res.render('QuickPrint.esp.jsx', content, (err, html) => {
                if (err) throw err;
                res.send(html)
            })

        })
    })

    app.get('/pdf/generate/:id', (req, res, next) => {

        const { id } = req.params;

        CVModel.findOne({ _id: id }, function (err, content) {
            if (err) throw err;
            let printType, printType2, headerText;

            printType = 'f';
            printType2 = 'q';
            headerText = 'Currilum Vitae';

            Promise.all([generatePDF(req, content, printType, headerText), generatePDF(req, content, printType2, headerText)]).then(links => {
                content.pdf = links;
                res.status(200).send(content)
            })
                .catch((e) => {
                    console.log('hello Error', e)
                })

        })
        //return next();
    });

    app.get('/pdf/coverletter/:id', (req, res, next) => {
        const { id } = req.params;
        CLModel.findOne({ _id: id }, function (findErr, content) {
            if (findErr) throw findErr;
            res.render('CoverLetter.jsx', content, (err, html) => {
                if (err) throw err;
                res.send(html)
            })

        })
    })

    app.get('/pdf/generateCl/:id', (req, res, next) => {
        const { id } = req.params;

        CLModel.findOne({ _id: id }, function (err, content) {
            if (err) throw err;
            console.log(content)
            const printType = 'cl';
            const headerText = 'Cover Letter';
            Promise.all([generatePDF(req, content, printType, headerText)]).then(links => {
                content.pdf = links[0].link;
                res.status(200).send(content)
            })
            .catch((e) => {
                console.log('hello Error', e)
            })
        })
    });
}
    