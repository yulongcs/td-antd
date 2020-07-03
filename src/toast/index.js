import message from 'antd/es/message';
import 'antd/es/message/style';

message.config({maxCount: 1});

export default function toast(props) {
  const {
    type = 'success',
    text = '',
    time = 3,
  } = props;
  return message[type](text, time);
}