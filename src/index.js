const INDEX_OFFSET = 1;

function decodeLine(body, components, value) {
  const [c, next] = components;

  const current = isNaN(c) ? c : Number(c) - INDEX_OFFSET;
  components.shift();

  if (!next) {
    body[current] = value;
  } else {
    if (body[current]) {
      decodeLine(body[current], components, value);
    } else {
      if (isNaN(next)) {
        body[current] = {};
      } else {
        body[current] = [];
      }
      decodeLine(body[current], components, value);
    }
  }
}

/**
 * @param {string} query  Raw AWS Query Protocol encoded body string.
 * @example decode("Action=GetQueueUrl&QueueName=MyQueue")
 * @returns {Object.<string, any>}
 */

function decode(query) {
  const lines = query.split("&");

  let body = {};

  for (const l of lines) {
    const [key, rawValue] = l.split("=");

    const value = new URLSearchParams(`value=${rawValue}`).get("value");
    const components = key.split(".");

    decodeLine(body, components, value);
  }
  return body;
}

module.exports = {
  decode,
};
