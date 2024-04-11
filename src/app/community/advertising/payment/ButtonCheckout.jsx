"use client";
import axios from "axios";
const ButtonCheckout = ({ priceId }) => {
  const handleCheckOut = async (priceId) => {
    const { data } = await axios.post("/api/checkout", { priceId });

    window.location.href = data.url;
  };
  return (
    <button onClick={() => handleCheckOut(priceId)} className="events-button">
      Buy
    </button>
  );
};

export default ButtonCheckout;
