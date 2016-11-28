// import * as types from './actionTypes';
// import dataApi from '../api/mockDataApi';
// import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


// export function loadDataSuccess(courses) {
//   return { type: types.LOAD_DATA_SUCCESS, courses};
// }


// export function loadAllData() {
//   return function(dispatch) {
//     dispatch(beginAjaxCall());
//     return dataApi.getAllData().then(data => {
//       dispatch(loadDataSuccess(data));
//     }).catch(error => {
//       throw(error);
//     });
//   };
// }
