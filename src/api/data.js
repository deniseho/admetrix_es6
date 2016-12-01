// const data = [     {         login: {             // userId: '',
// isUser: true         },         projects:[             {
// projId: "projId-01",                 projName: "projName-01"             },
//           {                 projId: "projId-02",                 projName:
// "projName-02"             }         ],         adGroups:[             {
//           adGroupId: 'adGroupId-01',                 adGroupName:
// "adGroup-01",                 projId: 'projId-01'             },
// {                 adGroupId: 'adGroupId-02',                 adGroupName:
// "adGroup-02",                 projId: 'projId-01'             },
// {                 adGroupId: 'adGroupId-03',                 adGroupName:
// "adGroup-03",                 projId: 'projId-02'             }         ],
//      ads:[             {                 adId: 'adId-01',
// adName: 'adName-01',                 adGroupId: 'adGroupId-01',
//   CPC: 15,                 CTR: 23             },             {
//   adId: 'adId-02',                 adName: 'adName-02',
// adGroupId: 'adGroupId-01',                 CPC: 22,                 CTR: 24
//           },             {                 adId: 'adId-03',
// adName: 'adName-03',                 adGroupId: 'adGroupId-02',
//   CPC: 33,                 CTR: 41             },             {
//   adId: 'adId-04',                 adName: 'adName-04',
// adGroupId: 'adGroupId-03',                 CPC: 19,                 CTR: 38
//           }         ]     } ] export default data;

const data = {
    login: {
        userId: '',
        accessToken: '',
        picture: ''
    },
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
    adGroups: [
        {
            adGroupId: 'adGroupId-01',
            adGroupName: "adGroup-01"
        }, {
            adGroupId: 'adGroupId-02',
            adGroupName: "adGroup-02"
        }, {
            adGroupId: 'adGroupId-03',
            adGroupName: "adGroup-03"
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
    ],
     adResults: [
        {
            adId: 'adId-01',
            adName: 'adName-01',
            isUser: true,
            CPC: 15,
            CTR: 23
        }, {
            adId: 'adId-01',
            adName: 'adName-01',
            isUser: false,
            CPC: 4,
            CTR: 7
        }, {
            adId: 'adId-01',
            adName: 'adName-01',
            isUser: false,
            CPC: 1,
            CTR: 3
        }, {
            adId: 'adId-01',
            adName: 'adName-01',
            isUser: false,
            CPC: 22,
            CTR: 6
        }, {
            adId: 'adId-01',
            adName: 'adName-01',
            isUser: false,
            CPC: 14,
            CTR: 5
        }, {
            adId: 'adId-01',
            adName: 'adName-01',
            isUser: false,
            CPC: 8,
            CTR: 2
        }, {
            adId: 'adId-01',
            adName: 'adName-01',
            isUser: false,
            CPC: 9,
            CTR: 11
        }, {
            adId: 'adId-01',
            adName: 'adName-01',
            isUser: false,
            CPC: 21,
            CTR: 22
        }
    ]
}

export default data;


