import { wordWrap } from '../core/wordWrap';

describe('The Word Wrap', () => {
	test('should makes every single line of text fit column width', () => {
		expect(wordWrap('hello', 5)).toBe('hello');
		expect(wordWrap('longword', 4)).toBe('long\nword');
		expect(wordWrap('longword', 3)).toBe('lon\ngwo\nrd');
		expect(wordWrap('reallylongword', 4)).toBe('real\nlylo\nngwo\nrd');
		expect(wordWrap('abc def', 4)).toBe('abc\ndef');
	});
});
