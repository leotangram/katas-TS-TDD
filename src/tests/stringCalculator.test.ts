import { sumNumbers } from '../core/stringCalculator';
/**
 * null => 0
 * "" => 0
 * "1" => 1
 * "1,2" => 3
 * "1,2,3" => 6
 * "a" => 0
 * "1,a" => 1
 * "1,a,2" => 3
 * "1a,2" => 2
 * "//#/3#2" => 5
 * "//#/3,2" => 0
 * "//%/1%2%3" => 6
 */

describe('The string calculator', () => {
	test('should does not increment the total in case of null or empty expression', () => {
		expect(sumNumbers(null)).toBe(0);
		expect(sumNumbers('')).toBe(0);
	});

	test('should converts number in string to number type', () => {
		expect(sumNumbers('1')).toBe(1);
	});

	test('should sums all numbers separated by commas', () => {
		expect(sumNumbers('1, 2')).toBe(3);
		expect(sumNumbers('1, 2, 3')).toBe(6);
	});

	test('should does not increment the total in case of non numeric symbol', () => {
		expect(sumNumbers('a')).toBe(0);
		expect(sumNumbers('1, a')).toBe(1);
		expect(sumNumbers('1, a, 2')).toBe(3);
	});

	test('should sums all the numbers separated by custom separator', () => {
		expect(sumNumbers('//#/3#2')).toBe(5);
		expect(sumNumbers('//#/3,2')).toBe(0);
		expect(sumNumbers('//%/1%2%3')).toBe(6);
	});
});
