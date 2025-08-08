import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16">
      <div className="text-2xl font-bold">Welcome to My App</div>
      <div className="flex flex-col items-center gap-4">
        <Image src="/logo.png" alt="Logo" width={100} height={100} className="rounded-full" />
        <p className="text-lg text-gray-700">This is a simple Next.js app.</p>
      </div>
      <div className="text-sm text-gray-500">© 2023 My App</div>
    </div>
  );
}
