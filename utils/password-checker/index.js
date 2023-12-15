// Constants for password requirements
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 20;
const MISSING_TYPES = 3;

const CHARACTER_MAPPING = {
    SMALL_A: 'a',
    CAPITAL_A: 'A',
    ZERO: '0',
    NINE: '9',
    SMALL_Z: 'z',
    CAPITAL_Z: 'Z'
}

function countCharacterTypes(password) {
    // Variables to track character type presence
    let hasLower = false;
    let hasUpper = false;
    let hasDigit = false;

    // Iterate through the password characters to identify character types
    for (let i = 0; i < password.length; i++) {
        if (password[i] >= CHARACTER_MAPPING.SMALL_A && password[i] <= CHARACTER_MAPPING.SMALL_Z) hasLower = true;
        if (password[i] >= CHARACTER_MAPPING.CAPITAL_A && password[i] <= CHARACTER_MAPPING.CAPITAL_Z) hasUpper = true;
        if (password[i] >= CHARACTER_MAPPING.ZERO && password[i] <= CHARACTER_MAPPING.NINE) hasDigit = true;
    }

    // Return an object containing character type presence
    return { hasLower, hasUpper, hasDigit };
}

function countRepeatingCharacters(password) {
    let repeating = 0;

    // Iterate through the password to count repeating characters
    for (let i = 2; i < password.length; i++) {
        if (password[i] === password[i - 1] && password[i - 1] === password[i - 2]) {
            let length = 2;
            // Count the consecutive repeating characters
            while (i < password.length && password[i] === password[i - 1]) {
                length++;
                i++;
            }
            // Update the repeating count with repetitions divided by missing types
            repeating += Math.floor(length / MISSING_TYPES);
        }
    }

    return repeating;
}

function strongPasswordChecker(password) {

    const PASSWORD_LENGTH = password.length;

    // Count character types present in the password
    const { hasLower, hasUpper, hasDigit } = countCharacterTypes(password);

    // Count the repeating characters
    const repeating = countRepeatingCharacters(password);

    // Calculate the missing types based on character type presence
    const missingTypes = (!hasLower) + (!hasUpper) + (!hasDigit);

    // Check password length and return appropriate result based on requirements
    if (PASSWORD_LENGTH < MIN_PASSWORD_LENGTH) {
        return Math.max(MIN_PASSWORD_LENGTH - PASSWORD_LENGTH, missingTypes);
    }

    if (PASSWORD_LENGTH <= MAX_PASSWORD_LENGTH) {
        return Math.max(missingTypes, repeating);
    }

    // Handle passwords longer than the maximum length
    let overLength = PASSWORD_LENGTH - MAX_PASSWORD_LENGTH;
    repeating -= Math.min(overLength, repeating);
    repeating -= Math.floor(Math.max(0, overLength - missingTypes) / 2);

    return overLength + Math.max(missingTypes, repeating);
}

module.exports = { strongPasswordChecker };
