export function wordWrap(text: string, columnWidth: number): string {
	if (text.length <= columnWidth) return text;

	let wrappedText;
	let unwrappedText;

	if (text.indexOf(' ') > -1 && text.indexOf(' ') < columnWidth) {
		wrappedText = text.substring(0, text.indexOf(' ')).concat('\n');
		unwrappedText = text.substring(text.indexOf(' ') + 1);
	} else {
		wrappedText = text.substring(0, columnWidth).concat('\n');
		unwrappedText = text.substring(columnWidth);
	}

	return wrappedText.concat(wordWrap(unwrappedText, columnWidth));
}
