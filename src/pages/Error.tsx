import React from 'react';

interface Props {}
const Component: React.FC<Props> = ({children}) => {
  return (
    <div>
      <div>Error</div>
    </div>
  )
}

export default React.memo(Component);