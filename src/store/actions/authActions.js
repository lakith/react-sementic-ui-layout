import * as authActions from './actionTypes'
import axios from '../../axios-base'

export const authStart = () => {
    return{
        type:authActions.AUTH_START
    }
}

export const authSuccess = (userData,accessToken) => {
    return{
        type:authActions.AUTH_SUCCCESS,
        userData:userData,
        accessToken:accessToken
    }
}

export const authSubmitSuccess = () => {
    return{
        type:authActions.AUTH_SUBMIT_SUCCESS
    }
}

export const authSubmitError = (err) => {
    return{
        type:authActions.AUTH_SUBMIT_ERROR,
        errors:err
    }
}

export const setAuthSubmitRedirectPath = () => {
    return{
        type:authActions.AUTH_SUBMIT_REDIRECT_PATH
    }
}

export const authFail = (error) => {
    return {
        type:authActions.AUTH_FAIL,
        error:error
    }
}

export const logout = ()=> {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    return {
        type : authActions.AUTH_LOGOUT
    }
} 

export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
         setTimeout(()=>{
             dispatch(logout());
         },expirationTime*1000);
     }
 }


export const authLogin = (username,password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username : username,
            password : password
        };
        axios.post("staffUser/login",authData)
            .then(response => {
                const expiratioDate = new Date(new Date().getTime()+response.data.expiration);
                localStorage.setItem('accessToken',response.data.authToken.accessToken);
                localStorage.setItem('refreshToken',response.data.authToken.refreshToken);
                localStorage.setItem('expirationDate',expiratioDate);
                localStorage.setItem('userId',response.data.userId)

                let userData = {
                    userId: response.data.userId,
                    name : response.data.name,
                    email : response.data.email,
                    username : response.data.userName,
                    userRole : {
                        roleId: response.data.userRole.roleId,
                        roleType: response.data.userRole.roleType
                    },
                    profileUrl:response.data.profileUrl
                }
                dispatch(authSuccess(userData,response.data.authToken.accessToken))
                dispatch(checkAuthTimeOut(response.data.expiration))
            })
            .catch(error=> {
                dispatch(authFail(error))
            })
    }
}

export const authSubmit = (userData) => {
    console.log(userData);
    return dispatch => {
        dispatch(authStart());
        const formData = new FormData();
        formData.append("name",userData.name)
        formData.append("email",userData.email)
        formData.append("password",userData.password)
        formData.append("userName",userData.userName)
        formData.append("roleId",2)
        formData.append("profilePic",userData.file)

        axios({
            method:'post',
            url:"staffUser/addNewUser",
            data:formData,
            headers:{
                'content-Type': 'multipart/form-data',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then((response)=>{
            console.log("response");
            console.log(response);
            dispatch(authSubmitSuccess());
        }).catch((error)=> {
            console.log(error.response);
            dispatch(authSubmitError(error.response.data.message));
        })
    }
}