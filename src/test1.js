import update from 'immutability-helper';
const state1 = {x:1};
const state2 = update(state1, {y:2}); 
console.log(state1);
console.log(state2);