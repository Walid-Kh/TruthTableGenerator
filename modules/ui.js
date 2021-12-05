
/** 
 * @param {string[]} x 
 * @param {string} expression 
 * @param {Map} values 
 * @param {string[]} result 
 */
export const ui = (x, values ,expression, result) =>
 {
   const table = document.querySelector("table");
   table.innerHTML = "";
   // ! less than or equal because we have to include the x row
   for (let i = 0; i <= Math.pow(2,x.length);i++)
   {
     const row = document.createElement("tr"); 
     let inRow = "";
     if (i === 0)
     {
       for (let j in x)
         inRow += `<th>${x[j]}</th>\n`;
       inRow+=`<th>${expression}</th>\n`;
     }
     else 
     {
       for (let j in x)
         inRow += `<td>${values.get(x[j])[i-1]? "T" : "F"}</td>\n`;
       inRow += `<td>${parseInt(result[i-1])? "T" : "F"}</td>\n`;
     }
     row.innerHTML = inRow; 
     table.append(row); 
   }
 }
