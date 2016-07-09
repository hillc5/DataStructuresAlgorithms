import test from 'tape';
import BSTree from '../src/binary-search-tree/binary-tree';

test('initial test', function(t) {
    let a = new BSTree(2);
    t.equal(a.root.value, 2);
});