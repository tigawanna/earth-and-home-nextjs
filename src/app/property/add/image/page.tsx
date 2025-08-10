import { Uploader } from "@/components/property/form/sections/test-upload";
import { clientEnvs } from "@/lib/envs/client-env";
import Image from "next/image";
export default function imagePage() {
  const imageUrl =
    process.env?.NEXT_PUBLIC_R2_PUBLIC_URL + "/a61d7be3-3386-4052-b932-9b3ba3ee2ebe-icon.png";
    console.log("Image URL:", imageUrl);
return (
  <section className="w-full h-full  flex flex-col items-center justify-center">
    <Uploader />
    <Image
      src={imageUrl}
      alt="Uploaded Image"
      width={6400}
      height={4800}
    />
  </section>
);}
