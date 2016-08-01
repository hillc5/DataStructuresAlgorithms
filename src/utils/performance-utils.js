const performance = window.performance;
const UNITS = {
    MS: {
        name: 'milliseconds',
        conversion(time) {
            return Math.floor(time * 1e5) / 1e5;
        }
    },
    S: {
        name: 'seconds',
        conversion(time) {
            return Math.floor(time * 1e2) / 1e5;
        }
    },
    M: {
        name: 'minutes',
        conversion(time) {
            return Math.floor(time * 1e2) / 1e5 / 60;
        }
    }
};


function getElements(num) {
    let result = new Array(num).fill(0);

    result = result.map(() =>
        Math.floor(Math.random() * (num + 1) + 1)
    );

    return result;
}

let perfUtil = (function() {
    const prototype = {
        measure(alg) {
            let elements = getElements(this.numElements),
                algObj = alg(elements, this.comparator),
                start = performance.now(),
                time;

            algObj.run();
            time = performance.now() - start;
            return time;

        },
        runMeasureSuite(alg) {
            let results = [];
            [ 1e1, 1e2, 1e3, 1e4, 1e5, 1e6 ].forEach(num => {
                let elements = getElements(num),
                    algObj = alg(elements, this.comparator),
                    convertedTime,
                    start,
                    time;

                start = performance.now();
                algObj.run();
                time = performance.now() - start;

                convertedTime = `${UNITS[this.units].conversion(time)} ${UNITS[this.units].name}`;
                results.push({ num: num, time: time, pretty: convertedTime });
            });
            return results;
        },
        setComparator(comparator) {
            this.comparator = comparator;
        },
        setNumElements(num) {
            this.numElements = num;
        },
        setUnits(units) {
            units = units.toUpperCase();
            this.units = UNITS[units] ? units : UNITS.MS;
        }
    };

    return function(numElements = 0, comparator, units) {
        let result = Object.create(prototype);
        result.setNumElements(numElements);
        result.setComparator(comparator);
        result.setUnits(units);
        return result;
    }
}());

export { perfUtil };