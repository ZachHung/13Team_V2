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
