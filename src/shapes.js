const shapes = {
  tee(i=5) {
    return [null, i, null, i+9, i+10, i+11, null, null, null]
  },
  es(i=4) {
    return [null, null, null, null, i, i+1, i+9, i+10, null]
  },
  jay(i=5)  {
    return [null, i, null, null, i+10, null, i+20, i+19, null]
  },
  el(i=4)  {
    return [null, i, null, null, i+10, null, null, i+20, i+21]
  },
  zed(i=5)  {
    return [i, i-1, null, null, i+10, i+11, null, null, null]
  },
  ou(i=4)  {
    return [i, i+1, i+10, i+11]
  },
  eye(i=5)  {
    return [i, i+10, i+20, i+30]
  }
}

export default shapes;
