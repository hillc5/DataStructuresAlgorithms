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
        insertElement(copy, insertIndex, element, i);
    }

    return copy;
}

function insertElement(arr, insertIndex, element, lastIndex) {
    for (let i = lastIndex; i > insertIndex; i--) {
        arr[i] = arr[i - 1];
    }
    arr[insertIndex] = element;
}

function lessThan(el1, el2, comparatorFn) {
    return comparatorFn ? comparatorFn(el1, el2) < 0 : (el1 - el2 < 0);
}