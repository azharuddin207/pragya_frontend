import cookie from "react-cookies";
let token = cookie.load("token");

let items = [];

if (token) {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  const { role } = JSON.parse(jsonPayload);
  items = [
    {
      icon: "icon-user",
      name: "Category",
      url: "/category"
    },
    {
      icon: "icon-lock",
      name: "Public Users",
      url: "/publicUsers"
    }
  ];

  role === "super"
    ? items.push(
        {
          icon: "icon-user",
          name: "Admins",
          url: "/viewadmins"
        },
        {
          icon: "icon-lock",
          name: "Logout",
          url: "/logout"
        }
      )
    : items.push({
        icon: "icon-lock",
        name: "Logout",
        url: "/logout"
      });

}

export default {
  items
};
