import { Heap } from '../../data-structures/data-structures';
import builder from '../../utils/sort-builder';

function sortFunction() {
    return Heap.sort(this.elements, this.comparatorFn);
}

export default function heapSort(elements, comparatorFn) {
    return builder(elements, comparatorFn, sortFunction);
}