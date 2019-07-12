import { NativeModules } from 'react-native';
const { GMComposeMessage } = NativeModules;

export default {
  sendMessage : (phoneNumber, message) => {
      try {
         return new Promise(async(resolve, reject) => {
            GMComposeMessage.sendMessage(phoneNumber, message, (empty, result) => {
                resolve(result)
            })
         })
      } catch(err) {
        console.log(err)
      }
  },
};
