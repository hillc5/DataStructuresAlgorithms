export function lessThan(el1, el2, comparatorFn) {
    return comparatorFn ? comparatorFn(el1, el2) < 0 : (el1 - el2 < 0);
}

export function greaterThan(first, second, comparatorFn) {
    return comparatorFn ? comparatorFn(first, second) > 0 : first - second > 0;
}