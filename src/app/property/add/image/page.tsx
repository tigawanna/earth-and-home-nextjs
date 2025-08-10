import { Uploader } from "@/components/property/form/sections/test-upload";
import Image from "next/image";
export default function imagePage() {
return (
  <section className="w-full h-full  flex flex-col items-center justify-center">
    <Uploader />
    <Image
    //   src="https://earth-and-home.23d25d92ceac80bd3db7947588b16c6b.r2.cloudflarestorage.com/cute-house.jpg"
      src="https://23d25d92ceac80bd3db7947588b16c6b.r2.cloudflarestorage.com/earth-and-home/cute-house.jpg"
      alt="Uploaded Image"
      width={6400}
      height={4800}
    />
  </section>
);}
