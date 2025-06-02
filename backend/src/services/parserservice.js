// Load the BibTeX parser library
const bibtexParse = require('bibtex-parse-js');

const bibtexFields = [
  "address", "author", "booktitle", "chapter", "doi", "edition", "editor", "howpublished",
  "institution", "isbn", "issn", "journal", "month", "note", "number", "organization",
  "pages", "publisher", "school", "series", "title", "type", "url", "volume", "year",
  "abstract", "annote", "crossref", "key", "language", "location", "pdf", "keywords"
];

module.exports = {
  parseBib: async (bibText) => {
    const rawEntries = bibtexParse.toJSON(bibText);

    return rawEntries.map((item, index) => {
      const entry = { id: index + 1 };
      bibtexFields.forEach(field => {
        entry[field] = item.entryTags && item.entryTags[field] ? item.entryTags[field] : '';
      });
      entry.type = item.entryType || '';
      entry.key = item.citationKey || '';
      return entry;
    });
  }
};