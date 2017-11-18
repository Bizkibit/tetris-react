const shapes = {
  tee(i=5) {
    return [null, i-10, null, i-1, i, i+1, null, null, null]
  },
  es(i=4) {
    return [null, null, null, null, i, i+1, i+9, i+10, null]
  },
  jay(i=5)  {
    return [null, i-10, null, null, i, null, i+10, i+9, null]
  },
  el(i=4)  {
    return [null, i-10, null, null, i, null, null, i+10, i+11]
  },
  zed(i=5)  {
    return [i-10, i-11, null, null, i, i+1, null, null, null]
  },
  ou(i=4)  {
    return [i-10, i-9, i, i+1]
  },
  eye(i=5)  {
    return [i-10, i+10, i+20, i]
  }
}

export default shapes;
