function AList0() {
	IList0.apply(this, arguments);
	
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

AList0.prototype = Object.create(IList0.prototype);

AList0.prototype.constructor = AList0;

AList0.prototype.push = function (value){
    if (arguments.length === 0) {
        return this.length;
    }

    this.arr[this.length++] = value;

    return this.length;
};

AList0.prototype.pop = function (){
    if (this.length === 0){
        return undefined;
    }

    var res = this.arr[--this.length];
    this.arr.length = this.length;
 
    return res;
};

AList0.prototype.shift = function (){
    if (this.length === 0){
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

AList0.prototype.unshift = function (value) {
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

AList0.prototype.splice = function () {
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

AList0.prototype.isArray = function () {
    return Object.prototype.toString.call(this) === '[object Array]';
};

AList0.prototype.some = function (callback, thisArg) {
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

AList0.prototype.every = function (callback, thisArg) {
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
