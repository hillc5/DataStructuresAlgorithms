import { swap } from '../../utils/array-utils';
import { greaterThan } from '../../utils/compare-utils';

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