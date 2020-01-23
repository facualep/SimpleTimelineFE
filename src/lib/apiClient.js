import axios from 'axios';
import {TIMELINE_URL, errors } from './../config';

export const apiGetHits = async() => {
  let result = await axios.get( TIMELINE_URL + 'Hits')
  .then(response => {
    if (response.data.error) {
      console.log(response)
    } else {
      return response.data;
    }
    
  })
  return result;
}

export const apiCreateHit = async(date, title, description, links) => {
  let result = await axios.post(TIMELINE_URL + 'Hits', {
    HitDate: date,
    Title: title,
    Description: description,
    Links: links
  })
  .then(response => {
    if (response.data.error) {
      console.log(response)
    } else {
      return response.data;
    }
  })
  return result;
}

// export const apiLoginUser = async(mail, password) => {
//   let user = {};
//   let result = await axios.post(TASKIFY_URL + 'auth/login', {
//     Mail: mail,
//     Password: password
//   })
//   .then(response => {
//     if (response.data.code === 0) {
//       let authData = response.data.data.token;
//       user.accessToken = authData.accessToken;
//       user.expiration = authData.expiration;
//       user.refreshToken = authData.refreshToken;
//       user.refreshTokenExpiration = authData.refreshTokenExpiration;
//       return({
//         error: false,
//         errorMsj: '',
//         data: user
//       })
//     } else {
//       return ({
//         error: true,
//         errorMsj: errors.API_GETDATA_ERROR,
//         data: {}
//       })
//     }
//   })
//   return result;
// }

// export const apiGetUserData = async(token) => {
//   let result = axios.get( TASKIFY_URL + 'user/', {
//     headers: {'Authorization': "bearer " + token}
//   })
//   .then(response => {
//       if (response.data.code === 0) {
//         let userData = response.data.data;
//         return {
//           error: false,
//           errorMsj: '',
//           data: {
//             id: userData.id,
//             mail: userData.mail,
//             name: userData.name,
//             image: userData.profileImage
//           }
//         }
//       } else {
//         return ({
//           error: true,
//           errorMsj: errors.API_GETDATA_ERROR,
//           data: {}
//         })
//       }
//   })
//   return result;
// }

// export const apiRefreshLoginUser = async(id, refresh) => {
//   let result = axios.post(TASKIFY_URL + 'auth/refreshlogin', {
//     'userid': id,
//     'refreshtoken': refresh
//   }).then(response => {
//     if (response.data.code === 0) {
//       let user = {};
//       let authData = response.data.data.token;
//       user.accessToken = authData.accessToken;
//       user.expiration = authData.expiration;
//       user.refreshToken = authData.refreshToken;
//       user.refreshTokenExpiration = authData.refreshTokenExpiration;
//       return {
//         error: false,
//         errorMsj: '',
//         data: user
//       }
//     } else {
//       return {
//         error: true,
//         errorMsj: errors.API_GETDATA_ERROR,
//         data: {}
//       }
//     }
//   })
//   return result;
// }

// export const apiGetTasks = async(token) => {
//   let result = axios.get(TASKIFY_URL + 'notes', {
//     headers: {'Authorization': "bearer " + token}
//   }).then(response => {
//     if (response.data.code === 0) {
//       console.log(response);
//       return {
//         error: false,
//         errorMsj: '',
//         data: response.data.data
//       }
//     } else {
//       return {
//         error: true,
//         errorMsj: errors.API_GETDATA_ERROR,
//         data: {}
//       }
//     }
//   })
//   return result;
// }

