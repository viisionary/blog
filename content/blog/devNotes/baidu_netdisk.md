---
title: 百度网盘 开放API 上传 & 下载

date: 2022-06-28

tags: ["工具"]

categories : ["工具"]

---

百度网盘 开放API 上传 & 下载 功能。

未做分片 仅支持 4M 以下小文件，文件可直接下载。

需要百度账号，接入网盘功能

取得 appid & appkey

<!--more-->

## 获取 access_token

```js

const axios = {}

const startCheck = async (device_code) => {
    let num = 0
    let check = setInterval(async () => {
        const {
            data: {
                access_token,
                expires_in
            }
        } = await axios.get(`/oauth/2.0/token?grant_type=device_token&code=${device_code}&client_id=YutwMOQLwfebbbCYPDsMUrg0LprvRlQw&client_secret=zdDEIDy9OdLaI2ymeovh21wEGBnKefDU`)
        num++;
        if (access_token || num > 10) {
            if (access_token) {
                message.success('链接成功')
                // setToken(access_token)
                // setQrcode_url('')
            }
            console.log(access_token, expires_in / 60 + 'min后过期')

            clearInterval(check)
        }
    }, 6000)
}

const getToken = async () => {
    const appid = 'YutwMOQLwfebbbCYPDsMUrg0LprvRlQpp';
    const res = await axios.get(`/oauth/2.0/device/code?response_type=device_code&client_id=${appid}&scope=basic,netdisk`)
    const {
        qrcode_url,
        verification_url,
        device_code,
        user_code
    } = res.data;

    // 展示二维码 或者使用 verification_url & user_code 进行用户授权
    //       setQrcode_url(qrcode_url);
    // 开始轮询，检查二维码扫描结果
    startCheck(device_code)
}

```

## 上传 & 下载

1. 预上传
2. 上传文件
3. 完成上传
4. 获取下载地址

```js
const token = 'access_token'
const upload = async (file) => {
    //http://pan.baidu.com
    // const token = "126.6f9b3155cebb94f2f47c29f426d5d857.YlqeTKGIexdcBB-TTtYMRs1jMh5O466uSrSo1yY.jF1sZw"
    const url = `/api/rest/2.0/xpan/file?access_token=${token}&method=precreate`
    const size = file.size;
    const filename = file.name;
    const path = `/apps/file-server/${filename}`;
    const md5 = 'hello'
    const request = new Request(url, {
        method: 'POST',
        body: `path=${path}&size=${size}&isdir=0&autoinit=1&rtype=3&block_list=["${md5}"]&content-md5=${md5}`
    });

    // 开始预上传
    fetch(request).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Something went wrong on API server!');
        }
    })
        .then(response => {
            const uploadid = response.uploadid;
            var myHeaders = new Headers();

            myHeaders.append('Content-Type', 'multipart/form-data');

            const formData = new FormData();
            formData.append('file', file);

            const url_upload = `/file/rest/2.0/pcs/superfile2?method=upload&access_token=${token}&path=${path}&type=tmpfile&uploadid=${uploadid}&partseq=0`
            
            const request2 = new Request(url_upload, {
                method: 'POST',
                body: formData
            });

            // 上传文件

            fetch(request2).then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong on API server!');
                }

            }).then(res2 => {
                console.log(res2)

                const url3 = `/api/rest/2.0/xpan/file?access_token=${token}&method=create`

                const req3 = new Request(url3, {
                    method: 'POST',
                    body: `path=${path}&size=${size}&isdir=0&autoinit=1&rtype=3&block_list=["${res2.md5}"]&content-md5=${md5}`
                });

                // 完成上传
                fetch(req3).then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error('Something went wrong on API server!');
                    }

                }).then(res3 => {

                    const req4 = new Request(`/api/rest/2.0/xpan/multimedia?method=filemetas&access_token=${token}&fsids=[${res3.fs_id}]&dlink=1`, {
                        method: 'GET',
                    });
                    
                    // 获取下载地址
                    fetch(req4).then(response => {
                        if (response.status === 200) {
                            return response.json();
                        } else {
                            throw new Error('Something went wrong on API server!');
                        }
                    }).then((res4) => {

                        // res4.list[0].dlink 为下载地址
                    })
                    message.success('上传成功')
                    console.log(res3)
                })
            })
        }).catch(error => {
        console.error(error);
    });

}

```