function sendRequest(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(xhr.status);
            }
        };
        xhr.onerror = () => {
            reject('Network error.');
        };
        xhr.send();
    });
}

sendRequest('https://api.shserve.cn/api/jinip?type=json')
    .then((responseText) => {
        const response = JSON.parse(responseText);
        const ip = response.ip;
        console.log(ip);
        document.getElementById('ip').innerText = ip;
        return sendRequest(`https://zj.v.api.aa1.cn/api/chinaip/?ip=${ip}`);
    })
    .then((responseText) => {
        try {
            const data = JSON.parse(responseText.replace(/"/g, '\"')).data;
            console.log(data);
            // 城市
            const Country = data.Country;
            const Province = data.Province;
            const City= data.City;
             // 东经西经
            const Latitude= data.Latitude;
            const Longitude= data.Longitude;
            const isp_ip= data.isp;
            console.log(Longitude);
            
            document.getElementById('City').innerText = `${Country} ${Province}省${City}市`;
            document.getElementById('Latitude').innerText = Latitude;
            document.getElementById('Longitude').innerText = Longitude;
            document.getElementById('isp_ip').innerText = isp_ip;
        
           
           
            // 其他相关数据
            // const = data. ;
            // const = data. ;
            // const = data.
            // const = data.
            // const = data.
        } catch (error) {
            console.error(error);
        }
    })
    .catch((error) => {
        console.error(error);
    });
