import { useAction } from "hooks/useAction";
import { useEffect } from "react";
import { screenSizeSubscribeAction } from "./redux";

export const useScreenSizeSubscription = () => {
  const setWidth = useAction(screenSizeSubscribeAction);
  useEffect(() => {
    const event = window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    return () => window.removeEventListener(event);
  }, []);
};
