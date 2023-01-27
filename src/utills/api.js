import http from "./http";

export const getBlogPosts = (page) =>{
    return http({
        url : `/posts`,
        method : 'GET'
    }).then((res) => res.data)
};

export const registerUser = (data) =>{
    return http({
        url : '/users',
        method : 'POST',
        data : data
    }).then((res) => res.data)
};

export const getuserDetails = () =>{
    return http({
        url : '/users',
        method : 'GET',
    }).then((res) => res.data)
}

export const sendPostDetails = (data) =>{
    return http({
        url : '/posts',
        method : 'POST',
        data : data
    }).then((res) => res.data)
}



