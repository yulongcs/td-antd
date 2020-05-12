import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { stringify } from 'qs';
import { Table } from 'antd';
import { SearchForm, pagination } from '../index';
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
  } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [keywords, setKeywords] = useState(defaultParams);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = (obj = {}, reset = false) => {
    const params = reset ? {...obj, ...defaultParams} : {...keywords, ...obj };
    const { request } = localConfig.newInstance();

    if (request) {
      setLoading(true);
      request({
        url: `${url}?${stringify(params)}`,
        onSuccess:(res) => {
          setData(Array.isArray(res.dataObject) ? { values: res.dataObject } : res.dataObject);
          setKeywords(params);
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
        pagination={pagination(data, {
          onChange: (pageNum) => {
            fetchList({pageNum});
          },
        })}
        {...tableProps}
      />
    </React.Fragment>
  );
})