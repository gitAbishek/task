import axios from "axios";

const http = axios.create({
    baseURL : 'http://blogpost.test/wp-json/wp/v2',
    headers : {
        'Content-Type' : 'application/json',
    },
    auth : {
        username : 'root',
        password : 'toor'
    }
})

export default http;