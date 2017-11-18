/* eslint-disable */
import React, { Component } from 'react';

import moment from 'moment';
import shortid from 'shortid';
import { Header, List, Select } from 'semantic-ui-react';

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

const Metainfo = props => {
    const {meta} = props;
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
                    <List.Item>
                        <Select placeholder='Select Position' options={positions} name='position' onChange={props.onChange} selection/>
                    </List.Item>
                    <List.Item>
                        <Select placeholder='Select Language' options={languages} name='language' onChange={props.onChange} />
                    </List.Item>
                </List>
            </div>
        </div>
    )

}

export default Metainfo;
