function getUrlParameter(name, link = window.location.href) {
  const url = link.slice(link.indexOf('?'), link.length);
  const r = url.substr(1).match(new RegExp(`(^|&)${name}=([^&]*)(&|$)`));

  if (r !== null) {
    return unescape(r[2]);
  }

  return null;
}

export default getUrlParameter;