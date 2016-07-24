const sortProto = {
    setElements(elements = []) {
        this.elements = [ ...elements ];
    },
    setComparator(comparatorFn) {
        this.comparatorFn = comparatorFn;
    },
    setAlgorithm(alg) {
        this.algorithm = alg;
    },
    run() {
        if (this.algorithm) {
            return this.algorithm();
        }
    }
};

function builder(elements, comparator, sortFunction, options) {
    let result = Object.create(sortProto);
    result = Object.assign(result, options);
    result.setElements(elements);
    result.setComparator(comparator);
    result.setAlgorithm(sortFunction);
    return result;
}

export default builder;