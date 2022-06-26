import { TWENTYTWOBUDGET } from '../budget.js';
import fetch from 'node-fetch';

export async function setDefaultBudget() {
  console.log('jr setDefaultBudgetJSON');

  for (let i = 0; i < TWENTYTWOBUDGET.length; i++) {
    console.log('jr i', i);
    try {
      fetch('http://localhost:5000/api/v1/budget', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...TWENTYTWOBUDGET[i] }),
      });
    } catch (e) {
      console.error(e);
    }
  }
  // const map = TWENTYTWOBUDGET.map((item) => {

  // });
  // console.log('jr map', map);
  // await Promise.all([map]);
}

setDefaultBudget();
