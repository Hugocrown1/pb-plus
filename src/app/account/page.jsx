"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserProperties from "@/components/UserProperties";
import SignOutButton from "./SignOutButton";
import Image from "next/image";
import { useSession } from "next-auth/react";
import UserEditForm from "@/components/UserEdit/UserEditForm";
import EditButton from "./EditButton";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

const Page = () => {
  const { data: session, status } = useSession();
  const defaultImage = "/assets/defaultprofile.jpg";
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userProperties, setUserProperties] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    if (session && session.user) {
      axios
        .get(`/api/users/${session.user.id}`)
        .then((response) => {
          setUserImage(response.data.image);
          setUserName(response.data.name.toLowerCase());
          setUserProperties(response.data.properties);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    }
  }, [session, showEditForm]);

  const openEditForm = (userId) => {
    setSelectedUserId(userId);
    setShowEditForm(true);
  };

  const closeEditForm = () => {
    setShowEditForm(false);
  };

  if (loading) {
    return (
      <div className="h-screen">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <main className="relative bg-[#f5f3f4] pt-[60px] min-h-[800px]">
      <div className="container-xl mb-16 gap-6 bg-white p-8 h-full border border-gray-200">
        <section className="flex flex-row gap-4 ">
          <Image
            src={userImage || defaultImage}
            width={225}
            height={225}
            className="rounded-xl aspect-square border-4 border-gray-200"
            alt="Imagen de usuario"
          />
          <div className="flex flex-col self-center">
            <h2 className="text-2xl text-left capitalize">{userName}</h2>
            <div className="flex gap-1"></div>
          </div>
        </section>
        <div className="flex  sm:justify-start justify-evenly">
          <EditButton onClick={() => openEditForm(session?.user?.id)} />
          <SignOutButton />
        </div>

        <h2 className="text-left text-2xl">Published properties</h2>
        <section className="flex flex-col rounded-md mx-auto">
          {userProperties && userProperties.length === 0 ? (
            <p className="text-left text-gray-700">
              No properties published yet
            </p>
          ) : (
            <UserProperties data={userProperties} />
          )}
        </section>

        <h2 className="text-left text-2xl">Events</h2>
        <section className="flex flex-col gap-4 mx-auto">
          <p className="text-left text-gray-700">No events published yet</p>
        </section>
      </div>
      {showEditForm && (
        <UserEditForm userId={selectedUserId} onClose={closeEditForm} />
      )}
    </main>
  );
};

export default Page;
