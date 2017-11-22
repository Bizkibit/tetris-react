export const rotate90 = func => num => {
  let nodes = func(num);
  let first = nodes[1][1]-11;
  let col1 = [nodes[2][0], nodes[1][0], nodes[0][0], nodes[3][0]].map((k,i)=>k?first+i:null);
  let col2 = [nodes[2][1], nodes[1][1], nodes[0][1], nodes[3][1]].map((k,i)=>k?first+i+10:null);
  let col3 = [nodes[2][2], nodes[1][2], nodes[0][2], nodes[3][2]].map((k,i)=>k?first+i+20:null);;
  let col4 = [nodes[2][3], nodes[1][3], nodes[0][3], nodes[3][3]].map((k,i)=>k?first+i+30:null);;
  return [col1, col2, col3, col4]
}

export function bottomNodes(nodes) {
  let col1 = [nodes[3][0], nodes[2][0], nodes[1][0], nodes[0][0]];
  let col2 = [nodes[3][1], nodes[2][1], nodes[1][1], nodes[0][1]];
  let col3 = [nodes[3][2], nodes[2][2], nodes[1][2], nodes[0][2]];
  let col4 = [nodes[3][3], nodes[2][3], nodes[1][3], nodes[0][3]];
  return [col1, col2, col3, col4].map(e => e.find(notNull)).filter(notUndefined)
}

export function leftNodes(nodes) {
  return nodes.map(e => e.find(notNull)).filter(notUndefined)
}

export function rightNodes(nodes)  {
  let row1 = nodes[0].reverse();
  let row2 = nodes[1].reverse();
  let row3 = nodes[2].reverse();
  let row4 = nodes[3].reverse();
  return [row1, row2, row3, row4].map(e => e.find(notNull)).filter(notUndefined)
}

export function notNull(element) {
  return element !== null
}

function notUndefined(element)  {
  return element !== undefined
}

export function notGrey(element) {
  return element !== "grey"
}

export function biggerthan(element) {
  return element <= 139
}
