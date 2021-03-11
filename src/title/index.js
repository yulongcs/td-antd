import React from 'react';
import cx from 'classnames';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import './index.less';

export default ({ required = false, colon = true, name = '', tip, extra, className, ...rest }) => {
  return (
    <div className="td-title-wrap">
      <div
        className={cx('td-title-main', className, {
          'td-title-required': required,
          'td-title-colon': colon,
        })}
        {...rest}
      >
        {name}
        {tip && (
          <Tooltip title={tip}>
            <QuestionCircleOutlined className="td-title-tip" />
          </Tooltip>
        )}
      </div>
      {extra}
    </div>
  );
}
