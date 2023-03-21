export class CsvFilter {
	private constructor(private readonly lines: string[]) {}

	static create(lines: string[]) {
		return new CsvFilter(lines);
	}

	get filteredLines() {
		const header = this.lines[0];
		const invoices = this.lines.slice(1);
		const validatedInvoices = invoices.filter(this.validateInvoice());
		const duplicatedIds = this.takeRepeatedInvoiceId(validatedInvoices);
		const nonRepeatedInvoices = validatedInvoices.filter((invoice) => !duplicatedIds.includes(invoice.split(',')[0]));

		return [header].concat(nonRepeatedInvoices);
	}

	private validateInvoice = () => {
		return (invoice) => {
			const fields = invoice.split(',');
			const ivaField = fields[4];
			const igicField = fields[5];
			const decimalRegex = '\\d+(\\.\\d+)?';
			const taxFieldsAreMutuallyExclusive =
				(ivaField.match(decimalRegex) || igicField.match(decimalRegex)) && (!ivaField || !igicField);
			const grossAmountField = fields[2];
			const netAmountField = fields[3];
			const netAmountIsWellCalculated =
				this.checkIfNetAmountIsCorrect(netAmountField, grossAmountField, ivaField) ||
				this.checkIfNetAmountIsCorrect(netAmountField, grossAmountField, igicField);
			const identifyFieldsAreMutuallyExclusive = !fields[7] || !fields[8];

			return taxFieldsAreMutuallyExclusive && netAmountIsWellCalculated && identifyFieldsAreMutuallyExclusive;
		};
	};

	private checkIfNetAmountIsCorrect(netAmountField: string, grossAmountField: string, taxField: string) {
		const parsedNetAmount = parseFloat(netAmountField);
		const parsedGrossAmount = parseFloat(grossAmountField);
		const parsedTaxField = parseFloat(taxField);
		return parsedNetAmount === parsedGrossAmount - (parsedGrossAmount * parsedTaxField) / 100;
	}

	private takeRepeatedInvoiceId(invoices: string[]) {
		const invoicesIds = invoices.map((invoice) => invoice.split(',')[0]);
		return invoicesIds.filter((id, index) => invoicesIds.indexOf(id) !== index);
	}
}
