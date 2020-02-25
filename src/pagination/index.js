import React from 'react';

export default (data, props = {}) => ({
  hideOnSinglePage: true,
  current: data.pageNum || data.currPageNo || 1,
  pageSize: data.pageSize || data.limit || 20,
  total: data.totalCnt || data.total || 1,
  showTotal: (total) => <span>共查询到 <span style={{ color: '#f0882d' }}>{total}</span> 条数据</span>,
  ...props,
});