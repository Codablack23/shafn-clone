const generateSlug = (string) => {
  return string
    .replace(/[^a-zA-Z0-9-_]/g, " ")
    .replace(/  +/g, " ")
    .split(" ")
    .join("-")
    .trim()
}

let array = [1, 2, 3].find((num) => num === 0)

console.log(array !== undefined)
