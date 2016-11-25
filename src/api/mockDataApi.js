const data =[
    { CPC: 5, CTR: 3 },
    { CPC: 10, CTR: 17 },
    { CPC: 15, CTR: 4 },
    { CPC: 12, CTR: 6 },
    { CPC: 2, CTR: 8 }
];

class DataApi {
  static getAllData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], data));
      }, 0);
    });
  }
}

export default DataApi;