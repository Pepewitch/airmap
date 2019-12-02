import { useSelector } from "react-redux";
import _ from "lodash";

export const useScreenSize = () => {
  const width = useSelector(state => _.get(state, "screenSize.width"));
  return width;
};
