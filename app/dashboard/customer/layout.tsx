import RoleGuard from "@/components/dashboard/RoleGuard";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard role="customer">{children}</RoleGuard>;
}