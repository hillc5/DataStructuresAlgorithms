export default function bubbleSort(elements, comparatorFn) {
    let length = elements.length - 1,
        copy = [ ...elements ],
        swaps;
    do {
        swaps = false;
        for (let i = 0; i < length; i++) {
            let firstVal = copy[i],
                secondVal = copy[i + 1],
                tempVal;

            if (greaterThan(firstVal, secondVal, comparatorFn)) {
                tempVal = firstVal;
                copy[i] = secondVal;
                copy[i + 1] = tempVal;
                swaps = true;
            }
        }
    } while (swaps === true);

    return copy;
}

function greaterThan(first, second, comparatorFn) {
    return comparatorFn ? comparatorFn(first, second) > 0 : first - second > 0;
}