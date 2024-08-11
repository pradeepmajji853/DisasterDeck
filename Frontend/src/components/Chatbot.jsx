import React, { useEffect } from 'react';

const ChatBotWidget = () => {
  useEffect(() => {
    window._be = window._be || {};
    window._be.id = "66b825a234abcc000746cda8";

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'cdn.chatbot.com/widget/plugin.js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <noscript>
        You need to <a href="https://www.chatbot.com/help/chat-widget/enable-javascript-in-your-browser/" rel="noopener nofollow">enable JavaScript</a> in order to use the AI chatbot tool powered by <a href="https://www.chatbot.com/" rel="noopener nofollow" target="_blank">ChatBot</a>.
      </noscript>
    </div>
  );
};

export default ChatBotWidget;
