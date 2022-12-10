import { useState, useEffect } from 'react';
/**
 * Function used to create event listeners for key presses.
 *
 * @see https://usehooks.com/useKeyPress/
 * @since 08/27/2022
 * @version 1.0.0
 */
export default function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }
    function upHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    }
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);
  return keyPressed;
}
