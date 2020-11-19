// import React,{ useEffect } from 'react';
// import './hompage.css';
// import { Button } from 'antd';

// export default function Homepage(params:any) {
//     useEffect(() => {
        
//     }, [])

//     return (
//         <div>
//             <Button type="primary">Button</Button>
//         </div>
//     )
// }

import React from 'react';

import {Button} from 'antd';

interface Props {}
const Component: React.FC<Props> = ({children}) => {

  return (
    <Button type="primary">Button</Button>
  );
};

export default React.memo(Component);