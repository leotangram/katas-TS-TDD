export function wordWrap(text: string, columnWidth: number): string {
	if (text.length <= columnWidth) return text;

	const wrappedText = text.substring(0, columnWidth).concat('\n');
	const unwrappedText = text.substring(columnWidth);
	// let acumulatedText = wrappedText;

	// while (unwrappedText.length > columnWidth) {
	// 	wrappedText = unwrappedText.substring(0, columnWidth).concat('\n');
	// 	unwrappedText = unwrappedText.substring(columnWidth);
	// 	acumulatedText += wrappedText;
	// }

	return wrappedText.concat(wordWrap(unwrappedText, columnWidth));
}
