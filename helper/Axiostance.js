import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AxiosInstance = async (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        baseURL: 'http://192.168.1.29:8686/'
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            try {
                const token = await AsyncStorage.getItem('token'); // Truy xuất token từ AsyncStorage
                if (token) {
                    config.headers = {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': contentType
                    };
                }
            } catch (error) {
                console.error('Lỗi khi truy xuất token từ AsyncStorage: ', error);
            }
            return config;
        },
        err => Promise.reject(err)
    );

    axiosInstance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err)
    );
    return axiosInstance;
};

export default AxiosInstance;
