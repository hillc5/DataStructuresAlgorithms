import { greaterThan } from './compare-utils';

export function insertElement(arr, insertIndex, element, lastIndex = arr.length) {
    for (let i = lastIndex; i > insertIndex; i--) {
        arr[i] = arr[i - 1];
    }
    arr[insertIndex] = element;
}

export function swap(firstIndex, secondIndex, array) {
    let temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
}

export function concatFromIndex(arr1, arr2, index) {
    let length = arr2.length;
    for (index; index < length; index++) {
        arr1.push(arr2[index]);
    }
}

export function verifySorted(elements, comparatorFn) {
    let result = true;
    if (elements) {
        let prev = elements[0];
        result = elements.every(function(element) {
            if (greaterThan(prev, element, comparatorFn)) {
                return false;
            }
            prev = element;
            return true;
        });
    }

    return result;
}