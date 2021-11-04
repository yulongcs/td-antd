function clipboard(text) {
  if (document.execCommand('copy')) {
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
  } else {
    const input = document.createElement('textarea');
    input.value = text;
    document.body.appendChild(input);
    input.setSelectionRange(-1, 9999);
    input.select();

    document.execCommand('copy');
    document.body.removeChild(input);
    return Promise.resolve();
  }
}

export default clipboard;
