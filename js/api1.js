
        const xhr = new XMLHttpRequest();
        //api地址
        xhr.open("GET", "https://api.btstu.cn/yan/api.php?charset=utf-8&encode=json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response);
            } else {
                console.error("Request failed. Status:", xhr.status);
            }
        };
        xhr.onerror = function () {
            console.error("Network error.");
        };
        xhr.send();