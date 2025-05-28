// Load the BibTeX parser library
const bibtexParse = require('bibtex-parse-js');

module.exports = {
  
  parseBib: async (bibText) => {
    
    // Use bibtex-parse-js to convert the raw text into a JS array
    const rawEntries = bibtexParse.toJSON(bibText);

    // Map each parsed entry to your desired shape
    return rawEntries.map((item, index) => ({
      id: index + 1,                         
      type: item.entryType || '',           
      key: item.citationKey || '',           
      title: item.entryTags.title || '',    
      author: item.entryTags.author || '',   
      year: item.entryTags.year || '',    
    }));
  }
};
