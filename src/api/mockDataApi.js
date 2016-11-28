import delay from './delay';

const allData = [
      {
        id: 'ad1',
        isUser: true,
        CPC: 15,
        CTR: 23
    }, {
        id: 'ad2',
        isUser: false,
        CPC: 4,
        CTR: 7
    }, {
        id: 'ad3',
        isUser: false,
        CPC: 1,
        CTR: 3
    }, {
        id: 'ad4',
        isUser: false,
        CPC: 22,
        CTR: 6
    },
        {
        id: 'ad5',
        isUser: false,
        CPC: 14,
        CTR: 5
    }, {
        id: 'ad6',
        isUser: false,
        CPC: 8,
        CTR: 2
    }, {
        id: 'ad7',
        isUser: false,
        CPC: 9,
        CTR: 11
    }, {
        id: 'ad8',
        isUser: false,
        CPC: 21,
        CTR: 22
    }
];


class DataApi {
  static getAllData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], allData));
      }, delay);
    });
  }

}

export default DataApi;
