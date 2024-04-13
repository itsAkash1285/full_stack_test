const blacklist = new Set();

function addToken(token) {
  blacklist.add(token);
}

function isTokenBlacklisted(token) {
  return blacklist.has(token);
}

module.exports = { addToken, isTokenBlacklisted };
