import { BSTree, Heap, PriorityQueue, LinkedList } from './data-structures/data-structures';
import { binaryTreeSort, bubbleSort, heapSort, insertionSort, shellSort, selectionSort, mergeSort } from './algorithms/algorithms';
import { perfUtil } from './utils/performance-utils';

import { Observable } from 'rx';

let values = [];

/*for (let i = 0; i < 1e6; i++) {
 values.push(Math.floor(Math.random() * 10000) + 1);
 }*/

values = [3, 1, 5];
let a = new BSTree(values);
console.log(a.valuesInOrder());


let canvas = document.getElementById('display'),
    context = canvas.getContext('2d');

drawRects(context);
drawTriangles(context, 'blue');
smileyFace(context);
drawCircles(context, 10);

function drawRects(context) {
    context.fillStyle = "rgb(200, 0, 0)";
    context.fillRect(10, 10, 50, 50);

    context.fillStyle = "rgba(0, 0, 200, 0.5)";
    context.fillRect(30, 30, 50, 50);
}

function drawTriangles(context, color) {
    context.beginPath();
    context.moveTo(100, 50);
    context.lineTo(125, 75);
    context.lineTo(125, 25);
    context.fillStyle = color;
    context.fill();
}

function smileyFace(context) {
    context.beginPath();
    context.arc(75, 75, 50, 0, Math.PI * 2, true);
    context.moveTo(110, 75);
    context.arc(75, 75, 35, 0, Math.PI, false);
    context.moveTo(65, 65);
    context.arc(60, 65, 5, 0, Math.PI * 2, true);
    context.moveTo(95, 65);
    context.arc(90, 65, 5, 0, Math.PI * 2, true);
    context.stroke();
}

function drawCircles(context, numCircles) {
    let maxRadius = 200,
        center = 400;
    for (let i = 0; i < numCircles; i++) {
        let radius = maxRadius - (i * (maxRadius / numCircles));
        placeCircle(context, radius, center);
    }

}

function placeCircle(context, radius, center) {
    context.beginPath();
    context.moveTo(center + radius, center);
    context.arc(center, center, radius, 0, Math.PI * 2, true);
    context.stroke();
}


let mouseMoves = Observable.fromEvent(canvas, 'mousemove')
    .map(e => {
        return {
            x: e.offsetX,
            y: e.offsetY
        }
    });

mouseMoves.subscribe(move => { console.log(move.x, move.y) });

let tree = new BSTree([ 3, 1, 5, 2, 6 ]);
console.log(tree.valuesInOrder());


// let animate = Observable.range(1, 2)
//     .map(() => {
//         return {
//             x: parseInt(Math.random() * canvas.height),
//             y: parseInt(Math.random() * canvas.width),
//             size: Math.random() * 50 + 2,
//             speed: Math.random() * 100 + 1,
//             right: true
//         };
//     })
//     .toArray()
//     .flatMap(squareArray => {
//         return Observable.interval(50)
//             .map(() => {
//                 squareArray.forEach(square => {
//                     if ((square.x + square.size) >= canvas.width) {
//                         square.right = false;
//                     } else if (square.x <= 0) {
//                         square.right = true;
//                     }
//                     square.x = (square.right === true) ? square.x + square.speed : square.x - square.speed;
//                 });
//                 return squareArray;
//             })
//     });
//
// animate.forEach(squareArray => {
//     context.fillStyle = 'white';
//     context.fillRect(0, 0, canvas.width, canvas.height);
//     context.fillStyle = "rgb(200, 0, 0)";
//     squareArray.forEach(square => {
//         context.fillRect(square.x, square.y, square.size, square.size);
//     });
// });

let elements = [2, 5, 1, -1, 3, -10];
let shell = mergeSort(elements);
shell.run();

if (true) {
    let comparator = (val1, val2) => { return val1.length - val2.length },
        pQueue = new PriorityQueue([ 'berry', 'arch' ], comparator);

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
let items = [ 3, 22, -1, 42, -2, 33, 24 ];
let heap = new Heap(items);
//heap.heapify(items);