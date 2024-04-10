import { type ServerEventMessage, ServerEventsClient } from '@servicestack/client'

/**
 * @param {ServerEventMessage} msg
 * @returns {void}
 * @description Connects to event stream and logs the integer received from the server
 */
const client = new ServerEventsClient('/', ['*'], {
  handlers: {
    onInteger: (msg: ServerEventMessage) => {
      console.log('Received integer:', msg)
    }
  },
  onException: (e: Error) => { console.error('Error:', e) },
  onReconnect: () => { console.log('Reconnected') }
}).start()

export default client

/**
 * @param {EEGDATA} eegData
 * @returns {void}
 * @description Subscribes to EEG data, sends out updates with a vector of size nChannels * 1
 */
export const subscribeToEEGData = (callback: (eegData: any) => void): (() => void) => {
  const nChannels = 64
  const intervalId = setInterval(() => {
    // create a vector [counter, counter+1, ..., counter+nChannels-1]
    const nChannelsVector = new Array(nChannels).fill(0).map(() => Math.floor(Math.random() * 10) + 1)
    callback({
      eegChannelSize: nChannels,
      nChannelsVector
    })
  }, 10)

  // clean up
  return () => { clearInterval(intervalId) }
}
