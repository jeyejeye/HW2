function LList1() {
    IList1.apply(this, arguments);

    this.root = null;
    this.last = null;

    this.length = 0;

    this.getElementByInd = function (ind) {
        let i = 0;
        let e1 = this.root;

        while (i < ind) {
            e1 = e1.next;
            i++;
        }

        return e1;
    };

    this.getValueByInd = function (ind) {
        return this.getElementByInd(ind).value;
    };

    this.insert = function (ind, value) {
        if (ind < 0 || ind > this.length) {
            return undefined;
        }

        if (ind === 0) {
            return this.unshift(value);
        }

        if (ind === this.length) {
            return this.push(value);
        }

        let e = this.getElementByInd(ind);

        const eNew = new Entry(value, e, e.prev);

        e.prev.next = eNew;
        e.prev = eNew;

        this.length++;
        return this.length;
    };

    this.remove = function (ind) {
        if (ind < 0 || ind >= this.length) {
            return undefined;
        }

        if (ind === 0) {
            return this.shift();
        }

        if (ind === (this.length - 1)) {
            return this.pop();
        }

        const e2 = this.getElementByInd(ind);

        const e_prev = e2.prev;
        const e_next = e2.next;

        e_prev.next = e_next;
        e_next.prev = e_prev;

        this.length--;
        return e2.value;
    };
}

LList1.prototype = Object.create(IList1.prototype);

LList1.prototype.constructor = LList1;

LList1.prototype.shift = function () {
    if (this.length === 0) {
        return undefined;
    }

    let e = this.root;

    if (e.next) {
        this.root = e.next;
    } else {
        this.root = null;
        this.last = null;
    }
    this.length--;

    return e.value;
};

LList1.prototype.unshift = function (value) {
    if (arguments.length === 0) {
        return this.length;
    }

    const e = new Entry(value, this.root, null);
    if (this.root) {
        this.root.prev = e;
    } else {
        this.last = e;
    }
    this.root = e;

    this.length++;

    return this.length;
};

LList1.prototype.pop = function () {
    if (this.length === 0) {
        return undefined;
    }

    let e = this.last;

    if (e.prev) {
        this.last = e.prev;
    } else {
        this.root = null;
        this.last = null;
    }
    this.length--;

    return e.value;
};

LList1.prototype.push = function (value) {
    if (arguments.length === 0) {
        return this.length;
    }

    const e = new Entry(value, null, this.last);

    if (this.last) {
        this.last.next = e;
    } else {
        this.root = e;
    }
    this.last = e;

    this.length++;

    return this.length;
};

LList1.prototype.splice = function () {
    let res = [];
    if (arguments.length === 0) {
        return res;
    }

    let rangeForDelete = {beginInd: 0, cnt: 0};
    let rangeForInsert = {beginInd: 0, arr: []};

    if (arguments[0] >= 0) {
        rangeForDelete.beginInd = arguments[0];
    } else {
        rangeForDelete.beginInd = this.length - arguments[0];
    }

    if (arguments.length >= 2) {
        rangeForDelete.cnt = arguments[1];
    } else {
        rangeForDelete.cnt = rangeForDelete.beginInd < this.length ? this.length - rangeForDelete.beginInd : 0;
    }

    for (let i1 = rangeForDelete.beginInd + rangeForDelete.cnt - 1; i1 >= rangeForDelete.beginInd; i1--) {
        if (i1 >= 0 && i1 < this.length) {
            res.unshift(this.remove(i1));
        }
    }

    if (rangeForDelete.beginInd < 0) {
        rangeForInsert.beginInd = 0;
    } else if (rangeForDelete.beginInd < this.length) {
        rangeForInsert.beginInd = rangeForDelete.beginInd;
    } else {
        rangeForInsert.beginInd = this.length;
    }

    for (let i = 2; i < arguments.length; i++) {
        rangeForInsert.arr.unshift(arguments[i]);
    }

    ///////
    for (let i = 0; i < rangeForInsert.arr.length; i++) {
        this.insert(rangeForInsert.beginInd, rangeForInsert.arr[i]);
    }
    /* */
    return res;
};

LList1.prototype.isArray = function () {
    return Object.prototype.toString.call(this) === '[object Array]';
};

LList1.prototype.some = function (callback, thisArg) {
    const context = thisArg || this;

    let res = false;

    let e = this.root;

    for (let i = 0; i < this.length; i++) {
        res = res || callback.call(context, e.value, i, this);
        if (res) {
            break;
        }
        e = e.next;
    }

    return res;
};

LList1.prototype.every = function (callback, thisArg) {
    const context = thisArg || this;

    let res = true;

    let e = this.root;

    for (let i = 0; i < this.length; i++) {
        res = res && callback.call(context, e.value, i, this);
        if (!res) {
            break;
        }
        e = e.next;
    }

    return res;
};

function Entry(value, next, prev) {
    this.next = next;
    this.prev = prev;

    this.value = value;
}

LList1.prototype.toString = function () {
    let res = '[';

    let e = this.root;

    for (let i = 0; i < this.length; i++) {
        res += e.value;
        if (i !== (this.length - 1)) {
            res += ', ';
        }
        e = e.next;
    }

    res += ']';

    return res;
};

LList1.prototype.toArrayList = function () {
	let res = new AList1();
	
	let e = this.root;
	
	while (e) {
		res.push(e.value);
		e = e.next;
	}
	
	return res;
};

LList1.prototype.toLinkedList = function () {
	return this;
};

LList1.prototype.sort = function () {
//	function getMinElement
};