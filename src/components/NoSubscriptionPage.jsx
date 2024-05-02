"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const NoSubscriptionPage = () => {
  const router = useRouter();
  setTimeout(() => {
    router.push("/account");
  }, 5000);

  return (
    <main className="flex items-center justify-center w-full  h-[800px] pt-14">
      <section className="max-w-[1000px] mx-auto flex flex-col items-center text-center">
        <Image
          height={180}
          width={180}
          src="/assets/logomain.png"
          alt="Logo Punta Banda Plus"
        />
        <h1 className="text-4xl">
          To create an advertisement you must have an active subscription
        </h1>
        <p className="text-xl mt-4">You will be redirected automatically</p>
        <div className="flex flex-row text-lg gap-x-2">
          If not,
          <Link href={"/account"} className=" underline">
            click here
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NoSubscriptionPage;
