import { CsvFilter } from '../core/csvFilter';

describe('CSV Filter', () => {
	const header = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente';
	const emptyField = '';

	test('should allows for correct lines only', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving();
		const csvFilter = CsvFilter.create([header, invoiceLine]);
		const result = csvFilter.filteredLines;

		expect(result).toEqual([header, invoiceLine]);
	});

	test('should exclude lines with both tax fields populated as they are exclusive', () => {
		const invoiceLine = '1,02/05/2021,1000,790,21,7,ACER Laptop,B76430134,';
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	test('should excludes lines with both tax field empty as one is required', () => {
		const invoiceLine = '1,02/05/2021,1000,790,,,ACER Laptop,B76430134,';
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	test('should excludes lines with non decimal tax fields', () => {
		const invoiceLine = '1,02/05/2021,1000,790,XYZ,,ACER Laptop,B76430134,';
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	test('should excludes lines with tax fields populated even if non decimal', () => {
		const invoiceLine = '1,02/05/2021,1000,790,XYZ,7,ACER Laptop,B76430134,';
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	function fileWithOneInvoiceLineHaving(ivaTax = '21', igicTax = emptyField) {
		const invoiced = '1';
		const invoicedDate = '02/05/2021';
		const grossAmount = '1000';
		const netAmount = '790';
		const concept = 'ACER Laptop';
		const cif = 'B76430134';
		const nif = emptyField;

		return [invoiced, invoicedDate, grossAmount, netAmount, ivaTax, igicTax, concept, cif, nif].join(',');
	}
});
