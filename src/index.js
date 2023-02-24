import { BSTree, Heap, PriorityQueue, LinkedList, Trie, HashTable } from './data-structures/data-structures';
import { binaryTreeSort, bubbleSort, heapSort, insertionSort, shellSort, selectionSort, mergeSort } from './algorithms/algorithms';
import { perfUtil } from './utils/performance-utils';

let tree = new BSTree([3, 1, 5, 2, 6]);
console.log(tree.valuesInOrder());

let elements = [2, 5, 1, -1, 3, -10];
let shell = mergeSort(elements);
shell.run();

if (true) {
    let comparator = (val1, val2) => { return val1.length - val2.length },
        pQueue = new PriorityQueue(['berry', 'arch'], comparator);

    pQueue.toArray();
    pQueue.add('zoo');
    pQueue.toArray();
}


let comparator = (val1, val2) => val1 - val2 > 0 ? -1 : val1 - val2 < 0 ? 1 : 0,
    perf = perfUtil(1e1, undefined, 'ms');

let mergeSortRun = perf.runMeasureSuite(mergeSort);
console.log('Merge Sort');
console.table(mergeSortRun);
let shellSortRun = perf.runMeasureSuite(shellSort);
console.log('Shell Sort');
console.table(shellSortRun);
let heapSortRun = perf.runMeasureSuite(heapSort);
console.log('Heap Sort');
console.table(heapSortRun);
let treeSortRun = perf.runMeasureSuite(binaryTreeSort);
console.log('Tree Sort');
console.table(treeSortRun);


let list = new LinkedList([1, 2, 3]);

function reverseNum(num) {
    let result = 0,
        isNeg = num < 0;

    num = Math.abs(num);
    while (num > 0) {
        result = result * 10 + num % 10;
        num = Math.floor(num / 10);
    }
    return isNeg ? -1 * result : result;
}

console.log(`125 reversed = ${reverseNum(125)}`);
console.log(`23498234 reversed = ${reverseNum(23498234)}`);
console.log(`-1234 reversed = ${reverseNum(-1234)}`);

const largestFirst = (val1, val2) => (val1 > val2) ? -1 : (val1 < val2) ? 1 : 0;
let items = [3, 22, -1, 42, -2, 33, 24];
let heap = new Heap(items);
//heap.heapify(items);

let word = 'word';
let trie = new Trie(word);
trie.add('wordy');
trie.add('worm');
trie.add('world');

console.log(trie.search('wordy'));
console.log(trie.search('word'));
console.log(trie.search('notfound'));

trie.delete('wordy');
console.log(trie.search('wordy'));
console.log(trie.search('worm'));
console.log(trie.search('world'))
console.table(trie);

let hashTable = new HashTable();
hashTable.insert(4, 'test');
hashTable.insert(23, 'another test');
hashTable.insert(2, 'second');
hashTable.insert(1, 'first');
hashTable.insert(22, 'twenty two');
hashTable.insert(234, '234');
hashTable.insert(11, 'eleven');
console.log(hashTable.search(4));
console.table(hashTable);

