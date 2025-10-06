import SidebarAccount from "@/src/components/features/account/sidebar/Sidebar";
import HeaderMain from "@/src/components/widgets/header/HeaderMain";

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
        <div className="w-full mt-[7.3rem]">{children}</div>
      </div>
    </div>
  );
}
