  // 获取元素
        const form = document.querySelector(".input-container");
        const input = form.querySelector("input[type='text']");
        const messages = document.querySelector(".messages");

        // 监听表单提交事件
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            // 获取用户输入的消息
            const message = input.value.trim();
            if (!message) {
                return;
            }

            // 创建并添加用户消息到聊天记录
            const userMessage = createUserMessage(message);
            messages.appendChild(userMessage);

            // 获取机器人回复
            const answer = await getAnswer(message);

            // 创建并添加机器人消息到聊天记录
            const chatbotMessage = createChatbotMessage(answer);
            messages.appendChild(chatbotMessage);

            // 自动滚动到底部
            messages.scrollTop = messages.scrollHeight;

            // 重置输入框
            input.value = '';
            input.focus();
        });

        // 创建用户消息并返回创建的 DOM 元素
        function createUserMessage(message) {
            const userMessage = document.createElement("div");
            userMessage.classList.add("message", "user-message");
            const userText = document.createElement("p");
            userText.textContent = message;
            userMessage.appendChild(userText);
            return userMessage;
        }

        // 创建聊天消息并返回创建的 DOM 元素
        function createChatbotMessage(reply) {
            const chatbotMessage = document.createElement("div");
            chatbotMessage.classList.add("message", "chatbot-message");
            const chatbotText = document.createElement("p");
            chatbotText.textContent = reply;
            chatbotMessage.appendChild(chatbotText);
            return chatbotMessage;
        }

        // 获取机器人回复
        async function getAnswer(message) {
            const response = await fetch(`http://hub.onmicrosoft.cn/chat?q=${encodeURIComponent(message)}`);
            if (response.ok) {
                const data = await response.json();
                return data.answer;
            } else {
                throw new Error(`Request failed. Status code: ${response.status}`);
            }
        }
