export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full h-full  flex flex-col items-center justify-center">
      {children}
    </section>
  );
}
