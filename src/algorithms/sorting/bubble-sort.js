export default function bubbleSort(elements, comparatorFn) {
    let copy = [ ...elements ],
        endIndex = 1,
        swaps;
    do {
        let length = elements.length - endIndex;
        swaps = false;

        for (let i = 0; i < length; i++) {
            let firstVal = copy[i],
                secondVal = copy[i + 1];

            if (greaterThan(firstVal, secondVal, comparatorFn)) {
                swap(i, copy);
                swaps = true;
            }
        }

        endIndex++;
    } while (swaps === true);

    return copy;
}

function swap(index, array) {
    let temp = array[index];
    array[index] = array[index + 1];
    array[index + 1] = temp;
}

function greaterThan(first, second, comparatorFn) {
    return comparatorFn ? comparatorFn(first, second) > 0 : first - second > 0;
}