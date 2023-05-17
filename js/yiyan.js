        // 每日一言
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.btstu.cn/yan/api.php?charset=utf-8&encode=json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const yiyan_text =response.text
                console.log(yiyan_text);
                document.getElementById('yiyan_text').innerText=yiyan_text;
            } else {
                console.error("Request failed. Status:", xhr.status);
            }
        };
        xhr.onerror = function () {
            console.error("Network error.");
        };
        xhr.send();
