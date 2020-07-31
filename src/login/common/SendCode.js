/*
* 发送验证码组件
* API：{
*   language：语言
*   onBefore：倒数前执行的函数，需要返回 false / promise.resolve() 才会进行倒数
* }
* */

import React, { useState } from 'react';
import { Button } from 'antd';
import countdown from '../../tools/countdown';
import isPromise from '../../tools/isPromise';
import '../index.less';

export default (props) => {
  const {
    language,
    onBefore = () => {},
  } = props;
  const [disabled, setDisabled] = useState(false);
  const [count, setCount] = useState(59);

  const onSend = () => {
    const go = () => {
      setDisabled(true);
      countdown({
        callback: (nowCount, defaultCount) => {
          setCount(nowCount);
          if (nowCount === 0) {
            setCount(defaultCount);
            setDisabled(false);
          }
        },
      });
    };
    const res = onBefore();

    if (res === false) {
      go();
    } else if (isPromise(res)) {
      res.then(() => {
        go();
      })
    }
  };

  return (
    <Button
      size="large"
      onClick={onSend}
      disabled={disabled}
      className="ry_common_width_100"
    >{disabled ? `${count}${language.code_send_tip}` : language.code_send_text}
    </Button>
  );
}
