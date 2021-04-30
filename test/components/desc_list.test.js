import React from 'react';
import Enzyme from '../setup';
import { act } from 'react-dom/test-utils';
import DescList from '../../src/desc-list';

const { mount } = Enzyme;

describe('DescList', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('是否正常渲染', () => {
    const columns = [{ title: '姓名', dataIndex: 'name' }, { title: '年龄', dataIndex: 'age' }];
    const dataSource = { name: 'andy', age: '18' };
    const wrapper = mount(<DescList columns={columns} dataSource={dataSource} />);

    act(() => {
      jest.runAllTimers();
      wrapper.update();
    });

    const items = wrapper.find('.ant-descriptions-item');
    // 测试是否渲染了两个 item。
    expect(items.length).toBe(2);

    // 测试值是否正确
    items.forEach((item, index) => {
      const label = item.find('.ant-descriptions-item-label').at(0).text();
      const value = item.find('.ant-descriptions-item-content').at(0).text();
      expect(label).toBe(columns[index].title);
      expect(value).toBe(dataSource[columns[index].dataIndex]);
    });
  });
});
