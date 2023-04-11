export const getPrimeFactorsFor = (number) => {
	let factor = 2;

	if (number % factor !== 0) {
		factor = 3;
	}

	const factors = [factor];
	const remainder = number / factor;

	if (remainder > 1) {
		return factors.concat(getPrimeFactorsFor(remainder));
	}

	return factors;
};
