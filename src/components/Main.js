require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

/** 获取图片的url 信息 **/
let imageData = require('../sources/imageDatas.json');

imageData = ((imageArr)=>{
    imageArr.forEach((item)=>{
        item.imageURL = require('../images/' + item.fileName);
    });
})(imageData);

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec">hello abc</section>
        <nav className="controller-nav"></nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
