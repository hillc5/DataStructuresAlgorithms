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