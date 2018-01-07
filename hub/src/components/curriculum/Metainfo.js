/* eslint-disable */
import React, { Component } from 'react';

import moment from 'moment';
import shortid from 'shortid';
import { Header, List, Select } from 'semantic-ui-react';

const positions = [
    { key: shortid.generate(), value: 'Front-end developer', text: 'Front-end Developer' }, 
    { key: shortid.generate(), value: 'Business', text: 'Business Analyst' }, 
]
const languages = [
    { key: shortid.generate(), value: 'es_ES', text: 'Spanish (Spain)' }, 
    { key: shortid.generate(), value: 'en_GB', text: 'English (UK)' }, 
    { key: shortid.generate(), value: 'en_US', text: 'English (US)' }, 
    { key: shortid.generate(), value: 'zh-CN', text: 'Chinese (China)' }, 
]

const statuses = [
    { key: shortid.generate(), value: 'public', text: 'Public' }, 
    { key: shortid.generate(), value: 'draft', text: 'Draft' }, 
    { key: shortid.generate(), value: 'private', text: 'Private' },
    { key: shortid.generate(), value: 'revision', text: 'Revision' }, 
]

const Metainfo = props => {
    const {meta} = props;
    const positionIndex = positions.findIndex(v => v.value === meta.cats.position);
    const position = meta.cats.position ? positions[positionIndex].text : 'Select position';
    const languageIndex = languages.findIndex(v => v.value === meta.cats.locale);
    const language = meta.cats.locale ? languages[languageIndex].text : 'Select language';
    const statusIndex = statuses.findIndex(v => v.value === meta.cats.status);
    const status = meta.cats.status ? statuses[statusIndex].text : 'Select status';
    
    return (
        <div id="metainfo">
            <Header as='h1'>
                <input type="text" name="name" value={meta.name} onChange={props.onChange} />
                <Header.Subheader>{meta._id}</Header.Subheader>
            </Header>
            <div className="section">
                <Header sub>
                    META
                </Header>
                <List>
                    <List.Item><b>Created</b>: {moment(meta.createdAt).calendar()}</List.Item>
                    <List.Item><b>Updated</b>: {moment(meta.updatedAt).calendar()}</List.Item>
                    <List.Item><b>Slug</b>: {meta.slug}</List.Item>
                    <List.Item>
                        <Select placeholder={status} options={statuses} name='status' onChange={props.onChange} />
                    </List.Item>
                    <List.Item>
                        <Select placeholder={position} options={positions} name='position' onChange={props.onChange} selection/>
                    </List.Item>
                    <List.Item>
                        <Select placeholder={language} options={languages} name='locale' onChange={props.onChange} />
                    </List.Item>
                </List>
            </div>
        </div>
    )

}

export default Metainfo;
