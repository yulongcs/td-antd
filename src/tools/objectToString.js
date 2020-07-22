function objectToString(msg) {
  try {
    return (typeof msg === 'string') ? JSON.parse(msg) : JSON.stringify(msg);
  } catch (e) {
    throw new Error('objectToString error，please check the params');
  }
}

export default objectToString;
