import type { IconType } from "react-icons";
import {
  FiCalendar,
  FiCreditCard,
  FiHome,
  FiPlusSquare,
  FiScissors,
  FiUser,
  FiUsers,
} from "react-icons/fi";

export type NavItem = { href: string; label: string; icon: IconType };

export const customerNav: NavItem[] = [
  { href: "/dashboard/customer", label: "Overview", icon: FiHome },
  { href: "/dashboard/customer/appointments", label: "My Appointments", icon: FiCalendar },
  { href: "/dashboard/customer/profile", label: "My Profile", icon: FiUser },
];

export const adminNav: NavItem[] = [
  { href: "/dashboard/admin", label: "Overview", icon: FiHome },
  { href: "/dashboard/admin/services", label: "Manage Services", icon: FiScissors },
  { href: "/dashboard/admin/services/add", label: "Add Service", icon: FiPlusSquare },
  { href: "/dashboard/admin/appointments", label: "Manage Appointments", icon: FiCalendar },
  { href: "/dashboard/admin/users", label: "Manage Users", icon: FiUsers },
  { href: "/dashboard/admin/transactions", label: "Transactions", icon: FiCreditCard },
  { href: "/dashboard/admin/profile", label: "My Profile", icon: FiUser },
];