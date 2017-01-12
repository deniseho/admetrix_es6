import delay from './delay'
import fetch from 'isomorphic-fetch'
require('es6-promise').polyfill();

class DataApi {
    static getEntireData() {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/entireData').then((response) => {
                response
                    .json()
                    .then((data) => {
                        resolve(Object.assign([], data));
                    }, delay);
            })

        });
    }

    static getUserData() {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/selfData').then((response) => {
                response
                    .json()
                    .then((data) => {
                        resolve(Object.assign([], data.ads));
                    }, delay);
            })

        });
    }

    static getAxisFilters() {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/selfData').then((response) => {
                response
                    .json()
                    .then((data) => {
                        resolve(Object.assign([], data.axisFilters));
                    })
            })
        });
    }

    static getDataFilters() {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/selfData').then((response) => {
                response
                    .json()
                    .then((data) => {
                        resolve(Object.assign({}, {
                            projects: data.projects,
                            ads: data.ads
                        }))
                    })
            })
        });
    }

    static selectOptions() {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/selfData').then((response) => {
                response
                    .json()
                    .then((data) => {
                        resolve(Object.assign({}, {
                            project: data.projects[0].projId
                        }))
                    })
            })
        })
    }
}

export default DataApi;
