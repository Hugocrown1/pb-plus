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
          Para crear un restaurante debes tener una suscripción activa
        </h1>
        <p className="text-xl mt-4">Serás rederigido automaticamente</p>
        <div className="flex flex-row text-lg gap-x-2">
          De no ser asi
          <Link href={"/account"} className=" underline">
            haz click aqui
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NoSubscriptionPage;
