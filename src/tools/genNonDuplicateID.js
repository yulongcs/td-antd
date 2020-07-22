function genNonDuplicateID(length = 2) {
  return Math.random().toString(16).substring(2, length + 2);
}

export default genNonDuplicateID;