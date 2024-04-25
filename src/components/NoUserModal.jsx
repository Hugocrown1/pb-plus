"use client";
import { useModalStore } from "@/store/modalStore";
import { IconHeart, IconX } from "@tabler/icons-react";
import Link from "next/link";

const NoUserModal = () => {
  const { showModal, setShowModal } = useModalStore();
  return (
    <div
      onClick={() => setShowModal(false)}
      className={`fixed flex items-center inset-0  bg-zinc-950/30 transition-transform z-40 w-full ${
        !showModal && "invisible"
      } `}
    >
      <dialog
        onClick={(e) => {
          e.stopPropagation(), e.preventDefault();
        }}
        className="flex z-10  flex-col justify-evenly w-full  max-w-[600px] items-center  bg-white rounded-lg  pb-8"
      >
        <div
          onClick={() => setShowModal(false)}
          className="self-end p-1 hover:bg-gray-300 rounded-full transition-colors mr-4 mt-2 cursor-pointer"
        >
          <IconX color="black" size={32} />
        </div>
        <div className="flex flex-col items-center mb-8 px-12">
          <IconHeart size={72} />
          <h2 className="text-2xl font-semibold text-pretty">
            Join us to show your interest in this event!
          </h2>
        </div>
        <div className="w-full flex flex-col min-[505px]:flex-row gap-x-4 gap-y-2 justify-center items-center px-12">
          <Link
            onClick={() => setShowModal(false)}
            href={"/auth/login"}
            className="community-button"
          >
            Login
          </Link>
          <Link
            onClick={() => setShowModal(false)}
            href={"/auth/signup"}
            className="community-button-outline"
          >
            Sign up
          </Link>
        </div>
      </dialog>
    </div>
  );
};

export default NoUserModal;