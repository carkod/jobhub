import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import axios from 'axios';

it('connect to back application API endpoint', async () => {
  // expect.assertions(1);
  const data = await axios.get(process.env.REACT_APP_API_URL + '/cvs');
  expect(data).toBeDefined();
  expect(data.status).toEqual(200)
})

