/* eslint-disable */
import React, { Component } from 'react';

import moment from 'moment';
import shortid from 'shortid';
import { Header, List, Select, Segment } from 'semantic-ui-react';


const Metainfo = props => {
    const {meta,cats} = props;
    
    let positions = cats.find(i => i.label === 'positions');
    positions = positions.children === undefined ? [] : positions.children;
    let languages = cats.find(i => i.label === 'locales')
    languages = languages.children === undefined ? [] : languages.children;
    let statuses = cats.find(i => i.label === 'statuses')
    statuses = statuses.children === undefined ? [] : statuses.children;
    
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
                <Segment.Group>
                  <Segment.Group horizontal>
                    <Segment><b>Created</b>: {moment(meta.createdAt).calendar()}</Segment>
                    <Segment><b>Updated</b>: {moment(meta.updatedAt).calendar()}</Segment>
                    <Segment><b>PDF</b>: {meta.pdf.map((p,i) => 
                        <a key={shortid.generate()} href={p.link}>{'Cover Letter'}</a>
                    )}</Segment>
                  </Segment.Group>
                  <Segment.Group horizontal>
                    <Segment><Select placeholder={meta.cats === undefined ? 'Select Position' : meta.cats.position} options={positions} name='position' onChange={props.onChange} selection/></Segment>
                    <Segment><Select placeholder={meta.cats === undefined ? 'Select Locale' : meta.cats.language} options={languages} name='locale' onChange={props.onChange} /></Segment>
                    <Segment></Segment>
                  </Segment.Group>
                </Segment.Group>
            </div>
        </div>
    )

}

export default Metainfo;
