import React, { CSSProperties, ReactNode, useContext } from "react";
import cs from 'classnames';
import './index.scss';
import { ConfigContext } from './ConfigProvider';

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: CSSProperties;
  size?: SizeType | [SizeType, SizeType];
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline';
  split?: ReactNode;
  wrap?: boolean;
}

export type SizeType = 'small' | 'middle' | 'large' | number | undefined;

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
}

function getNumberSize(size: SizeType) {
  return typeof size === 'string' ? spaceSize[size] : size || 0;
}

const Space: React.FC<SpaceProps> = (props) => {
  const { space } = useContext(ConfigContext);

  const {
    className,
    style,
    children,
    size = space?.size || "small",
    direction = "horizontal",
    align,
    split,
    wrap = false,
    ...rest
  } = props;

  const childNodes = React.Children.toArray(children);

  const mergedAlign = direction === 'horizontal' && align === undefined ? 'center' : align;
  const cn = cs('space', `space-${direction}`, {
    [`space-align-${mergedAlign}`]: mergedAlign,
  }, className)

  const nodes = childNodes.map((child: any, i) => {
    const key = child && child.key || `space-item-${i}`;
    return <>
      <div className="space-item" key={key}>
        {child}
      </div>
      {
        i < childNodes.length - 1 && split && (
          <span className={`${className}-split`} style={style}>
            {split}
          </span>
        )
      }
    </>
  })

  const otherStyles: CSSProperties = {};
  const [horizontalSize, verticalSize] = React.useMemo(
    () =>
      ((Array.isArray(size) ? size : [size, size]) as [SizeType, SizeType]).map(item =>
        getNumberSize(item),
      ),
    [size]
  )
  otherStyles.columnGap = horizontalSize;
  otherStyles.rowGap = verticalSize;

  if (wrap) {
    otherStyles.flexWrap = 'wrap';
  }

  return <div className={cn} style={{ ...otherStyles, ...style }} {...rest}>
    {nodes}
  </div>
}

export default Space;