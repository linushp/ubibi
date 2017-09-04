
import './uploader.less';
import {t1} from './uploader.shtml';


Vue.component('bs-upload-button',{
    props:['className'],
    template:t1,
    methods:{

        changeFile:function(e){

            var that = this;

            var file = e.target.files[0];
            var storeAs = 'upload/mmm'+new Date().getTime() + ".png";

            OSS.urllib.request(location.origin + "/api/v1/oss-token/upload-token",
                {method: 'GET'},
                function (err, response) {
                    if (err) {
                        return alert(err);
                    }
                    var result ;
                    try {
                        result = JSON.parse(response);
                    } catch (e) {
                        return alert('parse sts response info error: ' + e.message);
                    }
                    var client = new OSS.Wrapper({
                        accessKeyId: result.AccessKeyId,
                        accessKeySecret: result.AccessKeySecret,
                        //stsToken: result.SecurityToken,
                        endpoint: result.endpoint,
                        bucket: result.bucket
                    });
                    client.multipartUpload(storeAs, file).then(function (uploadResult) {
                        that.$emit("uploaded", {
                            file:file,
                            result: uploadResult,
                            url:result.url_prefix + storeAs
                        });
                    }).catch(function (err) {
                        console.log(err);
                    });
                });

        }
    }
});