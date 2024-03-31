import { ServerEventMessage, ServerEventsClient } from "@servicestack/client"

/**
 * @param {ServerEventMessage} msg
 * @returns {void}
 * @description Connects to event stream and logs the integer received from the server
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

/**
 * @param {number} integer
 * @returns {void}
 * @description Sends integers to client 
 */
export const subscribeToIntegers = (callback: (integer: number) => void) => {
    let counter = 0
    const intervalId = setInterval(() => {
        callback(counter++)
        if (counter > 99) counter = 0
    }, 10) // send integer every 10ms => 100 integers per second
    // clean up
    return () => clearInterval(intervalId)
}