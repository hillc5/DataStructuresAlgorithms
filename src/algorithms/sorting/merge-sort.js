import { lessThan } from '../../utils/compare-utils';
import { concatFromIndex } from '../../utils/array-utils';
import builder from '../../utils/sort-builder';

function sortFunction() {
    return merge(this.elements, this.comparatorFn);
}

function merge(elements, comparatorFn) {
    if (elements.length < 2) {
        return elements;
    }
    let splitIndex = elements.length / 2,
        arr1 = merge(elements.slice(0, splitIndex), comparatorFn),
        arr2 = merge(elements.slice(splitIndex), comparatorFn);

    return combineSortedArrays(arr1, arr2, comparatorFn);
}

function combineSortedArrays(arr1, arr2, comparatorFn) {
    if (!arr1.length) {
        return arr2;
    } else if (!arr2.length) {
        return arr1;
    }

    let result = [],
        idx1 = 0,
        idx2 = 0;

    while(idx1 < arr1.length && idx2 < arr2.length) {
        let val1 = arr1[idx1],
            val2 = arr2[idx2];

        if (lessThan(val1, val2, comparatorFn)) {
            result.push(val1);
            idx1++;
        } else {
            result.push(val2);
            idx2++;
        }
    }

    if (idx1 < arr1.length) {
        concatFromIndex(result, arr1, idx1);
    } else {
        concatFromIndex(result, arr2, idx2);
    }

    return result;
}

export default function mergeSort(elements, comparatorFn) {
    return builder(elements, comparatorFn, sortFunction);
}
