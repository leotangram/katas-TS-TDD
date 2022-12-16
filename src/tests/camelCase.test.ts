import { toCamelCase } from '../core/camelCase';
describe('Camel case converter', () => {
	test('should allows empty text', () => {
		expect(toCamelCase('')).toBe('');
	});
	test('should allows campitalized word', () => {
		expect(toCamelCase('Foo')).toBe('Foo');
	});
	test('should joins the capitalized words that are separated by spaces', () => {
		expect(toCamelCase('Foo Bar')).toBe('FooBar');
	});
	test('should joins the capitalized words that are separated by hyphens', () => {
		expect(toCamelCase('Foo_Bar-Foo')).toBe('FooBarFoo');
	});
	test('should converts the first character of one word to uppercase', () => {
		expect(toCamelCase('foo')).toBe('Foo');
	});
	test('should converts the first character of one word to uppercase', () => {
		expect(toCamelCase('foo_bar-foo')).toBe('FooBarFoo');
	});
});
