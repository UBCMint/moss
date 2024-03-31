import { ServerEventMessage, ServerEventsClient } from "@servicestack/client"

/**
 * @param {ServerEventMessage} msg
 * @returns {void}
 * @description Logs the integer received from the server
 */
const client = new ServerEventsClient("/", ["*"], {
    onMessage: (msg:ServerEventMessage) => {
        if (msg.selector === "cmd.onInteger") {
            console.log("Received integer:", msg.json)
        }
    },
    onException: (e:Error) => console.error("Error:", e),
    onReconnect: () => console.log("Reconnected"),
}).start()

export default client