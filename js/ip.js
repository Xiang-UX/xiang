function getIp() {
    return sendRequest('https://api.ipify.org/')
        .then((response) => {
            return response.trim();
        });
}

function getLocation(ip) {
    return sendRequest(`https://zj.v.api.aa1.cn/api/chinaip/?ip=${ip}`)
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
                // console.log(Longitude);
                
                document.getElementById('City').innerText = `${Country} ${Province}省${City}市`;
                document.getElementById('Latitude').innerText = Latitude;
                document.getElementById('Longitude').innerText = Longitude;
                document.getElementById('isp_ip').innerText = isp_ip;
            
            } catch (error) {
                console.error(error);
            }
        });
}

getIp()
    .then((ip) => {
        console.log(ip);
        document.getElementById('ip').innerText = ip;
        return getLocation(ip);
    })
    .catch((error) => {
        console.error(error);
    });

function sendRequest(url) {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Fetch error: ${response.status}`)
            }
            return response.text();
        });
}
