import { useEffect, useRef } from "react";

/**
 * useUpdateEffect is used like useEffect but it will not execute on first time render
 * @param {func} callback Callback Function
 * @param {[]} dependencies Dependency Array
 */
const useUpdateEffect = (callback, dependencies) => {
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    return callback();
  }, dependencies);
};

export default useUpdateEffect;
