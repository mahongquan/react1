var update=require('immutability-helper').newContext();
const state1 = {x:1};
const state2 = update(state1, {y:{$set:2}}); 
console.log(state1);
console.log(state2);
var a=[1,2,3,4,5]
console.log(a);
const a2 = update(a, {$push:[5]}); 
console.log(a2);