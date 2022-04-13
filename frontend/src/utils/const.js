import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});
// retrive name brand array
export const brandNameList = () => {
  api.get('/phone/brand/name').then((res) => {
    return res.data;
  });
};
export const hostServer = 'http://localhost:5000';
export const currentChange = (price) => {
  price = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
  return price;
};

export const formatDate = (dateValue) => {
  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return Date(dateValue).toLocaleDateString('vi-VN', options);
};
