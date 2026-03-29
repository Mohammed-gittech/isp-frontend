import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

// Typed version of useDispatch — avoids repeating AppDispatch type everywhere
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed version of useSelector — avoids repeating RootState type everywhere
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector);
