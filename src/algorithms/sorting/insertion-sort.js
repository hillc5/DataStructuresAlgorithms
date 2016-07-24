import { insertElement } from '../../utils/array-utils';
import { lessThan } from '../../utils/compare-utils';
import builder from '../../utils/sort-builder';

function sortFunction() {
    let length = this.elements.length;

    for (let i = 1; i < length; i++) {
        let element = this.elements[i],
            placed = false,
            insertIndex = i;

        while(!placed && insertIndex > 0) {
            if (lessThan(element, this.elements[insertIndex - 1], this.comparatorFn)) {
                insertIndex--;
            } else {
                placed = true;
            }
        }
        insertElement(this.elements, insertIndex, element, i);
    }

    return this.elements;
}

export default function insertionSort(elements, comparatorFn) {
    return builder(elements, comparatorFn, sortFunction);
};