/* eslint-disable */
import React, { Component } from 'react';

import moment from 'moment';
import shortid from 'shortid';
import { Header, List, Dropdown, Segment } from 'semantic-ui-react';
// import {positions, languages} from '../Categories';


const Metainfo = props => {
    const {meta, categories} = props;
    let position = 'Select Position', language = 'Select Locale', status = 'Select Status';
    const positions = props.categories.find(i => i.label === 'positions').children;
    const languages = props.categories.find(i => i.label === 'locales').children;
    const statuses = props.categories.find(i => i.label === 'statuses').children;
    
    if (!!categories[0]._id  && meta) {
        
        const positionIndex = positions.findIndex(v => v.value.toLowerCase() === meta.cats.position.toLowerCase());
        position = meta.cats.position && positionIndex !== -1 ? meta.cats.position.toLowerCase() : 'Select Position';    
            
        const languageIndex = languages.findIndex(v => v.value === meta.cats.locale);
        language = !!meta.cats.locale && languageIndex !== -1 ? meta.cats.locale : 'Select Locale';
        
        const statusIndex = statuses.findIndex(v => v.value === meta.cats.status);
        status = meta.cats.status && statusIndex !== -1 ? meta.cats.status : 'Select Status';    
    }
    
    return (
        <div id="metainfo">
            <Header as='h1'>
                <input className="fullwidth_input" type="text" name="name" value={meta.name} onChange={props.name} />
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
                                                 
                    </Segment.Group>
                    
                    {!!categories[0]._id ? 
                    <Segment.Group horizontal>
                        
                        <Segment>
                            <Dropdown placeholder={language} options={languages} value={language} onChange={props.onChange} name='locale' selection />
                        </Segment>
                        
                        <Segment>
                            <Dropdown placeholder={status} options={statuses} value={status} onChange={props.onChange} name='status' selection />
                        </Segment>
                    
                        <Segment>
                            <Dropdown placeholder={position} options={positions} value={position} onChange={props.onChange} name='position' selection />
                        </Segment>
                    </Segment.Group>
                    : ''}
                    
                </Segment.Group>
                
            </div>
        </div>
    )

}

export default Metainfo;
