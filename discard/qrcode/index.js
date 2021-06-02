import React, { forwardRef, useImperativeHandle, useLayoutEffect } from 'react';
import QRCode from 'qrcode.react';
import genNonDuplicateID from '../tools/genNonDuplicateID';

const qrcodeId = `qrcode_${genNonDuplicateID(4)}`;
const newQrcodeId = `qrcode_${genNonDuplicateID(4)}`;
let newCanvas;

export default forwardRef((props, ref) => {
  const {
    img,
    size = 128,
    scaleSize = 0.26,
    ...rest
  } = props;

  useImperativeHandle(ref, () => ({
    canvas: () => img ? newCanvas : document.getElementById(qrcodeId),
  }));

  useLayoutEffect(() => {
    if (!img) return;

    const { imgSize, imgPosition } = getImgSize();
    const wrap = document.getElementById(newQrcodeId);
    wrap.innerHTML = '';

    const qrCodeCanvas = document.getElementById(qrcodeId); // 获取二维码的 canvas
    const qrCodeBase64 = qrCodeCanvas.toDataURL('image/png'); // 获取二维码的 base64
    const canvas = newCanvas || document.createElement('canvas'); // 创建 canvas 对象，该对象最后会显示在页面上
    newCanvas = canvas;
    canvas.width = size; // 设置宽度
    canvas.height = size; // 设置高度
    const context = canvas.getContext('2d'); // 获取 2d 绘制对象
    const qrCodeImg = new Image(); // 创建二维码 img 对象
    qrCodeImg.src = qrCodeBase64; // 写入二维码的 base64 码

    // 二维码img对象加载后
    qrCodeImg.onload = () => {
      context.drawImage(qrCodeImg, 0, 0, size, size); // 将二维码绘制到 canvas 对象中

      // 创建 logo 的 img 对象
      const logoImg = new Image();
      logoImg.src = img; // 写入 img 对象

      logoImg.onload = () => {
        const center = size/2; // 当前画布中心点

        // 绘制白底的圆
        context.arc(center, center, imgSize/2, 0, 2*Math.PI);
        context.fillStyle = '#fff';
        context.fill();

        // 绘制圆形头像，arc(x坐标，y坐标，半径，起始角，结束角)
        context.beginPath();
        context.arc(center, center, imgSize/2 - 4, 0, 2*Math.PI); // 头像的圆要比白底色圆小 8 个单位
        context.clip();
        context.drawImage(logoImg, imgPosition, imgPosition, imgSize, imgSize);
        wrap.appendChild(canvas);
      };
    };
  }, [rest.value]);

  const getImgSize = () => {
    const imgSize = size * scaleSize; // logo 缩放基准
    const imgPosition = (size - imgSize)/2;

    return {
      imgSize,
      imgPosition,
    };
  };

  if (img) {
    return (
      <React.Fragment>
        <QRCode {...rest} size={size} id={qrcodeId} style={{ display: 'none' }} />
        <div id={newQrcodeId} style={{ display: 'inline-block', width: size, height: size }} />
      </React.Fragment>
    );
  }

  return <QRCode {...rest} size={size} id={qrcodeId} />;
})
