function createList(list, ...elements) {
    if (!list.head) {
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
        if (!this.head) {
            this.head = new ListNode(element);
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = new ListNode(element);
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
    if (index >= 0 && index < this.size) {
        if (index === 0) {
            this.head = this.head.next;
        } else {
            let position = 0,
                current = this.head;

            while(position < index - 1) {
                current = current.next;
                position++;
            }
            current.next = current.next.next;
        }
        this.size--;
    }
};

/**
 * Executes the provided function on each of the items
 * in the LinkedList.
 *
 * @param fn
 * @param context
 */
LinkedList.prototype.forEach = function(fn, context) {
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