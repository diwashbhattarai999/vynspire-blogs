import { SiteHeader } from "@/components/layouts/header/site-header";

export default function DashboardPage() {
  return (
    <div className="relative mx-auto size-full max-w-[1920px]">
      <SiteHeader title="Dashboard" />

      <main className="bg-background h-[calc(100vh-var(--header-height))] flex-1 overflow-x-hidden overflow-y-auto px-6 py-4">
        DashboardPage
      </main>
    </div>
  );
}
