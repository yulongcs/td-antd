import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Select, Spin } from 'antd';
import { SelectProps, SelectValue } from 'antd/es/select';
import { stringify } from 'qs';
import useDebounce from '../tools/useDebounce';
import localConfig from '../local-config';

interface IResponseType<DT = any> {
  success: boolean;
  dataObject: { values: DT[], totalCnt: number } | DT[];
  errorMessage?: string;
}

interface IPropTypes<DT> extends SelectProps<SelectValue> {
  url: string;
  method?: 'GET' | 'POST';
  pageSize?: number;
  fields?: [string, string];
  searchField: string;
  defaultData?: DT[];
  defaultParams?: Record<string, any>;
}

const { Option } = Select;

function SelectList<DataType extends Record<string, string> | string>(
  props: IPropTypes<DataType>,
  ref: React.Ref<any>
) {
  const {
    url,
    method = 'GET',
    pageSize = 50,
    fields,
    value,
    searchField,
    defaultData = [],
    defaultParams,
    ...restProps
  } = props;
  const { request } = localConfig.newInstance();
  const [data, setData] = useState<DataType[]>(defaultData);
  const [more, setMore] = useState<boolean>(true);
  const [params, setParams] = useState<Record<string, any>>(pageSize ? { pageNum: 1, pageSize } : null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!defaultData.length) {
      fetchList();
    }
  }, [])

  useImperativeHandle(ref, () => ({
    fetchList,
  }))

  const fetchList = (param = {}, action = 'initial') => {
    if (!url) {
      return;
    }
    let reqParams = {
      ...defaultParams,
      ...params,
      ...param,
    };
    if (action === 'loadmore') {
      reqParams = { ...reqParams, pageNum: params.pageNum + 1 }
    }
    let reqConfig = {};
    if (method === 'POST') {
      reqConfig = {
        url,
        method,
        body: reqParams,
      }
    }
    setLoading(true);
    request({
      url: `${url}?${stringify(reqParams)}`,
      ...reqConfig,
      onSuccess: ({ dataObject }: IResponseType<DataType>) => {
        const values = Array.isArray(dataObject) ? dataObject : dataObject.values;
        const totalCnt = Array.isArray(dataObject) ? dataObject.length : dataObject.totalCnt;
        const d = action === 'loadmore'
          ? data.concat(values)
          : values;
        setData(d);
        setMore(d.length < totalCnt);
        setParams(reqParams);
      },
    }).finally(() => {
      setLoading(false);
    });
  }

  // 搜索资源项
  const onSearch = useDebounce((v: string) => {
    setData([]);
    if (/\S+/.test(v)) {
      fetchList({ [searchField]: v.trim() });
    }
  }, 600)

  // 滚动加载更多资源
  const loadMore = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (!loading
      && more
      && el.scrollTop > el.scrollHeight - 300
    ) {
      fetchList({}, 'loadmore');
    }
  }

  return (
    <Select
      showSearch
      disabled={!url}
      filterOption={false}
      placeholder="支持搜索"
      value={value}
      onSearch={onSearch}
      onPopupScroll={loadMore}
      autoClearSearchValue={false}
      dropdownMatchSelectWidth={false}
      {...restProps}
    >
      {data.map(item => (fields ? (
        <Option
          key={(item as Record<string, string>)[fields[0]]}
          value={(item as Record<string, string>)[fields[0]]}
        >
          {(item as Record<string, string>)[fields[1]]}
        </Option>
      ) : <Option key={item as string} value={item as string}>{item}</Option>
      ))}
      {loading && <Option key="loading" value="loading" disabled><Spin size="small" /></Option>}
    </Select>
  );
}

export default React.forwardRef(SelectList);