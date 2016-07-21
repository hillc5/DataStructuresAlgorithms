export function insertElement(arr, insertIndex, element, lastIndex) {
    for (let i = lastIndex; i > insertIndex; i--) {
        arr[i] = arr[i - 1];
    }
    arr[insertIndex] = element;
}

export function swap(index, array) {
    let temp = array[index];
    array[index] = array[index + 1];
    array[index + 1] = temp;
}