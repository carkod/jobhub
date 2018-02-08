/* eslint-disable */
import React, { Component } from 'react';

import moment from 'moment';
import shortid from 'shortid';
import { Header, List, Dropdown, Segment } from 'semantic-ui-react';
// import {positions, languages} from '../Categories';


const Metainfo = props => {
    const {meta, categories} = props;
    let position, language, status;
    const positions = props.categories.find(i => i.label === 'positions').children;
    const languages = props.categories.find(i => i.label === 'locales').children;
    const statuses = props.categories.find(i => i.label === 'statuses').children;
    
    if (!!categories[0]._id  && meta) {
        
        const positionIndex = positions.findIndex(v => v.value === meta.cats.position.toLowerCase());
        position = meta.cats.position ? positions[positionIndex].text : 'Select position';    
    }
    console.log(position)    
    /*if (!languages.length && meta) {
        
        const languageIndex = languages.findIndex(v => v.value === meta.cats.locale.toLowerCase());
        language = meta.cats.locale ? languages[languageIndex].text : 'Select language';
        
    }*/
    // if category is undefined I still want to render the UI
    
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
                        {!!categories[0]._id ? 
                        <Segment>
                            <Dropdown placeholder={!!categories[0]._id ? '' : 'Select Position'} options={positions} value={meta.cats.position.toLowerCase()} onChange={props.onChange} name='position' selection />
                        </Segment>
                         : ''}
                    
                    </Segment.Group>
                
                </Segment.Group>
                
            </div>
        </div>
    )

}

export default Metainfo;
