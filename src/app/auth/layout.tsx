import { AuthLayoutHeader } from "./_components/AuthLayoutHeader";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full h-full  flex flex-col ">
      <AuthLayoutHeader />
      {children}
    </section>
  );
}
export const metadata = {
  title: "Auth",
  description: "Authentication pages for the application",
};
