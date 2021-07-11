# Demo

https://itsticks.github.io/gg-travel-emissions/

# gg-travel-emissions

using data from https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2021

# csv to json

https://docs.google.com/spreadsheets/d/1sGhxeels-EpBnzTaj76B1lWAHqdGnUSMtw93ac1lDas/edit?usp=sharing
https://docs.google.com/spreadsheets/d/1UNvhtzqIk0m287mxIvV9sm1nS-ezcPh2RrLVe7qEy5U/edit?usp=sharing
https://www.convertcsv.com/csv-to-json.htm => []

```
const data = []
.filter((x,i)=>x['model measure'].indexOf('|km')>0)
.map((x,i,arr)=>{
var item = new Object();

item.model = x['model measure'].split('|')[0];

Object.keys(x).filter((z,j)=>j>0).forEach((z,j)=>{
    var engine = z.split('|')[0];
    var emissionType = z.split('|')[1];
    if(item[engine]===undefined){
        item[engine] = new Object();
    }
    item[engine][emissionType] = arr[i][z]
})
return item;
})
.reduce((items,item,i,arr)=>{
Object.keys(item).filter((y,j)=>j>0)
.forEach((engineType)=>{
    items[`${item.model}|${engineType}`] = item[engineType];
})
return items;
},{})
```
