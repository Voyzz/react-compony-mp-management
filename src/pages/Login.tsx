import React from 'react';

interface Props {}
const Component: React.FC<Props> = ({children}) => {
  return (
    <div>
      <div>登录</div>
    </div>
  )
}

export default React.memo(Component);