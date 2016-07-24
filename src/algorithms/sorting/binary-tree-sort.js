import { BSTree } from '../../data-structures/data-structures';
import builder from '../../utils/sort-builder';

function sortFunction() {
    let tree = new BSTree(this.elements, this.comparatorFn);
    return tree.valuesInOrder();
}

export default function binaryTreeSort(elements, comparator) {
    return builder(elements, comparator, sortFunction);
}

