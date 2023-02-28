function hasSixCharactersOrMore(password: string) {
	return password.length >= 6;
}

function containNumber(password: string): boolean {
	return /.*\d.*/.test(password);
}

export function isStrongPassword(password: string): boolean {
	return hasSixCharactersOrMore(password) && containNumber(password);
}
