function identityCard(idCard) {
  return {
    // 获取性别
    gender() {
      try {
        return `${window.parseInt(idCard.substr(16, 1)) % 2}`;
      } catch (error) {
        return null;
      }
    },
    // 出生日期
    birth() {
      return `${idCard.substr(6, 4)}/${idCard.substr(10, 2)}/${idCard.substr(12, 2)}`;
    },
    // 获取年龄
    age() {
      /*
      * 获取18位身份证的出生日期
      *   7、8、9、10位是年份
      *   11、12位是月份
      *   13、14位是日期
      * */
      const nowDate = new Date();
      const birthday = this.birth();
      const birthDate = new Date(birthday); // 获取时间格式
      let age = nowDate.getFullYear() - birthDate.getFullYear();

      if (nowDate.getMonth() < birthDate.getMonth() || (nowDate.getMonth() === birthDate.getMonth() && nowDate.getDate() < birthDate.getDate())) {
        age --;
      }

      return age;
    },
    // 获取全部
    all() {
      return {
        gender: this.gender(),
        age: this.age(),
        birth: this.birth(),
      }
    },
  };
}

export default identityCard;
