import {Component} from 'react';
import api from '../api/index'
import {withRouter} from 'react-router-dom'

class CheckLogin extends Component {
    componentDidMount() {
        const req = {
            userName:'zfds2021',
            userKey:'zfds2021'
        }
        api.CheckLogin(req).then((res)=>{
            console.log(res);
            if(res.status === 0){
                this.props.history.push('/admin')
            }else{
                this.props.history.push('/login')
            }
        })
         // 在这里请求相关接口判断用户是否完成登录
        // axios.get('xxxxx')
        //     .then(res => {
        //         if(res.status === 200) {
        //             if(res.data.code === 0) {

        //             }else {
        //                 this.props.history.push('/login')
        //             }
        //         }
        //     })
    }

    render() {
        return null;
    }
}

export default withRouter(CheckLogin);