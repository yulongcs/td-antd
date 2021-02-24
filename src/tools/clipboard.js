function clipboard(text) {
  const copyEvent = (e) => {
    e.clipboardData.setData('text/plain', text);
    e.preventDefault();
  };

  document.addEventListener('copy', copyEvent);

  try {
    document.execCommand('copy');
    document.removeEventListener('copy', copyEvent);

    return Promise.resolve();
  } catch (err) {
    throw new TypeError('Warning: [clipboard] Unable to copy');
  }
}

export default clipboard;
