/* eslint-disable */
import React, { Component } from 'react';

import moment from 'moment';
import shortid from 'shortid';
import { Header, List, Dropdown, Segment } from 'semantic-ui-react';
import {positions, languages} from '../Categories';


const Metainfo = props => {
    const {meta, categories} = props;
    // if category is undefined I still want to render the UI
    
    const positionIndex = positions.findIndex(v => v.value === meta.cats.position);
    const position = meta.cats.position ? positions[positionIndex].text : 'Select position';
    const languageIndex = languages.findIndex(v => v.value === meta.cats.locale);
    const language = meta.cats.locale ? languages[languageIndex].text : 'Select language';
    
    //const statusIndex = statuses.findIndex(v => v.value === meta.cats.locale);
    // const language = meta.cats.locale ? languages[languageIndex].text : 'Select language';
    
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
                        {meta.pdf !== undefined ? meta.pdf.map((el,i) => 
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
