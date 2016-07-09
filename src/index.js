import BSTree from './binary-search-tree/binary-tree';

let values = [];

/*for (let i = 0; i < 1e6; i++) {
 values.push(Math.floor(Math.random() * 10000) + 1);
 }*/

values = [3, 1, 5];
let a = new BSTree(values);
console.log(a.valuesInOrder());
a.removeNode(7);