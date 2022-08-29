import { useCallback, useRef } from "react";

/**
 * Hook para impedir consulta a cada letra digitada no campo de pesquisa.
 * Espera 700 ms após para de digitar para realizar a consulta.
 */
export const useDebounce = (delay = 700, delayInFirstTime = true) => {
  const debouncing = useRef<NodeJS.Timeout>();
  const isFirstTime = useRef(delayInFirstTime);

  const debounce = useCallback((func: () => void) => {
  
    if (isFirstTime.current) {
      isFirstTime.current = false;
      func();
    }
    else {
      if (debouncing.current) {
       clearTimeout(debouncing.current);
      }

      debouncing.current = setTimeout(() => func(), delay);
    }
  
  }, [delay]);

  return {debounce};
};