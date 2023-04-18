export function wordWrap(text: string | null | undefined, columnWidth: number): string {
	if (columnWidth < 0) {
		throw new Error('Negative column width is not allowed');
	}

	if (!text) {
		return '';
	}

	if (text.length <= columnWidth) return text;

	const wrapIndex = getWrapIndex(text, columnWidth);
	const unwrapIndex = getUnwrapIndex(text, columnWidth);
	const wrappedText = text.substring(0, wrapIndex).concat('\n');
	const unwrappedText = text.substring(unwrapIndex);

	return wrappedText.concat(wordWrap(unwrappedText, columnWidth));
}

function getWrapIndex(text: string, columnWidth: number) {
	const indexOfSpace = text.indexOf(' ');
	const shallWrapBySpace = indexOfSpace > -1 && indexOfSpace < columnWidth;
	return shallWrapBySpace ? indexOfSpace : columnWidth;
}

function getUnwrapIndex(text: string, columnWidth: number) {
	const indexOfSpace = text.indexOf(' ');
	const shallWrapBySpace = indexOfSpace > -1 && indexOfSpace < columnWidth;
	return shallWrapBySpace ? indexOfSpace + 1 : columnWidth;
}
