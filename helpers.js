
function PriorityQueue(comparator) {
    this._comparator = comparator || PriorityQueue.DEFAULT_COMPARATOR;
    this._elements = [];
}

PriorityQueue.DEFAULT_COMPARATOR = function (a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
    } else {
        a = a.toString();
        b = b.toString();

        if (a == b) return 0;

        return (a > b) ? 1 : -1;
    }
}

PriorityQueue.prototype.isEmpty = function () {
    return this.size() === 0;
};

PriorityQueue.prototype.peek = function () {
    if (this.isEmpty()) throw new Error('PriorityQueue is empty');

    return this._elements[0];
};

PriorityQueue.prototype.deq = function () {
    let first = this.peek();
    let last = this._elements.pop();
    let size = this.size();
    let left = 0, right = size;

    if (size === 0) return first;

    this._elements[0] = last;
    let current = 0;

    while (current < size) {
        let largest = current;

        if (left < size && this._compare(left, largest) >= 0) {
            largest = left;
        }

        if (right < size && this._compare(right, largest) >= 0) {
            largest = right;
        }

        if (largest === current) break;

        this._swap(largest, current);
        current = largest;
    }

    return first;
};

PriorityQueue.prototype.enq = function (element) {
    let size = this._elements.push(element);
    let current = size - 1;

    while (current > 0) {
        let parent = Math.floor((current - 1) / 2);
        if (this._compare(current, parent) <= 0) break;
        this._swap(parent, current);
        current = parent;
    }

    return size;
};

PriorityQueue.prototype.size = function () {
    return this._elements.length;
};

PriorityQueue.prototype._compare = function (a, b) {
    return this._comparator(this._elements[a], this._elements[b]);
};

PriorityQueue.prototype._swap = function (a, b) {
    let aux = this._elements[a];
    this._elements[a] = this._elements[b];
    this._elements[b] = aux;
};

module.exports = PriorityQueue;
