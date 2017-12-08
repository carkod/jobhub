/* eslint-disable */
import React, { Component } from 'react';
import moment from 'moment';
import shortid from 'shortid';

const positions = [
    { key: shortid.generate(), value: 'Front-end', text: 'Front-end Developer' }, 
    { key: shortid.generate(), value: 'Business', text: 'Business Analyst' }, 
]
const languages = [
    { key: shortid.generate(), value: 'es_ES', text: 'Spanish (Spain)' }, 
    { key: shortid.generate(), value: 'en_GB', text: 'English (UK)' }, 
    { key: shortid.generate(), value: 'en_US', text: 'English (US)' }, 
    { key: shortid.generate(), value: 'zh-CN', text: 'Chinese (China)' }, 
]

export { positions, languages };