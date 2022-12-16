export function toCamelCase(text: string) {
	const words = text.split(/[ _-]/g);
	return words.map((word) => word.charAt(0).toUpperCase() + word.substring(1)).join('');
}
