import { wordWrap } from '../core/wordWrap';

describe('The Word Wrap', () => {
	test('should empty text does not need to be wrapped', () => {
		expect(wordWrap('', 5)).toBe('');
		expect(wordWrap(null, 5)).toBe('');
		expect(wordWrap(undefined, 5)).toBe('');
	});
	test('should small text does not need to be wrapped', () => {
		expect(wordWrap('hello', 5)).toBe('hello');
	});
	test('should words are wrapped when do not fit the column width', () => {
		expect(wordWrap('longword', 4)).toBe('long\nword');
		expect(wordWrap('reallylongword', 4)).toBe('real\nlylo\nngwo\nrd');
	});
	test('should spaces are preferred for wrapping', () => {
		expect(wordWrap('longword', 3)).toBe('lon\ngwo\nrd');
		expect(wordWrap('abc def ghi', 4)).toBe('abc\ndef\nghi');
		expect(wordWrap(' abcd', 4)).toBe('\nabcd');
	});
	test('should does not allow for negative column with', () => {
		expect(() => wordWrap('hello', -5)).toThrow('Negative column width is not allowed');
	});
});
