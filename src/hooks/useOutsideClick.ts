import { RefObject, useEffect } from 'react';

/*
 usage:
 const refNode = useRef(null);
 useClickOutside(refNode, () => {});
 */

const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: () => void,
) => {
  const handleClick = (e: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    document.addEventListener(`touchstart`, handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener(`touchstart`, handleClick);
    };
  });
};

export default useClickOutside;
