import BSTree from './data_structures/binary-search-tree/binary-tree';

let values = [];

/*for (let i = 0; i < 1e6; i++) {
 values.push(Math.floor(Math.random() * 10000) + 1);
 }*/

values = [3, 1, 5];
let a = new BSTree(values);
console.log(a.valuesInOrder());
a.removeNode(3);
a.removeNode(5);
a.removeNode(1);

a.addNode(4);

let b = new BSTree(2);