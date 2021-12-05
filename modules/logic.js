let Operator = new Map();
Operator.set("!", 2);
Operator.set("&", 1);
Operator.set("|", 0);
let isOperand = function (char) {
  let res = false;
  switch (char) {
    case "|":
    case "&":
    case "!":
      res = true;
      break;
    default:
      break;
  }
  return res;
};
let isBool = function (char) {
  let res = false;
  switch (char) {
    case "1":
    case "0":
      res = true;
      break;
    default:
      break;
  }
  return res;
};
function infixToPostfix(expression) {
  let postfix = [];
  let stack = [];
  for (let i = 0; i < expression.length; i++) {
    if (isBool(expression[i])) postfix.push(expression[i]);
    else if (isOperand(expression[i])) {
      while (Operator.get(stack[stack.length-1]) > Operator.get(expression[i]))
        postfix.push(stack.pop());
      stack.push(expression[i]);
    } else if (expression[i] === "(") {
      stack.push(expression[i]);
    } else if (expression[i] === ")") {
      while (stack[stack.length - 1] !== "(") postfix.push(stack.pop());
      stack.pop();
    }
  }
  while (stack.length) {
    postfix.push(stack.pop());
  }
  console.log(postfix);
  return postfix;
}
export function logicParser(E) {
  let expression = Array.from(infixToPostfix(E));
  let stack = [];
  let res = "";
  while (expression.length) {
    if (isBool(expression[0])) stack.push(parseInt(expression.shift()));
    if (isOperand(expression[0])) 
    {
      if (expression[0] === "!")
      {
        expression.splice(0,1);
        const x = stack.pop(); 
        stack.push(!x? 1 : 0); 
      }
      if (expression[0] === "&")
      {
        expression.splice(0,1);
        const x = stack.pop(); 
        const z = stack.pop(); 
        stack.push((x&&z)? 1 : 0); 
      }
      if (expression[0] === "|"){
        expression.splice(0,1);
        const x = stack.pop(); 
        const z = stack.pop();
        stack.push((x||z)? 1 : 0);
      }
    }
  }
  return stack.pop();
}

/* const logic = (expression) =>
{
  expression = Array.from(expression);
  while(expression.length >= 2)
  {
    // ! NOT Operator
    for (let i = 0; i < expression.length; i++)
    {
      if (expression[i] === '!')
      {
        const resNot = (expression[i+1] === "1")? "0" : "1";
        expression.splice(i,2,resNot);
      }
    }
    // & And operator
    for (let i = 0; i < expression.length; i++)
    {
      if (expression[i] === '&')
      {
        const resAnd = (expression[i-1] === "1" && expression[i+1] === "1")? "1" : "0";
        expression.splice(i-1,3,resAnd);
      }
    }
    // | Or operator
    for (let i = 0; i < expression.length; i++)
    {
      if (expression[i] === '|')
      {
        const resOR = (expression[i-1] === "0" && expression[i+1] === "0")? "0" : "1";
        expression.splice(i-1,3,resOR);
      }
    }
  }
  return expression[0] ;
}
export default logic ;  */
