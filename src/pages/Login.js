import '../scss/pages/Login.scss';

import React,{Component} from 'react';

import api from '../api/index'
import { message } from 'antd';
import {withRouter} from 'react-router-dom';

class Login extends Component {

  submit(){
    const _this = this;
    const userName = document.getElementById('userName').value;
    const userKey = document.getElementById('userKey').value;

    api.CheckLogin({userName,userKey}).then((res)=>{
        if(res.status === 0){
            const { token:jwtToken } = res.data;
            if(!!jwtToken) {
              localStorage.setItem('jwtToken',jwtToken)
            }
            message.success('登录成功');
            setTimeout(() => {
              _this.props.history.push('/admin')
            }, 50);
        }else{
            message.error('密码错误');
        }
    })
  }

  render (){
    return <div className="login_container">
      <div className="loginBox">
        <input placeholder="用户名" className="input" id="userName"/>
        <input placeholder="密码" className="input" id="userKey"/>
        <div className="submitBtn" onClick={this.submit.bind(this)}><div>登录</div></div>
      </div>
    </div>
  }
}

export default withRouter(Login);