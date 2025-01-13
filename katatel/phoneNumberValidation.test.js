// phoneNumberValidation.test.js

const { isValid } = require('./phoneNumberValidation');

test('string with a simple number should return true', () => {
    expect(isValid("01 23 45 67 89")).toBe(true);
});

test('string with a simple number without spaces should return true', () => {
    expect(isValid("0123456789")).toBe(true);
});

test('string with an invalid number should return false', () => {
    expect(isValid("123 45 67 89")).toBe(false); // Doesn't start with 0
});

test('string with too few digits should return false', () => {
    expect(isValid("01 23 45 67")).toBe(false); // Less than 10 digits
});

test('string with invalid characters should return false', () => {
    expect(isValid("01 23 45 67 AB")).toBe(false); // Contains letters
});

test('valid number with international prefix +33 should return true', () => {
    expect(isValid("+33 1 23 45 67 89")).toBe(true);
});

test('valid number with international prefix +33 without spaces should return true', () => {
    expect(isValid("+33123456789")).toBe(true);
});

test('valid number with international prefix 0033 should return true', () => {
    expect(isValid("0033 1 23 45 67 89")).toBe(true);
});

test('valid number with international prefix 0033 without spaces should return true', () => {
    expect(isValid("0033123456789")).toBe(true);
});

test('invalid number with too few digits and international prefix should return false', () => {
    expect(isValid("+33 12345678")).toBe(false);
});

test('invalid number with too many digits should return false', () => {
    expect(isValid("01234567890")).toBe(false);
});

test('invalid number with too many digits and international prefix should return false', () => {
    expect(isValid("+33 12345678901")).toBe(false);
});

test('invalid number with too many digits and prefix 0033 should return false', () => {
    expect(isValid("0033 12345678901")).toBe(false);
});

test('number with invalid characters in the middle should return false', () => {
    expect(isValid("0A23456789")).toBe(false);
});

test('valid UK number with +44 prefix should return false', () => {
    expect(isValid("+44 1234567890")).toBe(false);
});

test('invalid number without a valid prefix should return false', () => {
    expect(isValid("1123456789")).toBe(false); // Doesn't start with 0 or valid international prefix
});
