import { Heap } from '../../data-structures/data-structures';
import builder from '../../utils/sort-builder';

function sortFunction() {
    let heap = new Heap(this.elements, this.comparatorFn),
        results = [];

    while(heap.items.length > 0) {
        results.push(heap.extractMin());
    }

    return results;

}

export default function heapSort(elements, comparatorFn) {
    return builder(elements, comparatorFn, sortFunction);
}