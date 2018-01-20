'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CLs;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Schemas = require('./Schemas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Compile model from schema
//import { ObjectId } from 'mongodb';
var CLModel = _mongoose2.default.model('CLModel', _Schemas.CLSchema);

function CLs(app, db) {

    app.get('/api/cls', function (req, res) {

        CLModel.find({}, null, { sort: { updatedDate: -1 }, new: true }, function (err, content) {
            if (err) throw err;
            //console.log(content)
            res.json(content);
        });
    });

    app.post('/api/cls', function (req, res) {
        var r = req.body,
            cv;

        if (!r._id) {
            // Create New
            cv = new CLModel({
                _id: _mongoose2.default.Types.ObjectId(),
                name: r.name || 'Enter name'
            });
        } else {
            // Update
            cv = new CLModel({
                _id: r._id,
                name: r.name,
                slug: r.slug,
                cats: {
                    position: r.cats.position,
                    locale: r.cats.locale,
                    cvCountry: r.cats.cvCountry
                },
                image: r.image,
                desc: r.desc
            });
        }
        console.log(r);
        var id = r._id || cv._id;
        delete r._id;
        CLModel.update({ _id: id }, cv, { upsert: true }, function (err, msg) {

            if (err) {
                throw err;
            } else {

                if (msg.ok) {
                    var savedID = id;
                    res.json({ _id: savedID, status: !!msg.ok });
                    //console.log('changes saved!')  
                } else {
                    res.json({ status: !!msg.ok });
                    //console.log('No changes')  
                }
            }
        });
    });

    app.get('/api/cls/:_id', function (req, res) {
        if (req.params._id) {
            CLModel.findById(req.params._id, function (err, cv) {
                if (!err) {
                    res.json({ cv: cv });
                } else {
                    res.json({ message: err });
                }
            });
        } else {

            var response = {
                message: "Todo could not be deleted deleted"
            };
            res.send(response);
        }
    });

    // Copy action
    app.post('/api/cls/:_id', function (req, res) {
        var r = req.body,
            cl = void 0;

        if (req.params._id) {

            cl = new CLModel({
                _id: _mongoose2.default.Types.ObjectId(),
                name: r.name,
                slug: r.slug,
                cats: {
                    position: r.cats.position,
                    locale: r.cats.locale,
                    cvCountry: r.cats.cvCountry
                },
                image: r.image,
                desc: r.desc
            });

            var id = r._id || cl._id;
            delete r._id;
            CLModel.update({ _id: id }, cl, { upsert: true }, function (err, msg) {

                if (err) {
                    throw err;
                } else {

                    if (msg.ok) {
                        var savedID = id;
                        res.json({ _id: savedID, status: !!msg.ok });
                        //console.log('changes saved!')  
                    } else {
                        res.json({ status: !!msg.ok });
                        //console.log('No changes')  
                    }
                }
            });
        } else {
            var response = {
                message: "Todo could not be copied"
            };

            res.send(response);
        }
    });

    app.delete('/api/cls/:_id', function (req, res) {
        if (req.params._id) {
            CLModel.findByIdAndRemove(req.params._id, function (err, cv) {
                if (!err) {
                    var deletedID = req.params._id;
                    res.json({ _id: deletedID });
                } else {

                    res.json({ message: err });
                }
            });
        } else {

            var response = {
                message: "Todo could not be deleted deleted"
            };

            res.send(response);
        }
    });
}
/*
var obj = {
            _id : '',
            slug:'front-end-developer-cv',
            lang: 'en',
            position: [
                {
                    title: 'front-end',
                    lang:'en'
                },
                {
                    title: 'business',
                    lang:'en'
                }
            ],
            content: {
                summary: ['123456', '456789'],
                details: {
                    name: 'Carlos',
                    surname: 'Wu Fei',
                    phone: '07926734842',
                    photo: 'foto-cv.jpg',
                    nationality: 'Spanish',
                    Address: '40 Millrise',
                },
                work_exp: [
                        {
                        date: '08/2016 – now',
                        company: 'Eventure Internet Ltd.',
                        jobtitle: 'Front-end developer. Web designer. Project support.',
                        description: 'Design team, front-end developer and web designer (C# MVC, Javascript, HTML5, CSS3). Offshore team management. Project support (issue tracking, quality assurance, stakeholder&#39;s management). Agile development.',
                        },
                        {
                          date: '05/2015 – 12/2015',
                          company: 'Fourcats Media S.L.',
                          jobtitle: 'Front-end developer / Web designer at Fourcats Media.',
                          description: 'Successfully implemented graphic design mockups into HTML5 and CSS in www.todopapas.com and www.canastilladelembarazo.com both responsive as of now. jQuery was used for improved interactions with user, Bootstrap for responsive design, on a cakePHP back-end architecture. Newsletters were sent to clients through OpenX and PHP list.',
                        },
                    ],
                education : [ 
                        {
                        date: '08/2016 – now',
                        institution: 'BCSM',
                        diploma: 'Master’s degree in Business Management Consulting',
                        description: 'Design team, front-end developer and web designer (C# MVC, Javascript, HTML5, CSS3). Offshore team management. Project support (issue tracking, quality assurance, stakeholder&#39;s management). Agile development.',
                        },
                        {
                          date: '05/2015 – 12/2015',
                          institution: 'University Carlos III of Madrid',
                          diploma: 'Bachelor\'s degree in Business Management (English)',
                          description: 'Successfully implemented graphic design mockups into HTML5 and CSS in www.todopapas.com and www.canastilladelembarazo.com both responsive as of now. jQuery was used for improved interactions with user, Bootstrap for responsive design, on a cakePHP back-end architecture. Newsletters were sent to clients through OpenX and PHP list.',
                        },
                    ],
                webdev: [
                        {
                            name: 'HTML',
                            description: 'HTML5',
                            level: '95%',
                        },
                        {
                        name: 'CSS',
                            description: 'CSS3',
                            level: '95%'
                        },
                        {
                            name: 'Javascript',
                            description: 'DOM Manipulation, ES6',
                            level: '85%'
                        },
                    ],
            }
        };*/