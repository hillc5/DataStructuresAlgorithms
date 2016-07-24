import { swap } from '../../utils/array-utils';
import { greaterThan } from '../../utils/compare-utils';
import builder from '../../utils/sort-builder';

function sortFunction() {
    let endIndex = 1,
        swaps;
    do {
        let length = this.elements.length - endIndex;
        swaps = false;

        for (let i = 0; i < length; i++) {
            let firstVal = this.elements[i],
                secondVal = this.elements[i + 1];

            if (greaterThan(firstVal, secondVal, this.comparatorFn)) {
                swap(i, i + 1, this.elements);
                swaps = true;
            }
        }

        endIndex++;
    } while (swaps === true);

    return this.elements;
}

export default function bubbleSort(elements, comparatorFn) {
    return builder(elements, comparatorFn, sortFunction);
}