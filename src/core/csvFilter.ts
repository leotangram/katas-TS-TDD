export class CsvFilter {
	private constructor(private readonly lines: string[]) {}

	static create(lines: string[]) {
		return new CsvFilter(lines);
	}

	get filteredLines() {
		const result = [];
		result.push(this.lines[0]);
		const fields = this.lines[1].split(',');
		const ivaField = fields[4];
		const igicField = fields[5];
		const taxFieldsAreMutuallyExclusive = (!ivaField || !igicField) && !(!ivaField && !igicField);
		if (taxFieldsAreMutuallyExclusive) {
			result.push(this.lines[1]);
		}
		return result;
	}
}
