import {logicParser} from "./modules/logic.js"
import { ui } from "./modules/ui.js";

 
const form = document.querySelector('form');
const regex = /[a-z]|[A-Z]/gm;

form.addEventListener("submit", e => {
  // prevent the page from reloading
  e.preventDefault();


  // ! captures the elements & prevent doubling in the code 
  let res = [];
  let values = new Map();
  const expression = form.expression.value;
  let x = Array.from(new Set((expression).trim().match(regex)));
  for (let i in x) {
    values.set(`${x[i]}`, []);
  }
  // ! generating the truth table for the variables
  for (let i = x.length - 1; i >= 0; i--) {
    values.get(x[i]).push("");
    let flip = false;
    for (let j = 0; j < Math.pow(2, x.length); j++) {
      values.get(x[i]).push(flip);
      if ((j+1)  % Math.pow(2, x.length - (i + 1)) === 0)
        flip = !flip;
    }
    values.get(x[i]).splice(0,1);

  }
  // ! fills the truth table 
  for (let i = 0; i < Math.pow(2,x.length); i++)
  {
    let processing = Array.from(expression);
    for (let j = 0; j < processing.length; j++)
    {
      if (x.includes(processing[j]))
        {
          processing.splice(j,1,values.get(`${processing[j]}`)[i]?"1":"0");
        }
    }
    res.push(logicParser(processing));
  }
  ui(x,values,expression.toString(),res);
  form.expression.value = "";
}
);



/*
FCIH OCW youtube channel
justice harvard
*/
// on thinking for oneself author sh


// ? scraps
/* for (let i = x.length - 1; i >= 0; i--) {
  let flip = false;
  for (let j = 0; j < Math.pow(2, x.length); j++) {
    res[i].push(flip);
    if ((j + 1) % Math.pow(2, x.length - (i + 1)) === 0)
    flip = !flip;
  }
} */
