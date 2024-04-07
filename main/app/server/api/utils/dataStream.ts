import { ServerEventMessage, ServerEventsClient } from "@servicestack/client"

/**
 * @param {ServerEventMessage} msg
 * @returns {void}
 * @description Connects to event stream and logs the integer received from the server
 */
const client = new ServerEventsClient("/", ["*"], {
    handlers: {
        onInteger: (msg: ServerEventMessage) => {
            console.log("Received integer:", msg);
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

/**
 * @param {EEGDATA} eegData
 * @returns {void}
 * @description Subscribes to EEG data, sends out updates with a vector of size nChannels * 1
 */
export const subscribeToEEGData = (callback: (eegData: EEGDATA) => void) => {
    const nChannels = 64;
    let counter = 0;
    const intervalId = setInterval(() => {
        // create a vector [counter, counter+1, ..., counter+nChannels-1]
        const nChannelsVector = new Array(nChannels).fill(1).map((_, index) => index + counter); 
    callback({
      eegChannelSize: nChannels,
      nChannelsVector
    });
    counter += nChannels;
  }, 10);

  // clean up
  return () => clearInterval(intervalId);
};