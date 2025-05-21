const fs = require('fs');
const bibtexParse = require('bibtex-parse');

function convertBibtexToJson(inputFile, outputFile) {
    try {
        if (!fs.existsSync(inputFile)) {
            throw new Error('Input file does not exist.');
        }
        const bibtexStr = fs.readFileSync(inputFile, 'utf8');
        const parsed = bibtexParse.entries(bibtexStr);
        fs.writeFileSync(outputFile, JSON.stringify(parsed, null, 2));
        console.log('✅ JSON file created:', outputFile);
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

module.exports = { convertBibtexToJson };