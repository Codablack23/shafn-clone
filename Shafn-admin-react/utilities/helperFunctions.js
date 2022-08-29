const generateSlug = (string) => {
  return string
    .replace(/[^a-zA-Z0-9-_]/g, " ")
    .replace(/  +/g, " ")
    .split(" ")
    .join("-")
    .trim()
}

const objectsEqual = (o1, o2) => {
  if (typeof o1 === "object" && Object.keys(o1).length > 0) {
    return (
      Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
    )
  } else if (typeof o1 === "string") {
    return o1.toLowerCase() === o2.toLowerCase()
  } else {
    return o1 === o2
  }
}

const arraysEqual = (a1, a2) =>
  a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]))

const encrypt = (data) => {
  const CryptoJS = require("crypto-js")

  const encryptedData = CryptoJS.AES.encrypt(
    data,
    process.env.password
  ).toString()

  return encryptedData
}

const decrypt = (encryptedData) => {
  const CryptoJS = require("crypto-js")

  const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.password)
  const data = bytes.toString(CryptoJS.enc.Utf8)

  return data
}

export { generateSlug, arraysEqual, encrypt, decrypt }
