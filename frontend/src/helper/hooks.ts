import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// useAutoClose
type Fn = (prop?: any) => void;
export const useAutoClose = (closeFn: Fn) => {
  useEffect(() => {
    window.addEventListener("click", closeFn);

    return () => {
      window.removeEventListener("click", closeFn);
    };
  });
};
