import { fibonacci } from '../core/fibonacci';

describe('The fibonacci sequence', () => {
	test('should yields value zero to number zero', () => {
		expect(fibonacci(0)).toBe(0);
	});

	test('should yields value one to number one', () => {
		expect(fibonacci(1)).toBe(1);
	});
});
