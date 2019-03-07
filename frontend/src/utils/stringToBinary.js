const stringToBinary = input => {
    const characters = input.split('');

    return characters.map(char => {
        const binary = char.charCodeAt(0).toString(2);
        const pad = Math.max(8 - binary.length, 0);
        return '0'.repeat(pad) + binary;
    }).join('');
};

export default stringToBinary
