import hmacsha1 from 'hmacsha1';
import md5 from 'md5';
import serverInfo from '../config/uploadServer'

const getSignature = (fileName='none') => {
    const date = new Date().toGMTString();
    const { bucket,operator,password,filePath } = serverInfo;

    const signature = `PUT&/${bucket}${filePath}${fileName}&${date}`;
    const md5_signature = md5(signature);
    const hash = hmacsha1(md5_signature,signature);
    const base64_signature = new Buffer(hash).toString('base64');

    return base64_signature;
}

export { getSignature,serverInfo };