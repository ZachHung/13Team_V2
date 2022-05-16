import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './compare.scss';
import axios from 'axios';
import { publicRequest } from '../../utils/CallApi';
import { currentChange } from '../../utils/const';
import { Link } from 'react-router-dom';

import Header from '../../components/header';
import Footer from '../../components/footer';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

export default function ComparePage() {
  const [products, setProductsList] = useState([]);
  const [convertedProducts, setConvertedProducts] = useState([]);
  const compare = useLocation();
  // console.log('úeLocation ', compare);

  // console.log('compare.search: ', compare.search);
  var str = compare.search;
  var typeProduct = str.substring(str.indexOf('?') + 1, str.lastIndexOf('='));
  // console.log('type Product: ', typeProduct);
  const idProduct = new URLSearchParams(compare.search).get(typeProduct); // .serach là tham số bắt buộc để get query params
  // console.log('IDproduct: ', idProduct);
  useEffect(() => {
    publicRequest.get(`/phone/compare?product=${idProduct}`).then((res) => {
      setProductsList(res.data);
      // console.log(res.data);
      window.history.pushState(
        {},
        'So Sánh',
        `http://localhost:3000/compare?${typeProduct}=${res.data[0].slug[0].slug}-${res.data[0].slug[0].detail},${res.data[1].slug[0].slug}-${res.data[1].slug[0].detail}`
      );
    });
  }, []);

  useEffect(() => {
    products.map((item) =>
      item.techInfo.map((techInfo) =>
        techInfo.infoDetail.map((detail) =>
          setConvertedProducts((prev) => [...prev, detail])
        )
      )
    );
  }, [products]);

  const handleLoop = (convertedProducts) => {
    if (convertedProducts != undefined) {
      const temp = convertedProducts.slice(0, 7);
      return temp.map((item, index) => (
        <tr key={index}>
          <th>{item.infoName}</th>
          <td>{convertedProducts[index].infoNum}</td>
          <td>{convertedProducts[index + 7].infoNum}</td>
        </tr>
      ));
    } else {
      console.log('undefined r, check lai di');
    }
  };

  if (products == undefined || products.length == 0) {
    return (
      <>
        <h1>Đang tải</h1>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div className="comparePage-container">
          <table>
            <tbody>
              {
                <tr>
                  <th>Model</th>
                  {products.map((item, i) => (
                    <td key={i}>
                      <Link
                        to={`/phone/${item.slug[0].slug}-${item.slug[0].detail}`}
                      >
                        <img src={`${item.image[0]}`} alt={item.name} />
                      </Link>
                      <h3>{item.name}</h3>
                      <div className="price">
                        <span>
                          {currentChange(item.slug[0].color[0].price)}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
              }
              {handleLoop(convertedProducts)}
            </tbody>
          </table>
        </div>
        <Footer />
      </>
    );
  }
}
