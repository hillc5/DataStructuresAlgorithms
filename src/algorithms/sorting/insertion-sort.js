export default function insertionSort(elements, comparatorFn) {
    let copy = [ ...elements ],
        copyLength = copy.length;

    for (let i = 1; i < copyLength; i++) {
        let element = copy[i],
            placed = false,
            insertIndex = i;

        while(!placed && insertIndex > 0) {
            if (lessThan(element, copy[insertIndex - 1], comparatorFn)) {
                insertIndex--;
            } else {
                placed = true;
            }
        }
        copy = insertElement(copy, insertIndex, element, i);
    }

    return copy;
}

function insertElement(arr, insertIndex, element, lastIndex) {
    let result = [ ...arr ];
    for (let i = lastIndex; i > insertIndex; i--) {
        result[i] = result[i - 1];
    }
    result[insertIndex] = element;
    return result;
}

function lessThan(el1, el2, comparatorFn) {
    return comparatorFn ? comparatorFn(el1, el2) < 0 : (el1 - el2 < 0);
}