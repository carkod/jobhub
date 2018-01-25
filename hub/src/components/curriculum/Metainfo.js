/* eslint-disable */
import React, { Component } from 'react';

import moment from 'moment';
import shortid from 'shortid';
import { Header, List, Segment, Dropdown } from 'semantic-ui-react';

const positions = [
    { key: shortid.generate(), value: 'front-end', text: 'Front-end Developer' }, 
    { key: shortid.generate(), value: 'business', text: 'Business Analyst' }, 
]
const languages = [
    { key: shortid.generate(), value: 'es_ES', text: 'Spanish (Spain)' }, 
    { key: shortid.generate(), value: 'en_GB', text: 'English (UK)' }, 
    { key: shortid.generate(), value: 'en_US', text: 'English (US)' }, 
    { key: shortid.generate(), value: 'zh_CN', text: 'Chinese (China)' }, 
]

const statuses = [
    { key: shortid.generate(), value: 'public', text: 'Public' }, 
    { key: shortid.generate(), value: 'draft', text: 'Draft' }, 
    { key: shortid.generate(), value: 'private', text: 'Private' },
    { key: shortid.generate(), value: 'revision', text: 'Revision' }, 
]

const Metainfo = props => {
    const {meta, categories} = props;
    
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
                  
                  <Segment><b>Slug</b>: {meta.slug}</Segment>
                  
                    <Segment><b>PDF</b>:
                    {meta.pdf[0] !== undefined ? meta.pdf.map((el,i) => 
                         <a key={shortid.generate()} href={el.link}>{'\u00A0' + el.name + '\u00A0'}</a>
                    ) : ''}
                    </Segment>
                </Segment.Group>
                
                <Segment.Group horizontal>
                
                {categories.map((cat, i) => 
                <Segment key={i}>
                    <Dropdown placeholder={meta.cats[cat.singLabel] === undefined ? `Select ${cat.singLabel}` : meta.cats[cat.singLabel]} options={cat.children} value={meta.cats[cat.singLabel]} onChange={props.onChange} name={cat.singLabel} selection />
                </Segment>
                )}
                
                </Segment.Group>
              </Segment.Group>
              
                
            </div>
        </div>
    )

}

export default Metainfo;
