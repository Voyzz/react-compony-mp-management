import COS from 'cos-js-sdk-v5';
import cosServerInfo from '../config/cosServer';

const { bucket,SecretId,SecretKey,region } = cosServerInfo;

const cos = new COS({ SecretId,SecretKey });

const uploadFile = (file,fileName,callback) => {

    cos.putObject({
        Bucket: bucket, /* 必须 */
        Region: region,     /* 存储桶所在地域，必须字段 */
        Key: fileName,              /* 必须 */
        StorageClass: 'STANDARD',
        Body: file, // 上传文件对象
        onProgress: (progressData) => {
            const responsData = JSON.stringify(progressData);
            console.log(responsData);
        }
    }, function(err, data) {
        console.log(err || data);
        callback(err || data);
    });
}

export { uploadFile };