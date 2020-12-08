import React from 'react';

interface Props {}
const Component: React.FC<Props> = ({children}) => {
  return (
    <div>个人中心！</div>
  )
}

export default React.memo(Component);