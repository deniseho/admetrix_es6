import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
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

//This would be performed on the server in a real app. Just stubbing in.
// const generateId = (author) => {
//   return author.firstName.toLowerCase() + '-' + author.lastName.toLowerCase();
// };

class DataApi {
  static getAllData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], allData));
      }, delay);
    });
  }

  // static saveAuthor(data) {
  //   data = Object.assign({}, data); // to avoid manipulating object passed in.
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       // Simulate server-side validation
  //       const minAuthorNameLength = 3;
  //       if (data.firstName.length < minAuthorNameLength) {
  //         reject(`First Name must be at least ${minAuthorNameLength} characters.`);
  //       }

  //       if (data.lastName.length < minAuthorNameLength) {
  //         reject(`Last Name must be at least ${minAuthorNameLength} characters.`);
  //       }

  //       if (data.id) {
  //         const existingAuthorIndex = allData.findIndex(a => a.id == author.id);
  //         allData.splice(existingAuthorIndex, 1, data);
  //       } else {
  //         //Just simulating creation here.
  //         //The server would generate ids for new authors in a real app.
  //         //Cloning so copy returned is passed by value rather than by reference.
  //         data.id = generateId(data);
  //         allData.push(data);
  //       }

  //       resolve(data);
  //     }, delay);
  //   });
  // }

  // static deleteAuthor(dataId) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       const indexOfAuthorToDelete = allData.findIndex(data => {
  //         data.dataId == dataId;
  //       });
  //       allData.splice(indexOfAuthorToDelete, 1);
  //       resolve();
  //     }, delay);
  //   });
  // }
}

export default DataApi;
