'use strict';

var config = {
    development: {
        port: '8081',
        //url to be used in link generation
        url: 'http://cv-generator-carkod.c9users.io'
        //mongodb connection settings
        // database: {
        //     host:   '127.0.0.1',
        //     port:   '27017',
        //     db:     'site_dev'
        // },
        //server details
        // server: {
        //     host: '127.0.0.1',
        //     port: '3422'
        // }
    },
    production: {
        //url to be used in link generation
        url: 'http://www.carloswu.xyz',
        port: '8081'
        //mongodb connection settings
        // database: {
        //     host: '127.0.0.1',
        //     port: '27017',
        //     db:     'site'
        // },
        // //server details
        // server: {
        //     host:   '127.0.0.1',
        //     port:   '3421'
        // }
    }
};
module.exports = config;