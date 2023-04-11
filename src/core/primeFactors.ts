export const getPrimeFactorsFor = (number) => {
	const factor = 2;
	const factors = [factor];
	const remainder = number / factor;

	if (remainder > 1) {
		return factors.concat(getPrimeFactorsFor(remainder));
	}

	return factors;
};
