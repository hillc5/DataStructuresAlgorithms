function createList(list, ...elements) {
    if (list.isEmpty()) {
        list.head = new ListNode(elements.shift());
    }

    let current = list.head;

    elements.forEach(element => {
        current.next = new ListNode(element);
        current = current.next;
    });

    return list.head;
}

/**
 * Creates a LinkedList with the given elements or an
 * empty LinkedList if no elements are passed in.
 *
 * @param elements
 * @constructor
 */
export default function LinkedList(elements = []) {
    this.size = elements.length;
    this.head = elements.length ? createList(this, ...elements) : null;
}

/**
 * Adds the given element to the end of the LinkedList.
 * No operation if no element is passed in.
 *
 * @param element
 */
LinkedList.prototype.append = function(element) {
    if (element) {
        let node = new ListNode(element);
        if (this.isEmpty()) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node
        }
        this.size++;
    }
};

/**
 * Inserts the given element at the given index.  If the index
 * is greater than the length, negative, or if the element doesn't exist,
 * then the list remains unchanged.
 *
 * @param index
 * @param element
 */
LinkedList.prototype.insert = function(index, element) {
    if (element && index >= 0 && index <= this.size) {
        if (index === this.size) {
            this.append(element);
        } else if (index < this.size) {
            let newNode = new ListNode(element);

            if (index === 0) {
                newNode.next = this.head;
                this.head = newNode;
            } else {
                let position = 0,
                    current = this.head;

                while(position < index - 1) {
                    current = current.next;
                    position++;
                }

                newNode.next = current.next;
                current.next = newNode;
            }
            this.size++;
        }
    }
};

/**
 * Removes the element at the given index.  If index is negative or
 * if index >= the size of the list, then no operation is executed.
 *
 * @param index
 */
LinkedList.prototype.removeAt = function(index) {
    let result = null;
    if (index >= 0 && index < this.size) {
        if (index === 0) {
            result = this.head.value;
            this.head = this.head.next;
        } else {
            let position = 0,
                current = this.head;

            while(position < index - 1) {
                current = current.next;
                position++;
            }
            result = current.next.value;
            current.next = current.next.next;
        }
        this.size--;
    }
    return result;
};

/**
 * Returns the index of the given element in the list,
 * or -1 if it is not found.
 *
 * @param element
 * @returns {number}
 */
LinkedList.prototype.indexOf = function(element) {
    let index = 0,
        current = this.head;

    while(current && current.value != element) {
        index++;
        current = current.next;
    }

    return current ? index : -1;
};

/**
 * Returns true if the list is empty, false otherwise
 *
 * @returns {boolean}
 */
LinkedList.prototype.isEmpty = function() {
    return !this.head;
};

/**
 * Executes the provided function on each of the items
 * in the LinkedList.
 *
 * @param fn
 * @param context
 */
LinkedList.prototype.forEach = function(fn, context = this) {
    let current = this.head,
        index = 0;
    while(current) {
        fn.call(context, current.value, index);
        current = current.next;
        index++;
    }
};


function ListNode(value, next) {
    this.value = value;
    this.next = next;
}