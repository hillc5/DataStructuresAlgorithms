import { swap } from '../../utils/array-utils';
import { lessThan } from '../../utils/compare-utils';

export default function selectionSort(elements, comparatorFn) {
    let copy = [ ...elements ],
        selectionLength = copy.length - 1;

    for(let i = 0; i < selectionLength; i++) {
        let smallestIndex = getIndexForSmallest(copy, i, comparatorFn);
        swap(i, smallestIndex, copy);
    }

    return copy
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