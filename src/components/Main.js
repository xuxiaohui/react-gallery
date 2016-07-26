require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

let imageDatas = require('sources/imageDatas.json');

imageDatas.forEach((item)=>{
    item.imageURL = require('../images/' + item.fileName);
});

let ImgFigure = React.createClass({
  render:function(){
    return (
      <figure className="img-figure">
        <img src={this.props.data.imageURL}
             alt={this.props.data.title}
        />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
});

class AppComponent extends React.Component {

  Constant:{
    centerPos:{
      left:0,
      right:0
    },
    /** 水平方向的取值范围 **/
    hPosRange: {
      leftSecX:[0,0],
      rightSecX:[0,0],
      y:[0,0]
    },
    /** 垂直方向的取值范围 **/
    vPosRange: {
       x:[0,0],
       topY:[0,0]
    }
  },

  getInitialStage:function(){
    return {
      imgsArrangeArr:[
        {

        }
      ];
    }
  },

  /**
   * 重新布局所有图片
   * @param  {[type]} centerIndex [指定居中排布哪个图片]
   * @return {[type]}             [description]
   */
  rearrange:function(centerIndex){

  },

  // 组件加载以后，为每张图片计算其位置的范围
  componentDidMount:function(){
    let stageDOM = React.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);

        // 拿到一个imageFigure的大小
        var imageFigureDOM = React.findDOMNode(this.refs.imgFigure0),
            imgW = imageFigureDOM.scrollWidth,
            imgH = imageFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);

            //  计算中心图片的左上角的点的位置
            this.Constant.centerPos = {
              left:halfStageW - halfImgW,
              top:halfStageH = halfImgH
            }

            // 计算左边区域和右边区域的位置
            this.Constant.hPosRange.leftSecX[0] = (-1)*halfImgW;
            this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW*2;

            this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
            this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

            this.Constant.hPosRange.y[0] = halfImgH;
            this.Constant.hPosRange.y[1] = stageH - halfImgH;

            // 上方区域的位置
            this.Constant.vPosRange.topY[0] = (-1)*halfImgH;
            this.Constant.vPosRange.topY[1] = halfStageH - 3*halfImgH;
            this.Constant.vPosRange.x[0] = halfStageW - halfImgW;
            this.Constant.vPosRange.x[1] = halfStageW;

            this.rearrange(0);
  },

  render() {

    let controllerUnits = [],
        ImgFigures = [];

        imageDatas.forEach((item,index) => {
            if (!this.state.imgsArrangeArr[index]) {
              this.state.imgsArrangeArr[index] = {
                pos: {
                  left:0,
                  top:0
                }
              }
            }
            ImgFigures.push(<ImgFigure data = {item} ref={'imgFigure' + index}/>);
        }.bind(this));

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {ImgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
