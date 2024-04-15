import axios from 'axios'
import { ElLoading } from 'element-plus';
const request = axios.create({
    baseURL: '/api',
    timeout: 6000,
})

let loadingInstance;
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    loadingInstance = ElLoading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (loadingInstance) {
        loadingInstance.close();
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    if (loadingInstance) {
        loadingInstance.close();
    }
    return Promise.reject(error);
});
export default request;