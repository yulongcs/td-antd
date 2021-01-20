import React, { useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import TdUpload from '../td-upload';

const type = 'DragableUploadList';

const DragableListItem = ({ originNode, moveRow, file, fileList }) => {
  const ref = React.useRef();
  const index = fileList.indexOf(file);
  const [, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
      };
    },
    drop: item => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return (
    <div
      ref={ref}
      style={{ cursor: 'move', height: '100%', width: '100%' }}
    >
      {originNode}
    </div>
  );
};

export default forwardRef((props, ref) => {
  const uploadRef = useRef();

  // 提供给外部的接口
  useImperativeHandle(ref, () => ({...uploadRef.current}));

  return (
    <DndProvider backend={HTML5Backend}>
      <TdUpload
        {...props}
        ref={uploadRef}
        itemRender={(originNode, file, currFileList) => (
          <DragableListItem
            file={file}
            originNode={originNode}
            fileList={currFileList}
            moveRow={useCallback((dragIndex, hoverIndex) => {
              const { fileList } = uploadRef.current.state;

              const dragRow = fileList[dragIndex];
              uploadRef.current.setState({
                fileList: update(fileList, {
                  $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragRow],
                  ],
                }),
              });
            }, [uploadRef?.current?.state?.fileList])}
          />
        )}
      />
    </DndProvider>
  );
})
