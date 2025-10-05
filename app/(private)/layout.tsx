import HeaderMain from "@/src/components/widgets/header/HeaderMain";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex flex-col ">
      <HeaderMain />
      {children}
    </div>
  );
}
