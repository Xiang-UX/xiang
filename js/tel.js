//  手机号查归属地
// 搭配这个使用
/*    <input id="phoneNumber" type="text">
    <button onclick="queryPhoneNumber()">查询</button>
    <div><span id="phone"></span></div>
    <div><span id="prefix"></span></div>
    <div><span id="location"></span></div>
    <div><span id="isp"></span></div>
    <div><span id="areaCode"></span></div>
    <div><span id="descrip"></span></div>
    <div><span id="id"></span></div>
 */

 function queryPhoneNumber() {
            const phoneNumber = document.getElementById("phoneNumber").value;
            document.getElementById('phone').innerHTML =phoneNumber;
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "https://zj.v.api.aa1.cn/api/phone-03gs/?tel="+ phoneNumber);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    const data = response.data;
                    console.log(response);
                    console.log(data);

                    //号段
                    const prefix = data.prefix;
                    document.getElementById('prefix').innerText =prefix;
                    //省份城市
                    //省
                    const provice = data.provice_simple;
                    //市
                    const city = data.city_county_simple;
                    document.getElementById('location').innerText = provice + '省' + ' ' + city + '市';
                    //运营商
                    const isp = data.isp;
                    document.getElementById('isp').innerText =isp;
                    //区号
                    const description = data.zone_description
                    document.getElementById('descrip').innerText = description;
                    //邮编
                    const area = data.area_code;
                    document.getElementById('areaCode').innerText =area;
                } else {
                    console.error("Request failed. Status:", xhr.status);
                }
            };

            xhr.onerror = function () {
                console.error("Network error.");
            };

            xhr.send();
        }