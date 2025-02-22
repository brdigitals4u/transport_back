

export const Menus = [
  {
    icon: "MdDashboard",
    name: "Dashboard",
    role: ["ADMIN"],
    path: "/dashboard",
  },
  {
    icon: "BiSolidData",
    name: "Masters",
    role: ["ADMIN", "CARRIER"],
    path: "/masters",
    subItems: [
      {
        name: "Add Carrier",
        path: "/masters/carrier",
        role: ["ADMIN"],
      },
      { name: "Drivers", path: "/masters/drivers", role: ["ADMIN", "CARRIER"] },
      { name: "Route", path: "/masters/route", role: ["ADMIN", "CARRIER"] },
      {
        name: "Vehical Model",
        path: "/masters/vehical-model",
        role: ["ADMIN", "CARRIER"],
      },
      { name: "Permits", path: "/masters/permits", role: ["ADMIN", "CARRIER"] },
      {
        name: "Existing Renewal Docs",
        path: "/masters/existing-renewal-docs",
        role: ["ADMIN", "CARRIER"],
      },
    ],
  },
  {
    icon: "TbCurrentLocation",
    name: "Tracking",
    role: ["ADMIN", "CARRIER"],
    path: "/tracking",
    subItems: [
      {
        name: "Track Vehicle",
        path: "/tracking/trackvehicle",
        role: ["ADMIN"],
      },
      {
        name: "Start Point",
        path: "/tracking/startPoint",
        role: ["ADMIN", "CARRIER"],
      },
    ],
  },
  {
    icon: "FaUserShield",
    name: "Customers",
    path: "/customers",
    role: ["ADMIN"],
  },
];

export const Other = [];
