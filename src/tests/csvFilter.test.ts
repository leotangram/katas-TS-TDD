import { CsvFilter } from '../core/csvFilter';

interface FileWithOneInvoiceLineHavingParams {
	invoiceId?: string;
	ivaTax?: string;
	igicTax?: string;
	netAmount?: string;
	nif?: string;
}

describe('CSV Filter', () => {
	const header = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente';
	const emptyField = '';

	test('should allows for correct lines only', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({});
		const csvFilter = CsvFilter.create([header, invoiceLine]);
		const result = csvFilter.filteredLines;

		expect(result).toEqual([header, invoiceLine]);
	});

	test('should allows only the correct lines when the igic tax is applied', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({ ivaTax: '', igicTax: '7', netAmount: '930' });
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header, invoiceLine]);
	});

	test('should allows only multiple correct lines', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({ invoiceId: '1' });
		const invoiceLine2 = fileWithOneInvoiceLineHaving({ invoiceId: '2' });
		const csvFilter = CsvFilter.create([header, invoiceLine, invoiceLine2]);
		const result = csvFilter.filteredLines;

		expect(result).toEqual([header, invoiceLine, invoiceLine2]);
	});

	test('should exclude lines with both tax fields populated as they are exclusive', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({ ivaTax: '21', igicTax: '7' });
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	test('should excludes lines with both tax field empty as one is required', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({ ivaTax: '', igicTax: '' });
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	test('should excludes lines with non decimal tax fields', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({ ivaTax: 'XYZ', igicTax: '' });
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	test('should excludes lines with tax fields populated even if non decimal', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({ ivaTax: 'XYZ', igicTax: '7' });
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	test('should excludes lines with miscalculated net amount for iva tax', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({ ivaTax: '21', igicTax: '', netAmount: '900' });
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	test('should excludes lines with miscalculated net amount for igic tax', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({ ivaTax: '', igicTax: '7', netAmount: '900' });
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	test('should excludes lines with with cif and nif fields populated as they are exclusive', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({ nif: 'b76730373' });
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	test('should excludes lines with repeated invoice id', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({ invoiceId: '1' });
		const invoiceLine2 = fileWithOneInvoiceLineHaving({ invoiceId: '1' });
		const invoiceLine3 = fileWithOneInvoiceLineHaving({ invoiceId: '3' });
		const invoiceLine4 = fileWithOneInvoiceLineHaving({ invoiceId: '4' });
		const invoiceLine5 = fileWithOneInvoiceLineHaving({ invoiceId: '3' });
		const csvFilter = CsvFilter.create([header, invoiceLine, invoiceLine2, invoiceLine3, invoiceLine4, invoiceLine5]);
		const result = csvFilter.filteredLines;

		expect(result).toEqual([header, invoiceLine4]);
	});

	test('should an empty list will produce an output empty list', () => {
		const csvFilter = CsvFilter.create([]);
		const result = csvFilter.filteredLines;

		expect(result).toEqual([]);
	});

	test('should does not allow a list of invoices with a single line', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({});
		const result = () => CsvFilter.create([invoiceLine]);

		expect(result).toThrow();
	});

	function fileWithOneInvoiceLineHaving({
		invoiceId = '1',
		ivaTax = '21',
		igicTax = emptyField,
		netAmount = '790',
		nif = emptyField,
	}: FileWithOneInvoiceLineHavingParams) {
		const invoicedDate = '02/05/2021';
		const grossAmount = '1000';
		const concept = 'ACER Laptop';
		const cif = 'B76430134';

		return [invoiceId, invoicedDate, grossAmount, netAmount, ivaTax, igicTax, concept, cif, nif].join(',');
	}
});
