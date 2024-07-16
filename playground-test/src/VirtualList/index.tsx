import {useState, useEffect, useRef} from 'react';

const getTestData = (length: number): string[] => {
  let dataList: string[] = [];
  for( let i = 0; i<length; i++) {
    dataList = [...dataList, `测试数据${Math.ceil(Math.random() * 10)}`];
  }
  return dataList;
}

const redundancy = 4;

const getRenderList: <T>(
  list: T[],
  renderLength: number,
  start?: number,
) => T[] = (list, renderLength, start = 0) => {
  return list.slice(start, start + renderLength);
}

export const VirtualList = () => {
  const [dataList, setDataList] = useState<string[]>([]);
  const [renderList, setRenderList] = useState<string[]>([]);
  const [offsetY, setOffsetY] = useState<number>(0);

  const renderLength = useRef<number>(0);
  const rowNodeheight = useRef<number>(0);

  const getRenderLength = (): number => {
    const containerNode: HTMLDivElement | null = document.querySelector('.virtual_scroll_container');
    const rowNode: HTMLDivElement | null = document.querySelector('.virtual_scroll_row');
    if(containerNode && rowNode) {
      rowNodeheight.current = rowNode.clientHeight;
      return (
        Math.ceil(containerNode.clientHeight / rowNodeheight.current) + redundancy
      )
    }
    return 0;
  }

  const handleTableScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    const scrollTop: number = (e.target as HTMLDivElement).scrollTop;
    const offSetY: number = scrollTop;
    const offsetItemNumber: number = Math.floor(scrollTop / rowNodeheight.current);
    const renderList = getRenderList(dataList, renderLength.current, offsetItemNumber);

    setOffsetY(offSetY);
    setRenderList(renderList);
  };

  useEffect(() => {
    setDataList(getTestData(100));
  }, [])

  useEffect(() => {
    setRenderList(dataList.slice(0, 1))
  }, [dataList])

  useEffect(() => {
    if(renderList.length === 1 && renderList.length !== dataList.length) {
      renderLength.current = getRenderLength();
      setRenderList(getRenderList(dataList, renderLength.current))
    }
  }, [renderList])

  return (
    <div
      className="virtual_scroll_container"
      onScroll={(e) => handleTableScroll(e)}
      style={{width: '100%', height: '400px', overflowY: 'scroll'}}
    >
      <div
        className="virtual_scroll"
        style={{transform: `translateY(${offsetY}px)`}}
      >
        {
          renderList.map((item: string, index: number) => (
            <div
              className='virtual_scroll_row'
              key={"virtual_scroll_row" + index}
              style={{height: '20px'}}
            >
              {item}
            </div>
          ))
        }
      </div>
    </div>
  )
}