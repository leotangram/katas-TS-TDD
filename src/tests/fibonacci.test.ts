import { fibonacci } from '../core/fibonacci';

describe('The fibonacci sequence', () => {
	test('should yields value zero to number zero', () => {
		expect(fibonacci(0)).toBe(0);
	});

	test('should yields value one to number one', () => {
		expect(fibonacci(1)).toBe(1);
	});

	test('should is a series where the value for a number is the addition of the preceding two values', () => {
		[2, 3, 4, 5].forEach((number) => {
			expect(fibonacci(number)).toBe(fibonacci(number - 1) + fibonacci(number - 2));
		});
	});
});
