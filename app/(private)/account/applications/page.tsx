import MyApplications from "@/src/components/features/account/applications/MyApplications";

export const metadata = {
  title: "Мои заявки | IdeaCrafter",
};

export default function AccountApplicationsPage() {
  return (
    <div className="mt-4">
      <MyApplications />
    </div>
  );
}
