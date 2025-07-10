// Load the BibTeX parser library
const bibtexParse = require("bibtex-parse-js");
const { raw } = require("body-parser");
const bibtexFields = [
  "title",
  "language",
  "booktitle",
  "summary",
  "author",
  "year",
  "date",
  "institution",
  "pages",
  "number",
  "publisher",
  "location",
  "titel of the parent work",
  "date of first publication",
  "editors",
  "keywords",
  "volume",
  "doi",
  "isbn",
];

function safeAssign(obj, key, value) {
  if (value !== undefined && value !== null && String(value).trim() !== "") {
    obj[key] = value;
  }
}

module.exports = {
  parseBib: async (bibText) => {

    const rawEntries = bibtexParse.toJSON(bibText);

    return rawEntries.map((item, index) => {
     
      const entry = {
        id: index + 1,
        type: item.entryType || "",
        citationKey: item.citationKey || "",
      };

      bibtexFields.forEach((field) => {
        const tagName = field === "summary" ? "abstract" : field;

        const rawVal =
          item.entryTags && item.entryTags[tagName] !== undefined
            ? item.entryTags[tagName]
            : undefined;

        safeAssign(entry, field, rawVal);
      });

      return entry;
    });
  },
};
