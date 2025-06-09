import Papa from 'papaparse';

export const parseCSVFile = (filePath, callback) => {
  fetch(filePath)
    .then((res) => res.text())
    .then((text) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          callback(results.data);
        },
      });
    });
};
