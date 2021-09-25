const testData = {
  _id: 0,
  questions: [
    {
      id: 0,
      productId: 0,
      body: 'test',
      dateWritten: (new Date).getTime(),
      askerName: 'test',
      askerEmail: 'test@test.com',
      reported: 0,
      helpful: 0,
      answers: [
        {
          photos: [],
          id: 0,
          questionId: 0,
          body: 'test',
          dateWritten: (new Date).getTime(),
          askerName: 'test',
          askerEmail: 'test',
          reported: 0,
          helpful: 0
        },
        {
          photos: [],
          id: 1,
          questionId: 0,
          body: 'test',
          dateWritten: (new Date).getTime(),
          askerName: 'test',
          askerEmail: 'test',
          reported: 1,
          helpful: 0
        }
      ]
    },
    {
      id: 1,
      productId: 0,
      body: 'test',
      dateWritten: (new Date).getTime(),
      askerName: 'test',
      askerEmail: 'test@test.com',
      reported: 1,
      helpful: 0,
      answers: [
        {
          photos: [],
          id: 2,
          questionId: 0,
          body: 'test',
          dateWritten: (new Date).getTime(),
          askerName: 'test',
          askerEmail: 'test',
          reported: 0,
          helpful: 0
        }
      ]
    }
  ]
};

module.exports.testData = testData;