function AList1() {
    IList1.apply(this, arguments);

    this.arr = [];
    this.length = 0;

    this.getValueByInd = function (ind) {
        return this.arr[ind];
    };

    this.insert = function (ind, value) {
        if (ind < 0 || ind > this.length) {
            return undefined;
        }

        for (let i = this.length - 1; i >= ind; i--) {
            this.arr[i + 1] = this.arr[i];
        }

        this.arr[ind] = value;
        this.length++;
        return this.length;
    };

    this.remove = function (ind) {
        if (ind < 0 || ind >= this.length) {
            return undefined;
        }
        var res = this.arr[ind];

        for (let i = ind; i < this.length - 1; i++) {
            this.arr[i] = this.arr[i + 1];
        }

        this.arr.length--;
        this.length--;

        return res;
    }
}

AList1.prototype = Object.create(IList1.prototype);

AList1.prototype.constructor = AList1;

AList1.prototype.push = function (value) {
    if (arguments.length === 0) {
        return this.length;
    }

    this.arr[this.length++] = value;

    return this.length;
};

AList1.prototype.pop = function () {
    if (this.length === 0) {
        return undefined;
    }

    var res = this.arr[--this.length];
    this.arr.length = this.length;

    return res;
};

AList1.prototype.shift = function () {
    if (this.length === 0) {
        return undefined;
    }

    var res = this.arr[0];

    for (var i = 0; i < this.length - 1; i++) {
        this.arr[i] = this.arr[i + 1];
    }
    this.length--;
    this.arr.length = this.length;

    return res;
};

AList1.prototype.unshift = function (value) {
    if (arguments.length === 0) {
        return this.length;
    }

    for (var i = this.length - 1; i >= 0; i--) {
        this.arr[i + 1] = this.arr[i];
    }
    this.length++;
    this.arr[0] = value;

    return this.length;
};

AList1.prototype.splice = function () {
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

    ////////
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

AList1.prototype.isArray = function () {
    return Object.prototype.toString.call(this) === '[object Array]';
};

AList1.prototype.some = function (callback, thisArg) {
    const context = thisArg || this;

    let res = false;

    for (let i = 0; i < this.length; i++) {
        res = res || callback.call(context, this.arr[i], i, this);
        if (res) {
            break;
        }
    }

    return res;
};

AList1.prototype.every = function (callback, thisArg) {
    const context = thisArg || this;

    let res = true;

    for (let i = 0; i < this.length; i++) {
        res = res && callback.call(context, this.arr[i], i, this);
        if (!res) {
            break;
        }
    }

    return res;
};

AList1.prototype.toString = function () {
    let res = '[';

    for (let i = 0; i < this.length; i++) {
        res += this.arr[i];
        if (i !== (this.length - 1)) {
            res += ', ';
        }
    }

    res += ']';

    return res;
};

AList1.prototype.toArrayList = function () {
	return this;
};

AList1.prototype.toLinkedList = function () {
	let res = new LList1();
	
	for (let i = 0; i < this.length; i++) {
		res.push(this.arr[i]);
	}
	
	return res;
};

AList1.prototype.sort = function () {
	function getMinArrIndex(aArr, aIndBeg, aIndEnd) {
		if (aArr.length === 0) return null;

		if (typeof aIndBeg === 'undefined') aIndBeg = 0;
		if (typeof aIndEnd === 'undefined') aIndEnd = aArr.length - 1;

		let lMin = aArr[aIndBeg];
		let lInd = aIndBeg;

		for (let i = aIndBeg + 1; i <= aIndEnd; i++) {
			if (lMin > aArr[i]) {
				lMin = aArr[i];
				lInd = i;
			}
		}

		return lInd;
	}
	
	function sortInsert(aArr) {
        if (aArr.length === 0) return aArr;

        let i, j;
        const lIndMin = getMinArrIndex(aArr);
        let lVal;

        //установка первого минимального элемента массива для исключеня доп. проверки
        if (lIndMin !== 0) {
            lVal = aArr[0];
            aArr[0] = aArr[lIndMin];
            aArr[lIndMin] = lVal;
        }

        for (i = 2; i < aArr.length; i++) {
            lVal = aArr[i];
            j = i;

            while (aArr[j - 1] > lVal) {
                aArr[j] = aArr[j - 1];
                j--;
            }

            aArr[j] = lVal;
        }

        return aArr;
    }
	
	sortInsert(this.arr);
};
