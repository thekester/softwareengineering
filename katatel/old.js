// phoneNumberValidation.js

const isValid = (phoneNumber) => {
    // Remove all spaces from the phone number
    const cleanedNumber = phoneNumber.replace(/\s+/g, '');
    // Regex to validate a French phone number (e.g., 10 digits starting with 0)
    //if cleanedNumber.length ==10
    //const phoneRegex = /^0[1-9](\d{2}){4}$/;
    const phoneRegex = /^(?:(?:\+33|0033)[\s]?|0)([1-9])(?:[\s]?\d{2}){4}$/;
    return phoneRegex.test(cleanedNumber);
};

module.exports = { isValid };
