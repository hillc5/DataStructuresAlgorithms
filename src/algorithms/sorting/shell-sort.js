import { greaterThan } from '../../utils/compare-utils';
import builder from '../../utils/sort-builder';

function calculateGapLengths(numElements) {
    let gaps = [],
        k = 1,
        gap = Math.pow(2, k) - 1;

    while(gap < numElements) {
        gaps.unshift(gap);
        k++;
        gap = Math.pow(2, k) - 1;
    }

    return gaps;
}

function sortFunction() {
    let a = this.elements;
    this.gaps.forEach(gap => {
        let length = a.length;
        // implementation from https://en.wikipedia.org/wiki/Shellsort
        for (let i = gap; i < length; i++) {
            let temp = a[i];
            for (var j = i; j >= gap && greaterThan(a[j - gap], temp, this.comparatorFn); j -= gap) {
                a[j] = a[j - gap];
            }
            a[j] = temp;
        }
    });
    return a;
}


export default function shellSort(elements, comparatorFn) {
    let options = {
        gaps: calculateGapLengths(elements.length),
        setElements(elements) {
            this.elements = [ ...elements ];
            this.gaps = calculateGapLengths(elements.length);
        }
    };
    return builder(elements, comparatorFn, sortFunction, options)
};