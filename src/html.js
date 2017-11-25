function toParagraph(data) {
  const content = Object.keys(data)
    .map(key => `${key}: ${data[key]}`).join('.');

  return `<p>${content}</p>`
}

function toHTML(data) {
  if (Array.isArray(data) && data.length) {
    return data.map(toParagraph).join('');
  } else if (Array.isArray(data) && !data.length) {
    throw new Error('Collection should has at least one item.')
  }

  return toParagraph(data);
}

export default toHTML;
