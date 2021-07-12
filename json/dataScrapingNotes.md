# gg-travel-emissions

using data from https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2021

# csv to json

using the conversion-factors-2021-flat-file-automatic-processing.xls

https://docs.google.com/spreadsheets/d/1Gmk10xHCrDHMAMf6BjtzPH04tNbtw7CemRGubHeTB2Q/edit?usp=sharing
https://www.convertcsv.com/csv-to-json.htm => []

```
const data =
[]
.filter(x=>x.Measure.indexOf('km')>-1)
.reduce((accum,x,i,arr)=>{
let keystring = Object.keys(x).filter((y,j)=>j<4).reduce((ks,y,j,arr2)=>{return ks += x[y] + "|" },"").replace(/\|+$/, "");
if(accum[keystring]===undefined){
accum[keystring] = new Object();
}

accum[keystring][x.Gas] = x.GasValue;
return accum;
},{})
```
