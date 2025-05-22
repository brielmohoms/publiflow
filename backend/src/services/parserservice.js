const fs = require('fs');
const bibtexParse = require('bibtex-parse-js');

function convertBibtexToJson(inputFile, outputFile) {
    try {
        if (!fs.existsSync(inputFile)) {
            throw new Error('Input file does not exist.');
        }

        const bibtexStr = fs.readFileSync(inputFile, 'utf8');

        // ✅ Parse le contenu avec bibtexParse.toJSON
        const parsed = bibtexParse.toJSON(bibtexStr);

        fs.writeFileSync(outputFile, JSON.stringify(parsed, null, 2));
        console.log('✅ JSON file created:', outputFile);
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// ✅ Fonction utilisée par upload.js pour traiter req.body (du texte .bib)
async function parseBib(bibText) {
    try {
        const parsed = bibtexParse.toJSON(bibText);
        return parsed;
    } catch (err) {
        throw new Error('BibTeX parsing failed: ' + err.message);
    }
}

module.exports = {
    convertBibtexToJson,
    parseBib
};

