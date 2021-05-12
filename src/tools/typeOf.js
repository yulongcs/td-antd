const typeOf = (obj, type) => Object.prototype.toString.call(obj) === `[object ${type}]`;

export default typeOf;
