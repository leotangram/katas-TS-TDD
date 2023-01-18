const nothingToAdd = 0;

export const sumNumbers = (expression: string | null) => {
	if (!expression) {
		return nothingToAdd;
	}

	const beggingOfConfig = '//';
	const endOfConfig = '/';
	let separator = ',';
	if (expression.startsWith(beggingOfConfig)) {
		separator = getSeparator(expression, beggingOfConfig, endOfConfig);
		expression = removeConfigFrom(expression, endOfConfig);
	}

	const tokens = expression.split(separator);
	return tokens.map((token) => getNumber(token)).reduce(sum);
};

const removeConfigFrom = (expression: string, endOfConfig: string) =>
	expression.slice(expression.lastIndexOf(endOfConfig) + 1);

const getSeparator = (expression: string, beggingOfConfig: string, endOfConfig: string) =>
	expression.slice(beggingOfConfig.length, expression.lastIndexOf(endOfConfig));

const getNumber = (token: string | null) => {
	const number = Number(token);
	return isNaN(number) ? nothingToAdd : number;
};

const sum = (previousNumber: number, currenNumber: number) => previousNumber + currenNumber;
