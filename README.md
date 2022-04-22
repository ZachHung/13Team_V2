# 13Team 2.0

Phiên bản nâng cấp của trang web 13Team theo hướng MERN stack.

## 🏁 Hướng dẫn cài đặt

1. Clone repo này về

```shell
git clone https://github.com/ZachHung/13Team_V2.git
cd 13Team_V2
```

2. Tải các node module cho backend

```shell
npm i
```

3. Tải các node module cho frontend

```shell
cd frontend
npm i
```

4. Set up các biến môi trường cho backend như các hướng dẫn trong file `.envexample`
5. Set up một file `.env` trong folder **frontend** là các biến môi trường cho **frontend** có tên là `REACT_APP_SERVER_PATH` chứa URL host của backend, mặc định sẽ có giá trị `http://localhost:5000`. Biến này sẽ được sử dụng để lấy các URL request từ API.

## 📃 Hướng dẫn sử dụng

Để tiện lợi cho việc phát triển trang web, tôi đã tạo một số script sau đây:

- **npm run server**: chạy backend.
- **npm run client**: chạy frontend.
- **npm run dev**: chạy cả hai backend và frontend.

## ❗ Lưu ý

Để giải thiểu phát sinh lỗi khi cài đặt và sử dụng hãy nhớ các lưu ý sau đây:

- Chú ý là mình đang ở thư mục **frontend** hoặc **backend** trước khi chạy các lệnh npm.
- Hãy sử dụng các biến môi trường để gọi API thay vì hardcode vô. Sau này chúng ta còn host nữa, nếu hardcode URL của API thì khi host website chúng ra sẽ phải chỉnh sửa code lại rất mất công. Thay vì thế hãy dùng biến môi trường `REACT_APP_SERVER_PATH`.
- Khi muốn redirect sau khi gọi API chúng ta không nên redirect trong API luôn mà hãy redirect bằng **frontend**. React-router có cung cấp một hook tên là **useNavigate** để phục vụ cho việc này. [Document của useNavigate](https://reactrouter.com/docs/en/v6/api#usenavigate)
