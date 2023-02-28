function hasSixCharactersOrMore(password: string) {
	return password.length >= 6;
}

function containNumber(password: string): boolean {
	return /.*\d.*/.test(password);
}

function containsLowerCase(password: string): boolean {
	return /.*[a-z].*/.test(password);
}

function containsUpperCase(password: string): boolean {
	return /.*[A-Z].*/.test(password);
}

export function isStrongPassword(password: string): boolean {
	return (
		hasSixCharactersOrMore(password) &&
		containNumber(password) &&
		containsLowerCase(password) &&
		containsUpperCase(password) &&
		password.includes('_')
	);
}
