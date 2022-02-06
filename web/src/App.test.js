import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import axios from 'axios';

it('connect to back application API endpoint', async () => {
  // expect.assertions(1);
  const data = await axios.get(buildBackUrl().apiUrl + '/cvs');
  expect(data).toBeDefined();
  expect(data.status).toEqual(200)
})

