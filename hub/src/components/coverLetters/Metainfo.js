/* eslint-disable */
import React, { Component } from 'react';

import moment from 'moment';
import shortid from 'shortid';
import { Header, List, Select, Segment } from 'semantic-ui-react';
import {positions, languages} from '../Categories';


const Metainfo = props => {
    const {meta} = props;
    
    const positionIndex = positions.findIndex(v => v.value === meta.cats.position);
    const position = meta.cats.position ? positions[positionIndex].text : 'Select position';
    const languageIndex = languages.findIndex(v => v.value === meta.cats.locale);
    const language = meta.cats.locale ? languages[languageIndex].text : 'Select language';
    
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
                    <Segment><Select placeholder={position} options={positions} name='position' onChange={props.onChange} selection/></Segment>
                    <Segment><Select placeholder={language} options={languages} name='locale' onChange={props.onChange} /></Segment>
                    <Segment></Segment>
                  </Segment.Group>
                </Segment.Group>
            </div>
        </div>
    )

}

export default Metainfo;
