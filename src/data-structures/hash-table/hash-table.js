import { modulus } from './hash-functions';

const DEFAULT_THRESHOLD = 0.6;

class HashNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

export default class HashTable {
    constructor(hashFn = modulus, threshold = DEFAULT_THRESHOLD) {
        this.capacity = 10;
        this.size = 0;
        this.bucket = new Array(this.capacity).fill(null);
        this.hashFn = hashFn;
        this.threshold = threshold;
    }

    #addHelper(key, value, bucket) {
        const index = this.getIndex(key);

        if (!bucket[index]) {
            bucket[index] = new HashNode(key, value);
        } else {
            let target = bucket[index];

            while (target.next) {
                if (target.key === key) {
                    break;
                }

                target = target.next;
            }

            target.next = new HashNode(key, value);
        }
    }

    #resize() {
        const newCapacity = this.capacity * 2;
        this.capacity = newCapacity;

        const newBucket = new Array(newCapacity).fill(null);

        for (let i = 0; i < this.bucket.length; i++) {
            let curr = this.bucket[i];

            while (curr != null) {
                this.#addHelper(curr.key, curr.value, newBucket)
                curr = curr.next;
            }
        }

        this.bucket = newBucket;
    }

    getSize() {
        return this.size;
    }

    isEmpty() {
        return !this.getSize();
    }

    getIndex(key) {
        return this.hashFn(key, this.capacity);
    }

    insert(key, value) {
        this.#addHelper(key, value, this.bucket);

        this.size += 1;
        const currentLoad = Number(this.size) / Number(this.capacity);

        if (currentLoad >= this.threshold) {
            this.#resize();
        }
    }

    search(key) {
        const index = this.getIndex(key);

        let curr = this.bucket[index];

        while (curr) {
            if (curr.key === key) {
                return curr.value;
            }

            curr = curr.next;
        }

        return curr;
    }

    delete(key) {
        const index = this.getIndex(key);

        let curr = this.bucket[index];

        // No entries for the key
        if (!curr) {
            return;
        }

        // Key to delete at head of list
        if (curr.key === key) {
            this.bucket[index] = curr.next;
            this.size -= 1;
            return;
        }

        // Key not at head of list, check next
        // node for match, delete by pointing 
        // current.next to the next.next
        while (curr.next) {
            if (curr.next.key === key) {
                curr.next = curr.next.next;
                this.size -= 1;
                return;
            } else {
                curr = curr.next;
            }
        }
    }
}