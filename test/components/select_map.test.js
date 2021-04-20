import React from 'react';
import Enzyme from '../setup';
import { act } from 'react-dom/test-utils';
import SelectMap from '../../src/select-map';

const { mount } = Enzyme;

describe('SelectMap', () => {
  function toggleOpen(wrapper) {
    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      jest.runAllTimers();
      wrapper.update();
    });
  }

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('有默认的 notFoundContent', () => {
    const wrapper = mount(<SelectMap mode="multiple" />);
    toggleOpen(wrapper);
    expect(wrapper.find('.ant-select-item-option').length).toBeFalsy();
    expect(wrapper.find('.ant-empty').length).toBeTruthy();
  });

  it('支持将 notFoundContent 设置为 null', () => {
    const wrapper = mount(<SelectMap mode="multiple" notFoundContent={null} />);
    toggleOpen(wrapper);
    const dropdownWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(dropdownWrapper.find('MenuItem').length).toBe(0);
  });
});
