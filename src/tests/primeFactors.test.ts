import { getPrimeFactorsFor } from '../core/primeFactors';

describe('The prime factors', () => {
	test('should knows that the forst prime is number one', () => {
		expect(getPrimeFactorsFor(1)).toEqual([1]);
	});

	test('should knows what is a prime number', () => {
		expect(getPrimeFactorsFor(2)).toEqual([2]);
		expect(getPrimeFactorsFor(3)).toEqual([3]);
	});

	test('should produces the same result to multiply the numbers in the output', () => {
		expect(getPrimeFactorsFor(2 * 2 * 2)).toEqual([2, 2, 2]);
	});

	test('should orders the prime factors from the smallest to the biggest', () => {
		expect(getPrimeFactorsFor(5 * 7 * 11 * 3)).toEqual([3, 5, 7, 11]);
	});

	test('should only accepts positive numbers', () => {
		expect(() => getPrimeFactorsFor(-5)).toThrow();
	});
});
