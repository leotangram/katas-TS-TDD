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
	return wordWrapNoPrimitives(WrappableText.create(text), ColumnWidth.create(columnWidth));
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

class WrappableText {
	private constructor(private readonly text: string) {}

	static create(text: string) {
		if (!text) {
			return new WrappableText('');
		}
		return new WrappableText(text);
	}

	fitsIn(columnWidth: ColumnWidth) {
		return this.value().length <= columnWidth.value();
	}

	wrapIndex(columnWidth: ColumnWidth) {
		const indexOfSpace = this.value().indexOf(' ');
		const shallWrapBySpace = indexOfSpace > -1 && indexOfSpace < columnWidth.value();
		return shallWrapBySpace ? indexOfSpace : columnWidth.value();
	}

	unwrapIndex(columnWidth: ColumnWidth) {
		const indexOfSpace = this.value().indexOf(' ');
		const shallWrapBySpace = indexOfSpace > -1 && indexOfSpace < columnWidth.value();
		return shallWrapBySpace ? indexOfSpace + 1 : columnWidth.value();
	}

	value() {
		return this.text;
	}
}

export function wordWrapNoPrimitives(text: WrappableText, columnWidth: ColumnWidth): string {
	if (text.fitsIn(columnWidth)) return text.value();

	const wrapIndex = text.wrapIndex(columnWidth);
	const unwrapIndex = text.unwrapIndex(columnWidth);
	const wrappedText = text.value().substring(0, wrapIndex).concat('\n');
	const unwrappedText = text.value().substring(unwrapIndex);

	return wrappedText.concat(wordWrapNoPrimitives(WrappableText.create(unwrappedText), columnWidth));
}
