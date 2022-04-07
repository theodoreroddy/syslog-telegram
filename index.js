import fetch from 'node-fetch'
import SyslogServer from "syslog-server"
import 'dotenv/config'

const server = new SyslogServer();
 
server.on("message", (value) => {

    if (value.message.match(/fault/)) {
        fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
              method: "post",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                'chat_id': process.env.TELEGRAM_CHAT_ID,
                'text': value.message,
                'disable_notification': false
              })
            })
    }
    
});
 
server.start();