import { wordWrap } from '../core/wordWrap';

describe('The Word Wrap', () => {
	test('should makes every single line of text fit column width', () => {
		expect(wordWrap('hello')).toBe('hello');
	});
});
