import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { stringify } from 'qs';
import { Table, Divider, Alert } from 'antd';
import SearchForm from '../search-form';
import pagination from '../pagination';
import localConfig from '../local-config';
import './index.less';

export default forwardRef((props, ref) => {
  const searchRef = useRef();
  const {
    url,
    extra,
    success,
    alert = 0,
    alertNodes,
    searchReturn,
    line = true,
    columns = [],
    tableProps = {},
    searchFormProps,
    defaultParams = {},
    pageNumField = 'pageNum',
    pageSizeField = 'pageSize',
    paginationProps = {},
    requestOptions = {},
    isDefaultRequest = true,
  } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [keywords, setKeywords] = useState(defaultParams);
  const { request } = localConfig.newInstance();

  useEffect(() => {
    if (isDefaultRequest) {
      query({}, true);
    }
  }, [request, url]);

  const query = (obj = {}, reset = false) => {
    const params = reset ? {...defaultParams, ...obj} : {...keywords, ...obj };

    if (request && url && !url.includes('undefined')) {
      setLoading(true);
      let requestApi = {
        url: `${url}?${stringify(params)}`,
      };
      // 如果是 post 请求，则重新组装入参
      if (requestOptions.method === 'POST') {
        requestApi = {
          url,
          body: params,
        };
      }
      request({
        ...requestApi,
        ...requestOptions,
        onSuccess:({ dataObject }) => {
          setKeywords(params);
          const returnData = success ? success(dataObject, params) : dataObject;

          setData(Array.isArray(returnData) ? { values: returnData } : returnData);
        },
      }).finally(() => {
        setLoading(false);
      });
    }
  };

  /*
  * 过滤出需要做搜索栏用的字段
  * 权重：searchFormProps.columns > columns
  * */
  const filterSearchFormColumns = () => {
    if (searchFormProps && searchFormProps.columns) {
      return searchFormProps.columns;
    }

    return columns.filter(i => i.enableSearch).sort((a, b) => a.order - b.order);
  };

  /*
  * Table 的列项，如果 visible = false，则不渲染
  * */
  const filterTableColumns = columns.filter(({ visible = true }) => visible);

  // 提供给外部的接口
  useImperativeHandle(ref, () => ({
    searchFormRef: searchRef.current && searchRef.current.form,
    query,
  }));

  return (
    <React.Fragment>
      <SearchForm
        ref={searchRef}
        {...searchFormProps}
        columns={filterSearchFormColumns()}
        callback={(type, values = {}) => {
          if (type === 'query') {
            query((searchReturn ? searchReturn(values) : values), true);
          } else if (type === 'reset') {
            query({}, true);
          }
        }}
      />
      {line && <Divider style={{ margin: '0 0 16px 0', clear: 'both' }} />}
      {extra && <div style={{ paddingBottom: 16, display: 'flex', justifyContent: 'space-between' }}>{extra}</div>}
      {alert > 0 && (
        <Alert
          message={
            <div className="td-table-alert">
              <div>已选择 {alert} 项</div>
              {alertNodes}
            </div>
          }
          style={{ marginBottom: 16 }}
        />
      )}
      <Table
        bordered
        loading={loading}
        columns={filterTableColumns}
        dataSource={data.values || []}
        pagination={(data.pageSize || data.limit) ? pagination({
          data,
          onChange: (pageNum, pageSize) => {
            query({ [pageNumField]: pageNum, [pageSizeField]: pageSize });
          },
          ...paginationProps,
        }) : false}
        {...tableProps}
      />
    </React.Fragment>
  );
})
