import * as A from '../algorithms/algorithms';

const performance = window.performance;

function getElements(num) {
    let result = new Array(num).fill(0);

    result = result.map(() =>
        Math.floor(Math.random() * (num + 1) + 1)
    );

    return result;
}

let perfUtil = (function() {
    const prototype = {
        measure(alg1) {
            let elements = getElements(this.numElements),
                start = performance.now();
                alg1(elements, this.comparator);
                return performance.now() - start;

        },
        setComparator(comparator) {
            this.comparator = comparator;
        },
        setNumElements(num) {
            this.numElements = num;
        }
    };

    return function(numElements = 0, comparator) {
        let result = Object.create(prototype);
        result.numElements = numElements;
        result.comparator = comparator;
        return result;
    }
}());

export default perfUtil;