import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:5000/api/v1",
    // baseURL: "https://localhost:5001/api/v1",
    headers:{Authorization: localStorage.getItem('token'), "Content-type":"application/json;charset=utf-8"}
});
