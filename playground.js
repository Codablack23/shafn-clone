// const objectsEqual = (o1, o2) => {
//   if (typeof o1 === "object" && Object.keys(o1).length > 0) {
//     return (
//       Object.keys(o1).length === Object.keys(o2).length &&
//       Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
//     )
//   } else if (typeof o1 === "string") {
//     return o1.toLowerCase() === o2.toLowerCase()
//   } else {
//     return o1 === o2
//   }
// }

// const arr1 = [
//   { name: "Color", option: "Black" },
//   { name: "Size", option: "2" },
// ]
// const arr2 = [
//   { name: "size", option: "2" },
//   { name: "Color", option: "Black" },
// ]

// const arraysEqual = (a1, a2) =>
//   a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]))

// console.log(arraysEqual(arr1, arr2))
