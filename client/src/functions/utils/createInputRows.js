import { Input } from 'components/utils';

export default function createInputRows(data, callBack) {
  return Object.keys(data).map((input) => {
    return (
      <Input
        id={input}
        name={input}
        value={data[input].value}
        placeHolder={data[input].text}
        callBack={callBack}
      />
    );
  });
}
