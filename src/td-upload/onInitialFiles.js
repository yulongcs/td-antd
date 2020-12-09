/*
* 数据初始化函数
* */
import localConfig from '../local-config';

const onInitialFiles = (files = [], filterOptions) => {
  try {
    const { proxy = '' } = localConfig.newInstance();
    return files.map((item, index) => {
      if (filterOptions) {
        return filterOptions(item, index);
      }

      return {
        ...item,
        uid: item.fileNo || index,
        name: item.fileName || item.name,
        url: `${proxy}/file/download.json?filePath=${item.filePath}`,
      };
    });
  } catch (e) {
    throw new Error(e);
  }
};

export default onInitialFiles;
