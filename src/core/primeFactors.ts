export const getPrimeFactorsFor = (number) => {
	const factors = [2];

	if (number / 2 > 1) {
		factors.push(2);
	}

	return factors;
};
