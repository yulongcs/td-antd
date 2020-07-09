import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { stringify } from 'qs';
import { Table } from 'antd';
import SearchForm from '../search-form';
import pagination from '../pagination';
import localConfig from '../local-config';

export default forwardRef((props, ref) => {
  const searchRef = useRef();
  const {
    url = '',
    tableProps = {},
    columns = [],
    searchChildren,
    searchFormProps = {},
    searchReturn,
    defaultParams = {},
    success,
  } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [keywords, setKeywords] = useState(defaultParams);
  const { request } = localConfig.newInstance();

  useEffect(() => {
    fetchList();
  }, [request]);

  const fetchList = (obj = {}, reset = false) => {
    const params = reset ? {...obj, ...defaultParams} : {...keywords, ...obj };

    if (request) {
      setLoading(true);
      request({
        url: `${url}?${stringify(params)}`,
        onSuccess:({ dataObject }) => {
          const resObj = Array.isArray(dataObject) ? { values: dataObject } : dataObject;
          setData(resObj);
          setKeywords(params);
          // eslint-disable-next-line
          success && success(resObj);
        },
      }).finally(() => {
        setLoading(false);
      });
    }
  };

  // 提供给外部的接口
  useImperativeHandle(ref, () => ({
    searchFormRef: searchRef.current && searchRef.current.form,
    fetchList,
  }));

  return (
    <React.Fragment>
      {searchChildren && (
        <SearchForm
          wrappedComponentRef={searchRef}
          {...searchFormProps}
          callback={(values = {}) => {
            fetchList((searchReturn ? searchReturn(values) : values), true);
          }}
        >
          {(formProps) => searchChildren(formProps)}
        </SearchForm>
      )}
      <Table
        bordered
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={data.values || []}
        pagination={(data.pageSize || data.limit) ? pagination({
          data,
          onChange: (pageNum) => {
            fetchList({pageNum});
          },
        }) : false}
        {...tableProps}
      />
    </React.Fragment>
  );
})