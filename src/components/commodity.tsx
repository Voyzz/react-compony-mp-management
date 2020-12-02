import React from 'react';

interface Props {}
const Component: React.FC<Props> = ({children}) => {
  return (
    <view>
      <text>商品页！</text>
    </view>
  )
}

export default React.memo(Component);