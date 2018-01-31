/* eslint-disable */
import React, { Component } from 'react';

const matchCV = (item) => {
  const checkStatus = item.cats.status === 'public';
  const checkPos = item.cats.position !== '' || item.cats.position !== undefined;
  const checkPDF = item.pdf !== '' || item.pdf !== undefined;
  
  if (checkStatus && checkPos && checkPDF) {
    return item
  } else {
    //console.log('no match');
    return false
  }
  
}

export {matchCV};