import SidebarAccount from "@/src/components/features/account/sidebar/Sidebar";
import HeaderMain from "@/src/components/widgets/header/HeaderMain";
import Container from "@/src/components/common/container/Container";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex flex-col ">
      <HeaderMain />
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <SidebarAccount />
        <div className="w-full mt-[7.3rem]">
          <div className="mt-4">
            <Container>
              <h2 className="text-3xl font-semibold">Дашбоард аккаунта</h2>
              {children}
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}
