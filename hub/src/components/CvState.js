/* eslint-disable */
import React, { Component } from 'react';
import RichTextEditor from 'react-rte';

const CvState = (cv) => {
  
  if (cv && cv.workExp) {
    cv.workExp.map((i) => {
      if (i.desc.length < 0)
      i.desc = RichTextEditor.createEmptyValue();
    })
  } 
  
  return {
    cv: {
      _id: cv._id || '',
      name: cv.name || '',
      createdAt: cv.createdAt || '',
      updatedAt: cv.updatedAt || '',
      persdetails: cv.persdetails || { name: '', lastname: ''},
      workExp: cv.workExp || [{
          id: 'workExp-0', 
          date:'', 
          position:'', 
          company:'',
          desc: RichTextEditor.createEmptyValue(),
      }], 
      skills: {
        webdev: cv.skills.webdev || [{
          id: 'webdev-0', 
          name:'', 
          level:'', 
          desc:'',
      }],
      
      }
    },
    sysMessage: false
      
  }
}

export default CvState;