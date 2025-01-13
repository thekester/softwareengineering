// phoneNumberValidation.js
export const isValid = (phoneNumber) => {
    const cleanedNumber = phoneNumber.replace(/\s+/g, '');
    const phoneRegex = /^(?:(?:\+33|0033)[\s]?|0)([1-9])(?:[\s]?\d{2}){4}$/;
    return phoneRegex.test(cleanedNumber);
};
