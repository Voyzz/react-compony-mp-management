import '@/scss/components/introduction.scss'

import React from 'react';

interface Props {}
const Component: React.FC<Props> = ({children}) => {
  return (
    <div>
      <div>公司简介！</div>
    </div>
  )
}

export default React.memo(Component);