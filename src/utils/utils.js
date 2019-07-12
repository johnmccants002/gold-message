export const sleep = async(duration) => {
    return new Promise(async(resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, duration)
     })
}