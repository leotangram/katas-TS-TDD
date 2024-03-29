export class CsvFilter {
	private constructor(private readonly lines: string[]) {}

	static create(lines: string[]) {
		if (lines.length === 1) {
			throw new Error('Single line is not allowed');
		}
		return new CsvFilter(lines);
	}

	get filteredLines() {
		if (this.lines.length === 0) {
			return [];
		}
		const header = this.lines[0];
		const invoices = this.lines.slice(1);
		const validatedInvoices = invoices.filter(this.isValidInvoice());
		const duplicatedIds = this.takeRepeatedInvoiceId(validatedInvoices);
		const nonRepeatedInvoices = validatedInvoices.filter(
			(invoice) => !duplicatedIds.includes(this.incoicedId(invoice))
		);

		return [header].concat(nonRepeatedInvoices);
	}

	private isValidInvoice = () => {
		return (invoice) => {
			const fields = invoice.split(',');
			const ivaField = fields[4];
			const igicField = fields[5];
			const decimalRegex = '\\d+(\\.\\d+)?';
			const areaTaxFieldsMutuallyExclusive =
				(ivaField.match(decimalRegex) || igicField.match(decimalRegex)) && (!ivaField || !igicField);
			const grossAmountField = fields[2];
			const netAmountField = fields[3];
			const isNetAmountCorrect =
				this.hasCorrectAmount(netAmountField, grossAmountField, ivaField) ||
				this.hasCorrectAmount(netAmountField, grossAmountField, igicField);
			const areaIdentifierFieldsMutuallyExclusive = !fields[7] || !fields[8];

			return areaTaxFieldsMutuallyExclusive && isNetAmountCorrect && areaIdentifierFieldsMutuallyExclusive;
		};
	};

	private hasCorrectAmount(netAmountField: string, grossAmountField: string, taxField: string) {
		const parsedNetAmount = parseFloat(netAmountField);
		const parsedGrossAmount = parseFloat(grossAmountField);
		const parsedTaxField = parseFloat(taxField);
		return parsedNetAmount === parsedGrossAmount - (parsedGrossAmount * parsedTaxField) / 100;
	}

	private takeRepeatedInvoiceId(invoices: string[]) {
		const invoicesIds = invoices.map((invoice) => this.incoicedId(invoice));
		return invoicesIds.filter((id, index) => invoicesIds.indexOf(id) !== index);
	}

	private incoicedId(invoice: string): string {
		return invoice.split(',')[0];
	}
}
