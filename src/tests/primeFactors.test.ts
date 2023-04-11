import { getPrimeFactorsFor } from '../core/primeFactors';
/*
2 -> [2]
2 * 2 -> [2,2]
2 * 2 * 2 -> [2,2,2]
3 -> [3]
3 * 3 -> [3,3]
3 * 2 -> [2,3]
5 * 5 -> [5,5]
5 * 7 * 11 * 3 -> [3,5,7,11]
*/

describe('The prime factors', () => {
	test('should finds the prime composition of the given number', () => {
		expect(getPrimeFactorsFor(2)).toEqual([2]);
		expect(getPrimeFactorsFor(2 * 2)).toEqual([2, 2]);
		expect(getPrimeFactorsFor(2 * 2 * 2)).toEqual([2, 2, 2]);
		expect(getPrimeFactorsFor(3)).toEqual([3]);
		expect(getPrimeFactorsFor(3 * 3)).toEqual([3, 3]);
		expect(getPrimeFactorsFor(2 * 3)).toEqual([2, 3]);
	});
});
