function generateMixedCode() {
    // Get a random number between 0 and 999
    const randomNumber = Math.floor(Math.random() * 1000);
    // Format the number with leading zeros if necessary
    const formattedNumber = parseInt(randomNumber.toString().padStart(3, '0'));

    // Get three random letters from the alphabet
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const firstLetter = alphabet[Math.floor(Math.random() * 26)];
    const secondLetter = alphabet[Math.floor(Math.random() * 26)];
    const thirdLetter = alphabet[Math.floor(Math.random() * 26)];

    // Combine the formatted number and letters to obtain the mixed code
    const mixedCode = firstLetter + secondLetter + thirdLetter + formattedNumber;
    return mixedCode;
}

export const randomCode = generateMixedCode();
