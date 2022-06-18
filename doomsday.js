const generateSlug = (string) => {
  return string
    .replace(/[^a-zA-Z0-9-_]/g, " ")
    .replace(/  +/g, " ")
    .split(" ")
    .join("-")
    .trim()
}
