import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './SearchByImg.scss';
import Header from '../../components/header';
import Footer from '../../components/footer';
function SearchByImg() {
  const [urlsImage, setUrlsImage] = useState([]);
  const [pathsImage, setPathsImage] = useState([]);
  const [state, setState] = useState({
    previewImageUrl: false,
    imageHeight: 200,
    imagePrediction: '',
  });
  const [imageFile, setImageFile] = useState();
  // Function for previewing the chosen image
  const generatePreviewImageUrl = (file, callback) => {
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);
    reader.onloadend = (e) => callback(reader.result);
  };

  // Event handler when image is chosen
  const handleChange = (event) => {
    const file = event.target.files[0];

    // If the image upload is cancelled
    if (!file) {
      return;
    }

    setImageFile(file);
    generatePreviewImageUrl(file, (previewImageUrl) => {
      setState({
        previewImageUrl,
        imagePrediction: '',
      });
    });
  };
  // Function for sending image to the backend
  const uploadHandler = (e) => {
    const formData = new FormData();
    formData.append('file', imageFile, 'img.png');
    var t0 = performance.now();
    axios
      .post('http://127.0.0.1:5000/searchbyimg', formData)
      .then(function (response, data) {
        data = response.data;
        var t1 = performance.now();
        // console.log('data: ', data);
        // console.log('type of data: ', typeof data);
        // console.log('response.data: ', data);
        setPathsImage(Object.values(eval(data[0])));
        setUrlsImage(Object(eval(data[1])));
        console.log(
          'The time it took to predict the image ' +
            (t1 - t0) +
            ' milliseconds.'
        );
      });
  };

  const handleRenderImage = () => {
    return pathsImage.map((path, i) => (
      <div className="product-layout" key={i}>
        <div className="product">
          <div className="img-container">
            <Link to={`/${urlsImage[i]}`}>
              <img className="image-product" key={i} src={`${path}`}></img>
              <p className="view-this">Xem sản phẩm </p>
            </Link>
          </div>
        </div>
      </div>
    ));
  };
  //   console.log('pathsImage: ', pathsImage, typeof pathsImage);
  //   console.log('urlImage: ', urlsImage, typeof urlsImage);
  //   console.log('pathImgae: ', pathsImage, typeof pathsImage);

  return (
    <>
      <Header />
      <div className="container-sbi">
        <p>Tải hình ảnh bạn muốn tìm kiếm</p>

        {/* Button for choosing an image */}
        <div>
          <input type="file" name="file" onChange={handleChange} />
        </div>

        {/* Button for sending image to backend */}
        <div>
          <input type="submit" onClick={uploadHandler} />
        </div>

        {/* Field for previewing the chosen image */}
        <div>
          {state.previewImageUrl && (
            <img
              className="preview-img"
              height={state.imageHeight}
              alt=""
              src={state.previewImageUrl}
            />
          )}
        </div>
        <h3>Kết quả tìm kiếm</h3>
        <div className="list-products">{handleRenderImage()}</div>
      </div>
      <Footer />
    </>
  );
}

export default SearchByImg;
