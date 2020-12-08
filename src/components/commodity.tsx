import React from 'react';

interface Props {}
const Component: React.FC<Props> = ({children}) => {
  return (
    <div>商品页！</div>
  )
}

export default React.memo(Component);