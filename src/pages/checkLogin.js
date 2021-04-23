import {Component} from 'react';
import Server from '../config/server';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class CheckLogin extends Component {
    componentDidMount() {
        const token = localStorage.getItem('jwtToken');
        if(!!token){
            const { baseUrl } = Server;
            const instance = axios.create({
                baseURL:baseUrl,
                timeout: 1000,
                headers: {'Authorization': token}
            });
            instance.post('/checkLogin').then((res)=>{
                console.log(res.data);
                if(res.data.status === 0){
                    this.props.history.push('/admin')
                }else{
                    this.props.history.push('/login')
                }
            })
        }else{
            console.log('无token');
            this.props.history.push('/login')
        }
    }

    render() {
        return null;
    }
}

export default withRouter(CheckLogin);