// import {
//   IconAperture,
//   IconCopy,
//   IconLayoutDashboard,
//   IconLogin,
//   IconMoodHappy,
//   IconTypography,
//   IconUserPlus,
// } from "@tabler/icons-react";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DashboardIcon from "@mui/icons-material/Dashboard";
const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: 1,
    title: "Dashboard",
    icon: DashboardIcon,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Intern_management",
  },
  {
    id: 2,
    title: "Intern\u00A0\u00A0list",
    icon: FormatListBulletedIcon,
    href: "/internList",
  },
  {
    id: 3,
    title: "Intern\u00A0\u00A0project",
    icon: FormatListBulletedIcon,
    href: "/internProject",
  },
  {
    navlabel: true,
    subheader: "Project_management",
  },
  {
    id: 4,
    title: "Project\u00A0\u00A0list",
    icon: AssignmentIcon,
    href: "/projectList",
  },
  {
    id: 5,
    title: "Project\u00A0\u00A0detail",
    icon: AssignmentIcon,
    href: "/projectDetail",
  },
];

export default Menuitems;
