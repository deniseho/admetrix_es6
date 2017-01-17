let localAuth = JSON.parse(localStorage.getItem("admatrixAuth"))

export default {
  login : {
    "accessToken": localAuth.accessToken,
    "email": localAuth.email,
    "id": localAuth.id,
    "name": localAuth.name,
    "picture":localAuth.picture
  },  
  // login : {
  //   "accessToken": "",
  //   "email": "",
  //   "id": "",
  //   "name": "",
  //   "picture": ""
  // },
  entireData : [],
  axisOptions : [],
  dataFilterOptions : {
    projects: [],
    ads: []
  },
  selectedOptions : {
    project: "",
    adSet: "",
    ad: "",
    category: ""
  },
  ajaxCallsInProgress : 0
};
