import ButtonCheckout from "./ButtonCheckout";
import { loadPrices } from "@/lib/stripe";

const page = async () => {
  const prices = await loadPrices();
  return (
    <main className="min-h-[500px] w-full  pt-[60px]">
      <h1>Pricing</h1>

      <div className="flex max-w-[1280px] mx-auto items-center justify-center">
        {prices.map(({ id, nickname, unit_amount, priceId }) => (
          <article
            className="flex flex-col items-center p-4 bg-gray-300 w-[450px] rounded-xl"
            key={id}
          >
            <h2>{nickname}</h2>
            <h3 className="text-xl">{unit_amount / 100}$</h3>
            <ButtonCheckout priceId={id} />
          </article>
        ))}
      </div>
    </main>
  );
};

export default page;
