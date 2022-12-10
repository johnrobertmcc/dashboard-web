import { Input } from 'components/utils';

/**
 * Function used to map and create an array of custom input elements.
 * @author John Robert McCann
 * @since 6/19/2022
 * @param   {object}   data     The data and attributes of the individual inputs.
 * @param   {Function} callBack Function passed tot he indivual input as onClick.
 * @returns {Array}             Returns an array of custom <Input /> components.
 */
export default function createInputRows(data, callBack) {
  return Object.keys(data).map((input, i) => {
    return (
      <Input
        key={i}
        id={input}
        name={input}
        value={data[input].value}
        placeHolder={data[input].text}
        callBack={callBack}
      />
    );
  });
}
