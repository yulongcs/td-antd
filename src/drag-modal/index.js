import React, { useState, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { Modal } from 'antd';
import './index.less';

let dragging = false; // 是否拖拽的开关
let tLeft = 0; // ---|
let tTop = 0; //  ------> 坐标轴

export default (props) => {
  const {
    width,
    wrapClassName,
    title = 'Drag-Modal',
  } = props;
  const [id] = useState(Math.random());
  const [dragDom, setDragDom] = useState();
  const initLeft = (window.innerWidth - (width || 520)) / 2; // 初始化位置调整

  /*
   * 组件加载之后，获取目标 dom
   * */
  useLayoutEffect(() => {
    const dom = document.getElementsByClassName(`d_${id}`)[0];
    dom.style.left = `${initLeft}px`;
    dom.style.top = '100px';

    setDragDom(dom);
  }, []);

  const onMouseDown = (e) => {
    e.preventDefault();
    dragging = true; // 激活拖拽状态
    /*
    * 实现点击后，当前浮层在最上面
    * */
    const nodeList = document.getElementsByClassName('td-drag-box');
    if (nodeList.length >= 2) {
      Array.from(nodeList).forEach(node => node.style.zIndex = 9999);
      dragDom.style.zIndex = 10000;
    }

    /*
    * getBoundingClientRect: 返回一个 DomRect 对象
    *   包含该元素的 top、right、bottom、left 值，对应的是到屏幕上方和左边的距离，单位 px
    * */
    const dragDomRect = dragDom.getBoundingClientRect();
    /*
    * e.clientX、e.clientY
    *   获取鼠标的坐标位置
    * */
    tLeft = e.clientX - dragDomRect.left; // 鼠标按下时和选中元素的坐标偏移:x坐标
    tTop = e.clientY - dragDomRect.top; // 鼠标按下时和选中元素的坐标偏移:y坐标

    onMouseMove(dragDom);
  };

  const onMouseMove = (node) => {
    document.onmousemove = (e) => {
      e.preventDefault();
      if (dragging) {
        node.style.left = `${e.clientX - tLeft}px`;
        node.style.top = `${e.clientY - tTop}px`;
      }
    }
  };

  const onMouseUp = (e) => {
    e.preventDefault();
    dragging = false; // 停止移动状态
    document.onmousemove = null; // 停止鼠标移动事件
  };

  return (
    <Modal
      {...props}
      forceRender
      mask={false}
      wrapClassName={classNames('td-drag-box', `d_${id}`, wrapClassName)}
      title={
        <div
          className="td-drag-title"
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          {title}
        </div>
      }
    />
  );
}
