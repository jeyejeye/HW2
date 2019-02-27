describe('Testing array on LList1() base', function () {

    let lClass = LList1;
    let lArr = new lClass();
    let lArrForAssert = null;

/////////////////////////////////////////////////// push ///////////////////////////////////////////////////
    describe('testing "push" method', function () {
        let testData = [
            {arrForPush: [3], expectedArr: [3]},
            {arrForPush: [96, 6], expectedArr: [3, 96, 6]},
            {arrForPush: [1, 2, 3, 4, 5], expectedArr: [3, 96, 6, 1, 2, 3, 4, 5]}
        ];

        testData.forEach(function (data) {
            const {arrForPush, expectedArr} = data;

            it(`array should become \[${expectedArr}\] when push next elements: ${arrForPush}`, function () {
                for (let i = 0; i < arrForPush.length; i++) {
                    let expectedArrLength = lArr.push(arrForPush[i]);
                    let actualArrLength = lArr.length;

                    assert.equal(expectedArrLength, actualArrLength);
                }

                //// Проверка результирующего массива
                if (lArrForAssert !== null) {
                    assert.deepEqual(lArrForAssert, expectedArr);
                }
            })
        });

        it('should return current array length when push empty parameter', function () {
            const expectedArr = [3, 96, 6, 1, 2, 3, 4, 5];

            let expectedArrLength = lArr.push();
            let actualArrLength = lArr.length;

            assert.equal(expectedArrLength, actualArrLength);

            //// Проверка результирующего массива
            if (lArrForAssert !== null) {
                assert.deepEqual(lArrForAssert, expectedArr);
            }
        });
    });

/////////////////////////////////////////////////// isArray ////////////////////////////////////////
    describe('testing "isArray" method', function () {
        const expected = false;
        let actual;

        it(`should return ${expected} for method "isArray"`, function () {
            actual = lArr.isArray();
            assert.equal(actual, expected);
        });
    });

/////////////////////////////////////////////////// asString ////////////////////////////////////////
    describe('testing "toString" method', function () {
        let actual;

        const expected0 = '[]';
        let tempArr = new lClass();

        it(`should return ${expected0} from method "toString"`, function () {
            actual = tempArr.toString();
            assert.equal(actual, expected0);
        });

        const expected1 = '[3]';
        let tempArr1 = new lClass();
        tempArr1.push(3);

        it(`should return ${expected1} from method "toString"`, function () {
            actual = tempArr1.toString();
            assert.equal(actual, expected1);
        });

        const expected2 = '[3, 96, 6, 1, 2, 3, 4, 5]';

        it(`should return ${expected2} from method "toString"`, function () {
            actual = lArr.toString();
            assert.equal(actual, expected2);
        });
    });

/////////////////////////////////////////////////// toArrayList ////////////////////////////////////////
    describe('testing "toArrayList" method', function () {
        it(`should return empty ArrayList from method "toArrayList"`, function () {
            const tempNativeList = new lClass();
			const tempDerivativeList = tempNativeList.toArrayList();
			
            const actual = tempNativeList.toString();
			const expected = tempDerivativeList.toString();
			
            assert.equal(actual, expected);
        });

        it(`should return [3] from method "toArrayList"`, function () {
            const tempNativeList = new lClass();
            tempNativeList.push(3);
			const tempDerivativeList = tempNativeList.toArrayList();

            const actual = tempNativeList.toString();
			const expected = tempDerivativeList.toString();

            assert.equal(actual, expected);
        });

        it(`should return [3, 96, 6, 1, 2, 3, 4, 5] from method "toArrayList"`, function () {
			const tempDerivativeList = lArr.toArrayList();

            const actual = lArr.toString();
            const expected = tempDerivativeList.toString();

            assert.equal(actual, expected);
        });
    }); /* */

/////////////////////////////////////////////////// toLinkedList ////////////////////////////////////////
    describe('testing "toLinkedList" method', function () {
        it(`should return empty ArrayList from method "toLinkedList"`, function () {
            const tempNativeList = new lClass();
			const tempDerivativeList = tempNativeList.toLinkedList();
			
            const actual = tempNativeList.toString();
			const expected = tempDerivativeList.toString();
			
            assert.equal(actual, expected);
        });

        it(`should return [3] from method "toLinkedList"`, function () {
            const tempNativeList = new lClass();
            tempNativeList.push(3);
			const tempDerivativeList = tempNativeList.toLinkedList();

            const actual = tempNativeList.toString();
			const expected = tempDerivativeList.toString();

            assert.equal(actual, expected);
        });

        it(`should return [3, 96, 6, 1, 2, 3, 4, 5] from method "toLinkedList"`, function () {
			const tempDerivativeList = lArr.toLinkedList();

            const actual = lArr.toString();
            const expected = tempDerivativeList.toString();

            assert.equal(actual, expected);
        });
    });  /* */

/////////////////////////////////////////////////// some and every ////////////////////////////////////////
    describe('testing "some" and "every" method', function () {
        const expected1 = true;
        let actual;

        const isAboveZero = function (val) {
            return val > 0;
        };

        it(`should return ${expected1} for method "some" with function "isAboveZero"`, function () {
            actual = lArr.some(isAboveZero);
            assert.equal(actual, expected1);
        });

        it(`should return ${expected1} for method "every" with function "isAboveZero"`, function () {
            actual = lArr.every(isAboveZero);
            assert.equal(actual, 1);
        });

        const isBelowZero = function (val) {
            return val < 0;
        };
        const expected2 = false;

        it(`should return ${expected2} for method "some" with function "isBelowZero"`, function () {
            actual = lArr.some(isBelowZero);
            assert.equal(actual, expected2);
        });

        it(`should return ${expected2} for method "every" with function "isBelowZero"`, function () {
            actual = lArr.every(isBelowZero);
            assert.equal(actual, expected2);
        });

        const allNumberBelow50 = function (val) {
            return val < 50;
        };
        const expected3 = false;

        it(`should return ${expected3} for method "some" with function "allNumberBelow50"`, function () {
            actual = lArr.some(isBelowZero);
            assert.equal(actual, expected3);
        });

        it(`should return ${expected3} for method "every" with function "allNumberBelow50"`, function () {
            actual = lArr.every(isBelowZero);
            assert.equal(actual, expected3);
        });
    });

///////////////////////////////////////////////////	getElementByInd ////////////////////////////////////////
    describe('testing getValueByInd method', function () {
        const testData = [3, 96, 6, 1, 2, 3, 4, 5];

        for (let i = 0; i < testData.length; i++) {
            let expected = testData[i];
            let actual;

            it(`should return ${expected} for index = ${i}`, function () {
                actual = lArr.getValueByInd(i);
                assert.equal(actual, expected);
            })
        }
    });

/////////////////////////////////////////////////// pop ///////////////////////////////////////////////////
    describe('testing pop method', function () {
        let testData = [
            {popedElements: [5], expectedArr: [3, 96, 6, 1, 2, 3, 4]},
            {popedElements: [4, 3], expectedArr: [3, 96, 6, 1, 2]},
            {popedElements: [2, 1, 6, 96, 3], expectedArr: []},
            {popedElements: [undefined], expectedArr: []}
        ];

        testData.forEach(function (data) {
            const {popedElements, expectedArr} = data;

            it(`array should become \[${expectedArr}\] when pop next elements: ${popedElements}`, function () {
                for (let i = 0; i < popedElements.length; i++) {
                    let expected = popedElements[i];
                    let actual = lArr.pop();

                    assert.equal(actual, expected);
                }

                //// Проверка результирующего массива
                if (lArrForAssert !== null) {
                    assert.deepEqual(lArrForAssert, expectedArr);
                }
            })
        })
    });

/////////////////////////////////////////////////// unshift ///////////////////////////////////////////////////
    describe('testing unshift method', function () {
        let testData = [
            {arrForPush: [3], expectedArr: [3]},
            {arrForPush: [96, 6], expectedArr: [6, 96, 3]},
            {arrForPush: [1, 2, 3, 4, 5], expectedArr: [5, 4, 3, 2, 1, 6, 96, 3]}
        ];

        testData.forEach(function (data) {
            const {arrForPush, expectedArr} = data;

            it(`array should become \[${expectedArr}\] when unshift next elements: ${arrForPush}`, function () {
                for (let i = 0; i < arrForPush.length; i++) {
                    let expectedArrLength = lArr.unshift(arrForPush[i]);
                    let actualArrLength = lArr.length;

                    assert.equal(expectedArrLength, actualArrLength);
                }

                //// Проверка результирующего массива
                if (lArrForAssert !== null) {
                    assert.deepEqual(lArrForAssert, expectedArr);
                }
            })
        });

        it('shoud return current array length when unshift empty parameter', function () {
            const expectedArr = [5, 4, 3, 2, 1, 6, 96, 3];

            let expectedArrLength = lArr.unshift();
            let actualArrLength = lArr.length;

            assert.equal(expectedArrLength, actualArrLength);

            //// Проверка результирующего массива
            if (lArrForAssert !== null) {
                assert.deepEqual(lArrForAssert, expectedArr);
            }
        });
    });

/////////////////////////////////////////////////// shift ///////////////////////////////////////////////////
    describe('testing shift method', function () {
        let testData = [
            {shiftedElements: [5], expectedArr: [4, 3, 2, 1, 6, 96, 3]},
            {shiftedElements: [4, 3], expectedArr: [2, 1, 6, 96, 3]},
            {shiftedElements: [2, 1, 6, 96, 3], expectedArr: []},
            {shiftedElements: [undefined], expectedArr: []}
        ];

        testData.forEach(function (data) {
            const {shiftedElements, expectedArr} = data;

            it(`array should become \[${expectedArr}\] when shift next elements: ${shiftedElements}`, function () {
                for (let i = 0; i < shiftedElements.length; i++) {
                    let expected = shiftedElements[i];
                    let actual = lArr.shift();

                    assert.strictEqual(actual, expected);
                }

                //// Проверка результирующего массива
                if (lArrForAssert !== null) {
                    assert.deepEqual(lArrForAssert, expectedArr);
                }
            })
        })
    });

/////////////////////////////////////////////////// splice ///////////////////////////////////////////////////
    describe('testing splice method', function () {
        let expected;
        let actual;

        it(`should return empty array`, function () {
            expected = [];
            actual = lArr.splice(5);

            assert.deepEqual(expected, actual);

            //// Проверка результирующего массива
            if (lArrForAssert !== null) {
                const actualArr = lArrForAssert;
                const expectedArr = [];

                assert.deepEqual(actualArr, expectedArr);
            }
        });

        it(`should return empty array again`, function () {
            expected = [];
            actual = lArr.splice(0, 55);

            assert.deepEqual(expected, actual);

            //// Проверка результирующего массива
            if (lArrForAssert !== null) {
                const actualArr = lArrForAssert;
                const expectedArr = [];

                assert.deepEqual(actualArr, expectedArr);
            }
        });

        it(`should return empty array again`, function () {
            expected = [];
            actual = lArr.splice(-7, 3, 's1');

            assert.deepEqual(expected, actual);

            //// Проверка результирующего массива
            if (lArrForAssert !== null) {
                const actualArr = lArrForAssert;
                const expectedArr = ['s1'];

                assert.deepEqual(actualArr, expectedArr);
            }
        });

        it(`should return empty array again`, function () {
            expected = [];
            actual = lArr.splice(99, 88, 7, 5);

            assert.deepEqual(expected, actual);


            //// Проверка результирующего массива
            if (lArrForAssert !== null) {
                const actualArr = lArrForAssert;
                const expectedArr = ['s1', 7, 5];

                assert.deepEqual(actualArr, expectedArr);
            }
        });

        it(`should return [7] array`, function () {
            expected = [7];
            actual = lArr.splice(1, 1, '8');

            assert.deepEqual(expected, actual);

            //// Проверка результирующего массива
            if (lArrForAssert !== null) {
                const actualArr = lArrForAssert;
                const expectedArr = ['s1', '8', 5];

                assert.deepEqual(actualArr, expectedArr);
            }
        });

        it(`should return ['s1', '8'] array`, function () {
            expected = ['s1', '8'];
            actual = lArr.splice(0, 2, 11, 12, 13);

            assert.deepEqual(expected, actual);

            //// Проверка результирующего массива
            if (lArrForAssert !== null) {
                const actualArr = lArrForAssert;
                const expectedArr = [11, 12, 13, 5];

                assert.deepEqual(actualArr, expectedArr);
            }
        });

        it(`should return [12, 13] array`, function () {
            expected = [12, 13];
            actual = lArr.splice(1, 2);

            assert.deepEqual(expected, actual);

            //// Проверка результирующего массива
            if (lArrForAssert !== null) {
                const actualArr = lArrForAssert;
                const expectedArr = [11, 5];

                assert.deepEqual(actualArr, expectedArr);
            }
        });

        it(`should return empty array in the end`, function () {
            expected = [11, 5];
            actual = lArr.splice(0);

            assert.deepEqual(expected, actual);

            //// Проверка результирующего массива
            if (lArrForAssert !== null) {
                const actualArr = lArrForAssert;
                const expectedArr = [];

                assert.deepEqual(actualArr, expectedArr);
            }
        });   /**/
    });
	
////////////////////////////////////////////////// sort ////////////////////////////////////////////////////
    describe('sort by insert method', function () {
        const testData = [
            { arr: [], expected: [] },
            { arr: [1], expected: [1] },
            { arr: [9, 2], expected: [2, 9] },
            { arr: [2, 9], expected: [2, 9] },
            { arr: [-2, 2, 0], expected: [-2, 0, 2] },
            { arr: [2, -2, 0], expected: [-2, 0, 2] },
            { arr: [0, 2, -2], expected: [-2, 0, 2] },
            { arr: [-2, 2, 0, 1], expected: [-2, 0, 1, 2] },
            { arr: [9, 2, 1890, 7564, 5428, -6544, 0, 0], expected: [-6544, 0, 0, 2, 9, 1890, 5428, 7564] },
            { arr: [9, 2, 1890, 7564, -45, 5428, -6544, 0, 0], expected: [-6544, -45, 0, 0, 2, 9, 1890, 5428, 7564] },
        ];

        testData.forEach(function (data) {
            const { arr, expected } = data;

            it(`should get sorted array \[${expected}\] when arr is \[${arr}\]`, function () {
				const tempList = new lClass();
				arr.forEach(function (e) { tempList.push(e); });
//				arr.forEach((e) => tempList.push(e));
				tempList.sort();
				
                const actual = tempList.toArrayList().arr;
                assert.deepEqual(actual, expected);
            })
        })
    })
	
/////////////////////////////////////////////////// insert ///////////////////////////////////////////////////
    describe('testing insert method', function () {
        const testData = [
            {value: 4, index: 0, expectedArr: [4]},
            {value: 67, index: 1, expectedArr: [4, 67]},
            {value: 7, index: 1, expectedArr: [4, 7, 67]}
        ];

        testData.forEach(function (data) {
            const {value, index, expectedArr} = data;

            it(`array should become \[${expectedArr}\] when inserts next elements: ${value} at index $(index)`, function () {
                const actual = lArr.insert(index, value);
				const expected = expectedArr.length;
			
				assert.equal(actual, expected);			

                if (lArrForAssert !== null) {
                    const actualArr = lArrForAssert;

                    assert.deepEqual(actualArr, expectedArr);
                }
            })
        });
		
		it('shoud reurn "undifined" when insert into out of range index', function () {
			chai.expect(lArr.insert(99, 148)).to.be.undefined;
		});

		it('shoud reurn "undifined" when insert into out of range index', function () {
			chai.expect(lArr.insert(-99, 148)).to.be.undefined;
		});
    })
	
/////////////////////////////////////////////////// remove ///////////////////////////////////////////////////
    describe('testing remove method', function () {
		it('shoud reurn "undifined" when remove into out of range index', function () {
			chai.expect(lArr.remove(99)).to.be.undefined;
		});

		it('shoud reurn "undifined" when remove into out of range index', function () {
			chai.expect(lArr.remove(-99)).to.be.undefined;
		});

        const testData = [
            {expected: 4, index: 0, expectedArr: [7, 67]},
            {expected: 67, index: 1, expectedArr: [7]},
            {expected: 7, index: 0, expectedArr: []}
        ];

        testData.forEach(function (data) {
            const {expected, index, expectedArr} = data;

            it(`array should become \[${expectedArr}\] when remove elements at index ${index}`, function () {
                const actual = lArr.remove(index);
			
				assert.equal(actual, expected);			

                if (lArrForAssert !== null) {
                    const actualArr = lArrForAssert;

                    assert.deepEqual(actualArr, expectedArr);
                }
            });
        });

		it('shoud reurn "undifined" when remove from empty array`', function () {
			chai.expect(lArr.remove(0)).to.be.undefined;
		}); /**/
    })	
});
