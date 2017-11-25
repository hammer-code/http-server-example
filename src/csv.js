function createHeader(data) {
  return Object.keys(data).join(',');
}

function toString(data) {
  const keys = Object.keys(data);

  return keys.map(key => data[key]).join(',');
}

function toCsv(data) {
  if (Array.isArray(data) && data.length) {
    let header = createHeader(data[0]);

    let body = data.map((item) => toString(item)).join("\n");
    return header + "\n" + body;
  } else if (Array.isArray(data) && !data.length) {
    throw new Error('Collection should has at least one item.')
  }

  let header = createHeader(data);

  return header + "\n" + toString(data);
}

export default toCsv;
