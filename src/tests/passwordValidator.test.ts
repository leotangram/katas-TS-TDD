import { isStrongPassword } from '../core/passwordValidator';
// 1. **1234abcdABCD_ ⇒ *true*** cumple todas las reglas
// 2. **1aA_ ⇒ *false*** no tiene longitud suficiente
// 3. **abcdABCD_ ⇒ *false*** no tiene números
// 4. **1234ABCD_ ⇒ *false*** - no tiene minúsculas
// 5. **1234abcd_ ⇒ *false*** - no tiene mayúsculas
// 6. **1234abcdABCD ⇒ *false*** no tiene guion bajo

describe('The password strength validator', () => {
	test('should considers a password to be strong when all requeriments are met', () => {
		expect(isStrongPassword('1234abcdABCD_')).toBe(true);
	});

	test('should fails when the password is too short', () => {
		expect(isStrongPassword('1aA_')).toBe(false);
	});
});
