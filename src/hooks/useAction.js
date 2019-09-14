import { useDispatch } from "react-redux";
import { useCallback } from "react";

export function useAction(action) {
  const dispatch = useDispatch();
  return useCallback((...e) => dispatch(action(...e)), [action, dispatch]);
}
