import * as React from 'react';
import cx from 'classnames';
import { Spin } from 'antd';
import './index.less';
const LinkBtn = (props) => {
    const { disabled = false, loading = false, danger = false, className, ...rest } = props;
    return (React.createElement("button", { ...rest, type: "button", disabled: disabled || loading, className: cx('td-link-btn', className, {
            'td-link-loading': loading,
            'td-link-danger': danger,
        }) }, loading ? React.createElement(Spin, { size: "small" }) : props.children));
};
export default LinkBtn;
//# sourceMappingURL=index.js.map