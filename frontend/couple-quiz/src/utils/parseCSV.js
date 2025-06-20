import Papa from 'papaparse';

export const parseCSVFile = (filePath, callback) => {
  fetch(filePath)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch CSV: ${res.status} ${res.statusText}`);
      }
      return res.text();
    })
    .then((text) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log(`✅ Parsed CSV from ${filePath}:`, results.data);
          callback(results.data);
        },
        error: (err) => {
          console.error(`❌ Error parsing CSV at ${filePath}:`, err);
        }
      });
    })
    .catch((err) => {
      console.error(`❌ Error fetching CSV at ${filePath}:`, err);
    });
};
