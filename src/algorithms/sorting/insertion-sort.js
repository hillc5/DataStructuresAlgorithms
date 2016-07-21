import { insertElement } from '../../utils/array-utils';
import { lessThan } from '../../utils/compare-utils';

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