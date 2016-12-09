import delay from './delay'
import fetch from 'isomorphic-fetch'
require('es6-promise').polyfill();

const selfData = {
    axisFilters: [
        {
            axisValue: "CPC",
            axisText: "CPC"
        }, {
            axisValue: "CTR",
            axisText: "CTR"
        }
    ],
    projects: [
        {
            projId: "projId-01",
            projName: "projName-01"
        }, {
            projId: "projId-02",
            projName: "projName-02"
        }
    ],
    adSets: [
        {
            adSetId: 'adSetId-01',
            adSetName: "adSet-01",
            projId: "projId-01"
        }, {
            adSetId: 'adSetId-02',
            adSetName: "adSet-02",
            projId: "projId-01"
        }, {
            adSetId: 'adSetId-03',
            adSetName: "adSet-03",
            projId: "projId-02"
        }
    ],
    ads: [
        {
            adId: 'adId-01',
            adName: 'adName-01'
        }, {
            adId: 'adId-02',
            adName: 'adName-02'
        }, {
            adId: 'adId-03',
            adName: 'adName-03'
        }, {
            adId: 'adId-04',
            adName: 'adName-04'
        }
    ],
    categories: [
        {
            categoryId: "categoryId-01",
            categoryName: "categoryName-01"
        }, {
            categoryId: "categoryId-02",
            categoryName: "categoryName-02"
        }, {
            categoryId: "categoryId-03",
            categoryName: "categoryName-03"
        }
    ]
}

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
                            adSets: data.adSets,
                            ads: data.ads,
                            categories: data.categories
                        }))
                    })
            })
        });
    }

    static selectOptions(selected) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign({}, {
                    // project: "projId-02",
                    project: "",
                    adSet: "",
                    ad: "",
                    category: ""
                }))
            }, delay)
        })
    }
}

export default DataApi;
