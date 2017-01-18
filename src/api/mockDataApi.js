import delay from './delay'
import fetch from 'isomorphic-fetch'
require('es6-promise').polyfill();

class DataApi {
    static fbLogin(localAuth) {
        localAuth = Object.assign({}, localAuth);
        //todo: send localAuth to server

        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/login').then((response) => {
                response
                    .json()
                    .then((data) => {
                        resolve(localAuth)
                    })
            })
        })
    }

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

    static getAxisFilters() {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/filtersOptions').then((response) => {
                response
                    .json()
                    .then((data) => {
                        resolve(Object.assign([], data.axes));
                    })
            })
        });
    }

    static getDataFilters() {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/filtersOptions').then((response) => {
                response
                    .json()
                    .then((data) => {
                        resolve(Object.assign({}, {
                            projects: data.projects,
                            ads: data.ads,
                            actionTypes: data.actionTypes,
                            monthes: data.monthes
                        }))
                    })
            })
        });
    }
}

export default DataApi;
