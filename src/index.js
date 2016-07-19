import { BSTree, PriorityQueue } from './data_structures/data-structures';
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
drawTriangles(context);

function drawRects(context) {
    context.fillStyle = "rgb(200, 0, 0)";
    context.fillRect(10, 10, 50, 50);

    context.fillStyle = "rgba(0, 0, 200, 0.5)";
    context.fillRect(30, 30, 50, 50);
}

function drawTriangles(context) {
    context.beginPath();
}

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
