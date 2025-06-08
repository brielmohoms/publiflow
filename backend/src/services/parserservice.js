// Load the BibTeX parser library
const bibtexParse = require('bibtex-parse-js');
const bibtexFields = [
  "type", "title", "language", "summary", "author", "year", "date", "institution",
  "number of pages", "publisher", "location", "titel of the parent work", "date of first publication", "editors", 
  "keywords", "volume", "doi", "isbn"
];

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