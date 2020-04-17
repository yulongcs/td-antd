import * as React from 'react';
import _get from 'lodash/get';
import { Descriptions } from 'antd';

export default class DescList extends React.Component {
  static defaultProps = {
    dataSource: {},
    size: 'small',
    column: 4,
    columns: [],
    defaultValue: '--',
  };

  // 需要进行 react 组件的判断
  renderValue = (value) => {
    if (React.isValidElement(value)) {
      return value;
    } else {
      if (value && value !== null && value !== '') {
        return value;
      }

      return this.props.defaultValue;
    }
  };

  // 子项的渲染
  renderItem = () => {
    const { dataSource, columns, defaultValue } = this.props;

    return columns.map((item, index) => {
      const { title, dataIndex, render, visible = true, span = 1 } = item;

      if (visible) {
        const value = render ? render(dataSource) : _get(dataSource, dataIndex, defaultValue);

        return (
          // eslint-disable-next-line
          <Descriptions.Item label={title} key={index} span={span}>
            {this.renderValue(value)}
          </Descriptions.Item>
        )
      }

      return null;
    })
  };

  render() {
    return (
      <Descriptions {...this.props}>
        {this.renderItem()}
      </Descriptions>
    );
  }
}
