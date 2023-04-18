export function wordWrap(text: string, columnWidth: number): string {
	if (text.length <= columnWidth) return text;

	let wrappedText = text.substring(0, columnWidth).concat('\n');
	let unwrappedText = text.substring(columnWidth);
	let acumulatedText = wrappedText;

	while (unwrappedText.length > columnWidth) {
		wrappedText = unwrappedText.substring(0, columnWidth).concat('\n');
		unwrappedText = unwrappedText.substring(columnWidth);
		acumulatedText += wrappedText;
	}

	return `${acumulatedText}${unwrappedText}`;
}
