import { BSTree } from '../../data-structures/data-structures';

export default function binaryTreeSort(elements, comparator) {
    let tree = new BSTree(elements, comparator);
    return tree.valuesInOrder();
}