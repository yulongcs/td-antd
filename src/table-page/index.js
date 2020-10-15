import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { stringify } from 'qs';
import { Table, Divider } from 'antd';
import SearchForm from '../search-form';
import pagination from '../pagination';
import localConfig from '../local-config';

export default forwardRef((props, ref) => {
  const searchRef = useRef();
  const {
    url,
    extra,
    success,
    searchReturn,
    method = 'GET',
    columns = [],
    tableProps = {},
    defaultParams = {},
    searchFormProps = {},
  } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [keywords, setKeywords] = useState(defaultParams);
  const { request } = localConfig.newInstance();

  useEffect(() => {
    query();
  }, [request]);

  const query = (obj = {}, reset = false) => {
    const params = reset ? {...obj, ...defaultParams} : {...keywords, ...obj };

    if (request && url) {
      setLoading(true);
      let requestApi = {
        method,
        url: `${url}?${stringify(params)}`,
      };
      if (method === 'POST') {
        requestApi = {
          ...requestApi,
          url,
          body: params,
        };
      }
      request({
        ...requestApi,
        onSuccess:({ dataObject }) => {
          if (success) {
            // 当回调函数 success 存在时，必须返回用于渲染的数据
            setData(success(dataObject));
          } else {
            const resObj = Array.isArray(dataObject) ? { values: dataObject } : dataObject;
            setData(resObj);
          }
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
    query,
  }));

  return (
    <React.Fragment>
      {searchFormProps.children && (
        <React.Fragment>
          <SearchForm
            wrappedComponentRef={searchRef}
            {...searchFormProps}
            callback={(type, values = {}) => {
              if (type === 'query') {
                query((searchReturn ? searchReturn(values) : values), true);
              }
              if (type === 'reset') {
                query({}, true);
              }
            }}
          />
          <Divider style={{ margin: '20px 0' }} />
        </React.Fragment>
      )}
      {extra && (
        <div style={{ paddingBottom: 20 }}>{extra}</div>
      )}
      <Table
        bordered
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={data.values || []}
        pagination={(data.pageSize || data.limit) ? pagination({
          data,
          onChange: (pageNum, pageSize) => {
            query({pageNum, pageSize});
          },
        }) : false}
        {...tableProps}
      />
    </React.Fragment>
  );
})
