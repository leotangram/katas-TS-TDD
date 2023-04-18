export function wordWrap(text: string, columnWidth: number): string {
	if (text.length <= columnWidth) return text;

	const wrappedText = text.substring(0, columnWidth).concat('\n');
	const unwrappedText = text.substring(columnWidth);
	return wrappedText.concat(wordWrap(unwrappedText, columnWidth));
}
