import { fetchData } from "./utils/Api.js";
import { ControllerName } from "./utils/Constants.js";
export const routesnew = async () => {
  if (localStorage.getItem("UserId") && localStorage.getItem("RoleId")) {
    let RoleId = parseInt(localStorage.getItem("RoleId"));
    var routes = await fetchData(ControllerName.User, "GetMenu", [RoleId]);
  }

  return routes;
};
