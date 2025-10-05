import Container from "@/src/components/common/container/Container";
import SidebarAccount from "@/src/components/features/account/sidebar/Sidebar";

export default function AccountPage() {
  return (
    <div className="w-full pt-[9rem]">
      <Container>
        <SidebarAccount />
      </Container>
    </div>
  );
}
