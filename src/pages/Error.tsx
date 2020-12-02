import React from 'react';

interface Props {}
const Component: React.FC<Props> = ({children}) => {
  return (
    <view>
      <text>Error</text>
    </view>
  )
}

export default React.memo(Component);