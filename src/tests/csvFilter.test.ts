import { CsvFilter } from '../core/csvFilter';

describe('CSV Filter', () => {
	const header = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente';

	test('should allows for correct lines only', () => {
		const invoiceLine = '1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,';
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
});
