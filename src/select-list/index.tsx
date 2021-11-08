import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';
import { Select, Spin } from 'antd';
import { SelectProps, SelectValue } from 'antd/es/select';
import { stringify } from 'qs';
import typeOf from '../tools/typeOf';
import useDebounce from '../tools/useDebounce';
import localConfig from '../local-config';

interface ISelectListRef {
  fetchList(param, action): void;
}

interface IResponseType<DT> {
  success: boolean;
  dataObject: { values: DT[], totalCnt: number } | DT[];
  errorMessage?: string;
}

interface IPropTypes<DT = Record<string, string>> extends SelectProps<SelectValue> {
  url?: string;
  method?: 'GET' | 'POST';
  trigger?: 'onLoad' | 'onFocus';
  pageSize?: number;
  fields?: DT extends Record<string, string> ? [keyof DT, keyof DT] : [string, string];
  searchField?: string;
  localData?: unknown;
  defaultParams?: Record<string, any>;
  getOptions?: (d: DT[]) => DT[];
  filterOptionChildren?: (item: DT, index: number) => React.ReactChild;
}

const { Option } = Select;

function SelectList<DataType extends Record<string, string> | string> (
  {
    url = '',
    method = 'GET',
    trigger = 'onFocus',
    pageSize = 200,
    fields = ['key', 'value'],
    searchField = fields[1],
    localData = null,
    defaultParams = {},
    getOptions = (d) => d,
    onSelect: propOnSelect = null,
    onFocus: propOnFocus = null,
    filterOptionChildren = null,
    ...restProps
  },
  ref
) {
  const focusedOnce = useRef<boolean>(false);
  const { request } = localConfig.newInstance();
  const [data, setData] = useState<DataType[]>([]);
  const [more, setMore] = useState<boolean>(true);
  const [params, setParams] = useState<Record<string, any>>();
  const [searchValue, setSearchValue] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [allDataLoaded, setAllDataLoaded] = useState<boolean>(!url);

  useImperativeHandle(ref, () => ({
    fetchList,
  }));

  useEffect(() => {
    if (!url) {
      let localDataArr = [];
      if (typeOf(localData, 'Array')) {
        localDataArr = localData;
      }
      if (typeOf(localData, 'Object')) {
        localDataArr = Object.entries(localData).map(([key, value]) => (
          { [fields[0]]: key, [fields[1]]: value, }
        ));
      }
      setData(localDataArr);
    }
  }, [localData]);

  useEffect(() => {
    if (trigger === 'onLoad') {
      fetchList({}, 'reset');
    }
  }, []);

  const fetchList = (param = {}, action) => {
    if (!url) {
      return;
    }
    let reqParams = defaultParams;
    if (pageSize) {
      reqParams = { ...reqParams, pageNum: 1, pageSize }
    }
    if (action !== 'reset') {
      reqParams = { ...reqParams, ...params };
    }
    if (action === 'loadMore') {
      reqParams = { ...reqParams, pageNum: (reqParams as { pageNum: number }).pageNum + 1 };
    }
    reqParams = { ...reqParams, ...param };
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
        const d = action === 'loadMore' ? data.concat(values) : values;
        const m = d.length < totalCnt;
        setData(d);
        setMore(m);
        setParams(reqParams);
        setAllDataLoaded(!m && !reqParams[searchField]);
      },
    }).finally(() => {
      setLoading(false);
    });
  };

  // 首次获得焦点时请求数据
  const onFocus = (e) => {
    if (trigger === 'onFocus' && !focusedOnce.current) {
      focusedOnce.current = true;
      fetchList({}, 'reset');
    }
    if (propOnFocus) {
      propOnFocus(e);
    }
  };

  // 选中搜索结果项时，重置搜索文本和选项数据
  const onSelect = (selectValue, option) => {
    if (!allDataLoaded && searchValue) {
      setSearchValue(undefined);
      fetchList({}, 'reset');
    }
    if (propOnSelect) {
      propOnSelect(selectValue, option);
    }
  };

  // 搜索资源项
  const search = useDebounce(v => {
    if (v.length === 0 || /\S+/.test(v)) {
      setData([]);
      fetchList({ [searchField]: v.trim() }, 'reset');
    }
  }, 600);

  // 文本框值变化时回调
  const onSearch = (v) => {
    if (!allDataLoaded) {
      setSearchValue(v);
      search(v);
    }
  };

  // 滚动加载更多资源
  const loadMore = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (!loading
      && more
      && el.scrollTop > el.scrollHeight - 300
    ) {
      fetchList({}, 'loadMore');
    }
  };

  return (
    <Select
      showSearch
      filterOption={allDataLoaded}
      optionFilterProp="label"
      placeholder="支持搜索"
      onSelect={onSelect}
      onSearch={onSearch}
      onFocus={onFocus}
      searchValue={searchValue}
      onPopupScroll={loadMore}
      dropdownMatchSelectWidth={false}
      {...restProps}
    >
      {getOptions(data).map((item, index) => {
        if (['string', 'number'].includes(typeof item)) {
          return <Option key={item} value={item} label={item}>{item}</Option>;
        }
        if (item && typeof item === 'object' && fields[0] in item) {
          return (
            <Option
              {...item as Record<string, string>}
              key={item[fields[0]]}
              value={item[fields[0]]}
              label={item[fields[1]]}
            >
              {filterOptionChildren?.(item, index) || item[fields[1]]}
            </Option>
          );
        }
        return null;
      })}
      {loading && <Option key="loading" value="loading" disabled><Spin size="small" /></Option>}
    </Select>
  );
}

export default React.forwardRef<ISelectListRef, IPropTypes>(SelectList);
