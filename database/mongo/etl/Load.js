const { getFileAsObject } = require('./fsHelpers.js');
const { uploadRecords } = require('../controllers/controllers.js');

const uploadJsonToMongo = async () => {
  console.time('loading time');
  let processed = 0;
  let records = [];
  let passes = 5;
  let process, start, stop, batch;

  for (let i = 0; i < 21; i++) {
    records = await getFileAsObject(i).filter((record) => {
      return record != null;
    });
    process = Math.floor(records.length / passes);
    for (let i = 0; i < passes; i++) {
      start = process * i;
      stop = (process * i) + process;
      batch = records.slice(start, stop);

      await uploadRecords(batch);
      processed += process;
      console.log(`Total uploaded ${processed}`);
    }
  }
  console.log('Finished Uploading docs');
  console.timeEnd('loading time');
};

uploadJsonToMongo();