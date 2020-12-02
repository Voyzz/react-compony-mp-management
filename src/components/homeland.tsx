import React from 'react';

interface Props {}
const Component: React.FC<Props> = ({children}) => {
  return (
    <view>
      <text>个人中心！</text>
    </view>
  )
}

export default React.memo(Component);