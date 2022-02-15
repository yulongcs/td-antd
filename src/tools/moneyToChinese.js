const AIW_number = {0:'零', 1:'壹', 2:'贰', 3:'叁', 4:'肆', 5:'伍', 6:'陆', 7:'柒', 8:'捌', 9:'玖'};
const AIW_unitN = ['兆','亿','万',''];
const AIW_unitP = ['毫', '厘','分','角'];
const AIW_unitU = ['仟','佰','拾',''];

const container = {
  amountInWords(amount) {
    if (!amount) return '零元整';

    const AIW = `${amount}`.split('.');

    if(AIW.length > 1) {
      return `${this.amountInWordsRound(AIW[0])}元${this.amountInWordsF(AIW[1])}`;
    } else {
      return `${this.amountInWordsRound(AIW[0])}元整`;
    }
  },

  // 整数部分转换
  amountInWordsRound(round) {
    if(!round) return '';

    let words = '';
    const rounds = Array.from(round);
    let length = rounds.length;
    let unitU = JSON.parse(JSON.stringify(AIW_unitU));
    const unitN = JSON.parse(JSON.stringify(AIW_unitN));

    while(length>0) {
      length --;

      const A = rounds.pop();
      const U = unitU.pop();
      const N = (unitU.length === 3 ? unitN.pop() : '');

      if(A !== 0) {
        words = AIW_number[A] + U + N + words;
      } else {
        words = AIW_number[A] + N + words;
      }

      if (unitU.length === 0) {
        unitU = JSON.parse(JSON.stringify(AIW_unitU));
      }
      words = words.replace('undefined','');
      words = words.replace('个','');
    }

    return this.amountInWordsFormate(words)
  },

  // 小数部分转换
  amountInWordsF(fix) {
    if(!fix) return '';

    const unitP = JSON.parse(JSON.stringify(AIW_unitP));
    const fixs = Array.from(fix);
    let words = '';
    fixs.forEach((o) => {
      const P = unitP.pop()
      if(o === 0) words += AIW_number[o];
      else words+=AIW_number[o]+P;
      words = words.replace('undefined','')
    });
    return this.amountInWordsFormate(words)
  },

  amountInWordsFormate(words) {
    // 去除中位零
    let length =  words.length;

    while(length > 1) {
      length--;

      const now = words.charAt(length);
      const before = words.charAt(length-1);
      const after =  words.charAt(length+1);
      if(now === before || (AIW_unitN.includes(after) && now === AIW_number[0] ) ){
        words =  words.substring(0,length) + words.substring(length + 1);
        length = words.length
      }
    }

    // 去除末位零
    length = 2;

    while(length > 1) {
      length--;

      if(words.charAt(words.length - 1) === AIW_number[0] && words.length > 1){
        words =  words.substring(0, words.length - 1);
        length = 2
      }
    }

    return words;
  },
};

const moneyToChinese = (money) => {
  try {
    return container.amountInWords(money);
  } catch (error) {
    return new Error(error);
  }
};

export default moneyToChinese;
