export const wait = (seconds) => new Promise(resolve => window.setTimeout(resolve, seconds * 1000))
