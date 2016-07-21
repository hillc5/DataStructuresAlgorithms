export function lessThan(el1, el2, comparatorFn) {
    return comparatorFn ? comparatorFn(el1, el2) < 0 : (el1 - el2 < 0);
}

export function greaterThan(el1, el2, comparatorFn) {
    return comparatorFn ? comparatorFn(el1, el2) > 0 : (el1 - el2 > 0);
}