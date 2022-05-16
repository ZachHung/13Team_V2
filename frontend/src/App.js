import HomePage from './pages/home';
import PhonePage from './pages/PhonePages/PhonePage';
import NotFound from './pages/NotFound';
import Purchase from './pages/Purchase/Purchase';

import './App.scss';
import LoginPage from './pages/login/Login';
import Register from './pages/register/Register';
import Recovery from './pages/recovery/Recovery';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';

import ProductPage from './pages/Product/ProductPage';
import PrivateRoute from './routes/PrivateRoute';
import AuthUserRoute from './routes/AuthUserRoute';
import Admin from './pages/Admin';
import CartPage from './pages/Cart';
import ScrollButton from './components/scrollBtn';
import Dashboard from './pages/Dashboard/Dashboard';
import ItemsAdmin from './pages/itemsAdmin/ItemsAdmin';
import CreateItem from './pages/createItem/createItem';
import UpdateItem from './pages/updateItem/UpdateItem';
import AddItemDetail from './pages/addItemDetail/addItemDetail';
import UpdateItemDetail from './pages/updateItem/UpdateItemDetail';
import UsersAdmin from './pages/usersAdmin/UsersAdmin';
import UpdateUser from './pages/updateUser/UpdateUser';
import PurchasesAdmin from './pages/purchasesAdmin/PurchasesAdmin';
import UpdatePurchase from './pages/updatePurchase/UpdatePurchase';
import AdminProfile from './pages/usersAdmin/AdminProfile';
import DetailPurchaseAdmin from './pages/purchasesAdmin/DetailPurchaseAdmin';
import Blank from './pages/Blank';
import ComparePage from './pages/compareProducts/compare';
import SearchByImg from './pages/SearchByImgPage/SearchByImg';
//import scss va boxicon cho dashboard
import './assets/libs/boxicons-2.1.1/css/boxicons.min.css';
import './scss/App.scss';
import UserInfo from './pages/userInfo/UserInfo';
import SearchPage from './pages/SearchPage/SearchPage';
import VnpayReturn from './pages/VnpayReturn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const isAdmin = useSelector((state) => state.user.isAdmin);
  return (
    <>
      <Routes>
        {/* start publicRoute */}
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/phone" element={<PhonePage />} />
        <Route path="/laptop" element={<PhonePage />} />
        <Route path="/accessory" element={<PhonePage />} />
        <Route path="/tablet" element={<PhonePage />} />
        <Route path="/phone/:id" element={<ProductPage />} />
        <Route path="/laptop/:id" element={<ProductPage />} />
        <Route path="/tablet/:id" element={<ProductPage />} />
        <Route path="/accessory/:id" element={<ProductPage />} />
        <Route path="/vnPay" element={<VnpayReturn />} />
        <Route path="/searchbyimg" element={<SearchByImg />} />

        {/* end publicRoute */}

        {/* start private Route */}
        <Route path="/*" element={<PrivateRoute></PrivateRoute>}>
          <Route path="cart" element={<CartPage></CartPage>} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="user" element={<UserInfo></UserInfo>}></Route>
        </Route>
        {/* end private Route */}

        {/* start authRoute */}
        <Route path="/*" element={<AuthUserRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<Register />} />
          <Route path="recovery" element={<Recovery />} />
        </Route>
        {/* end authRoute */}

        {/* start adminRoute */}
        {isAdmin ? (
          <Route path="/admin/*" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<PurchasesAdmin />} />
            <Route path="orders/detail/:id" element={<DetailPurchaseAdmin />} />
            <Route path="orders/update/:id" element={<UpdatePurchase />} />
            <Route path="products" element={<ItemsAdmin />} />
            <Route path="products/update/:id" element={<UpdateItem />} />
            <Route
              path="products/updateDetail/:id"
              element={<UpdateItemDetail />}
            />
            <Route path="customers" element={<UsersAdmin />} />
            <Route path="customers/update/:id" element={<UpdateUser />} />
            <Route path="settings" element={<AdminProfile />} />
            <Route path="stats" element={<Blank />} />
            <Route path="products/create/" element={<CreateItem />} />
            <Route path="products/addOptions/:id" element={<AddItemDetail />} />
          </Route>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </Routes>
      <ScrollButton />
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
