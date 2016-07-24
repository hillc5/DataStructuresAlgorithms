import { swap } from '../../utils/array-utils';
import { lessThan } from '../../utils/compare-utils';
import builder from '../../utils/sort-builder';

function sortFunction() {
    let selectionLength = this.elements.length - 1;

    for(let i = 0; i < selectionLength; i++) {
        let smallestIndex = getIndexForSmallest(this.elements, i, this.comparatorFn);
        swap(i, smallestIndex, this.elements);
    }

    return this.elements
}

function getIndexForSmallest(elements, startIndex, comparatorFn) {
    let smallest = elements[startIndex],
        index = startIndex;

    for (let i = startIndex; i < elements.length; i++) {
        let value = elements[i];
        if (lessThan(value, smallest, comparatorFn)) {
            index = i;
            smallest = value;
        }
    }
    return index;
}

export default function selectionSort(elements, comparatorFn) {
    return builder(elements, comparatorFn, sortFunction);
};