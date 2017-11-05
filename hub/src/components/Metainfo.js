/* eslint-disable */
import React, { Component } from 'react';

import moment from 'moment';
import { Header, List } from 'semantic-ui-react';

const Metainfo = props => {
    const {meta} = props;

    return (
        <div id="metainfo" className="section">
            <Header as='h1'>
                <input type="text" name="name" value={meta.name} onChange={meta.onChange} />
                <Header.Subheader>{meta._id}</Header.Subheader>
            </Header>
            <div className="module">
                <Header sub>
                    <span>META</span>
                </Header>
                <List>
                    <List.Item><b>Created</b>: {moment(meta.createdAt).calendar()}</List.Item>
                    <List.Item><b>Updated</b>: {moment(meta.updatedAt).calendar()}</List.Item>
                </List>
            </div>
        </div>
    )

}

export default Metainfo;
