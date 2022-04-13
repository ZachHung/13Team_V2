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

//import scss va boxicon cho dashboard
import './assets/libs/boxicons-2.1.1/css/boxicons.min.css';
import './scss/App.scss';

function App() {
  const isAdmin = useSelector((state) => state.user.isAdmin);
  return (
    <>
      <Routes>
        {/* start publicRoute */}
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route exact path="/:type" element={<PhonePage />} />
        <Route path="/:type/:id" element={<ProductPage></ProductPage>}></Route>
        {/* end publicRoute */}

        {/* start private Route */}
        <Route path="/*" element={<PrivateRoute></PrivateRoute>}>
          <Route path="cart" element={<CartPage></CartPage>} />
          <Route path="purchase" element={<Purchase />} />
        </Route>
        {/* end private Route */}

        {/* start authRoute */}
        <Route path="/*" element={<AuthUserRoute></AuthUserRoute>}>
          <Route path="login" element={<LoginPage></LoginPage>} />
          <Route path="register" element={<Register></Register>}></Route>
          <Route path="recovery" element={<Recovery></Recovery>}></Route>
        </Route>
        {/* end authRoute */}

        {/* start adminRoute */}
        {isAdmin ? (
          <Route path="/admin" element={<Admin></Admin>}></Route>
        ) : (
          <React.Fragment></React.Fragment>
        )}

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

        {/* end adminRoute */}
      </Routes>
      <ScrollButton />
    </>
  );
}

export default App;
