const shapes = {
  tee(i=5) {
    return [[null, i-10, null, null], [i-1, i, i+1, null], [null, null, null, null], [null, null, null, null]]
  },
  es(i=4) {
    return [[null, i, i+1, null], [i+9, i+10, null, null], [null, null, null, null], [null, null, null, null]]
  },
  jay(i=5)  {
    return [[null, i-10, null, null], [null, i, null, null], [i+9, i+10, null, null], [null, null, null, null]]
  },
  el(i=4)  {
    return [[null, i-10, null, null], [null, i, null, null], [null, i+10, i+11, null], [null, null, null, null]]
  },
  zed(i=5)  {
    return [[i-10, i-11, null, null], [null, i, i+1, null], [null, null, null, null], [null, null, null, null]]
  },
  ou(i=4)  {
    return [[null, null, null, null], [null, i, i+1, null], [null, i+10, i+11, null], [null, null, null, null]]
  },
  eye(i=5)  {
    return [[null, i-10, null, null], [null, i, null, null], [null, i+10, null, null], null, i+20, null, null]
  }
}

// const shapes = {
//   tee(i=5) {
//     return [null, i-10, null, i-1, i, i+1, null, null, null]
//   },
//   es(i=4) {
//     return [null, null, null, null, i, i+1, i+9, i+10, null]
//   },
//   jay(i=5)  {
//     return [null, i-10, null, null, i, null, i+10, i+9, null]
//   },
//   el(i=4)  {
//     return [null, i-10, null, null, i, null, null, i+10, i+11]
//   },
//   zed(i=5)  {
//     return [i-10, i-11, null, null, i, i+1, null, null, null]
//   },
//   ou(i=4)  {
//     return [null, i-10, i-9, , null, i, i+1, null, null, null]
//   },
//   eye(i=5)  {
//     return [i-10, i, i+10, i+20]
//   }
// }

export default shapes;
