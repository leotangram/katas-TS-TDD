export function wordWrapOld(text: string | null | undefined, columnWidth: number): string {
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

	return wrappedText.concat(wordWrapOld(unwrappedText, columnWidth));
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

export function wordWrap(text: string | null | undefined, columnWidth: number): string {
	return wordWrapNoPrimitives(text, ColumnWidth.create(columnWidth));
}

class ColumnWidth {
	private constructor(private readonly width: number) {}

	static create(width: number) {
		if (width < 0) {
			throw new Error('Negative column width is not allowed');
		}
		return new ColumnWidth(width);
	}

	value() {
		return this.width;
	}
}

export function wordWrapNoPrimitives(text: string | null | undefined, columnWidth: ColumnWidth): string {
	if (!text) {
		return '';
	}

	if (text.length <= columnWidth.value()) return text;

	const wrapIndex = getWrapIndex(text, columnWidth.value());
	const unwrapIndex = getUnwrapIndex(text, columnWidth.value());
	const wrappedText = text.substring(0, wrapIndex).concat('\n');
	const unwrappedText = text.substring(unwrapIndex);

	return wrappedText.concat(wordWrapNoPrimitives(unwrappedText, columnWidth));
}
