import { lessThan } from '../../utils/compare-utils';
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

    let result = [];

    while(arr1.length && arr2.length) {
        let val1 = arr1[0],
            val2 = arr2[0],
            element;

        element = lessThan(val1, val2, comparatorFn) ? arr1.shift() : arr2.shift();
        result.push(element);
    }

    if (arr1.length) {
        result.push(...arr1);
    } else {
        result.push(...arr2);
    }

    return result;
}

export default function mergeSort(elements, comparatorFn) {
    return builder(elements, comparatorFn, sortFunction);
}
