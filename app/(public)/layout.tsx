import HeaderMain from "@/src/components/widgets/header/HeaderMain";

export default function Layout({ children }: React.ReactNode) {
  return (
    <>
      <HeaderMain />
      <div className="pt-[8rem]">{children}</div>
    </>
  );
}
