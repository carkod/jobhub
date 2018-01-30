import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import axios from 'axios';
import API_URL from './actions/dev';



it('connect to back application API endpoint', async () => {
  // expect.assertions(1);
  const data = await axios.get(API_URL + '/cvs');
  expect(data).toBeDefined();
  expect(data.status).toEqual(200)
})

