// Load the BibTeX parser library
const bibtexParse = require('bibtex-parse-js');
const bibtexFields = ["Dokumenttyp", "Autor*innen","Sprache der Veröffentlichung",
  "Titel",  "Zusammenfassung", "Jahr der Fertigstellung", "Monat der Veröffentlichung",
  "Veröffentlichende Institution", "Seitenanzahl","Verlag",
  "Verlagsort","Titel des übergeordneten Werkes","Herausgeber*innen","Schlagwörter","Kommentar","URL",
  "PDF", "DOI"];


module.exports = {
  parseBib: async (bibText) => {
    const rawEntries = bibtexParse.toJSON(bibText);

    return rawEntries.map((item, index) => {
      const entry = { id: index + 1 };
      bibtexFields.forEach(field => {
          entry [field]= item.entryTags && item.entryTags.abstract ? item.entryTags.abstract : '', 
        entry[field] = item.entryTags && item.entryTags[field] ? item.entryTags[field] : '';
      });
      entry.type = item.entryType || '';
      entry.key = item.citationKey || '';
      return entry;
    });
  }
};