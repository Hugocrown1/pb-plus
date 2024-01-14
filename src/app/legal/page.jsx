"use client";
import React, { useState } from "react";
import CustomPage from "@/components/CustomPage";
import ArticleCard from "@/components/ArticleCard";
import ContactForm from "@/components/ContactForm";

const Page = () => {
  const [filter, setFilter] = useState("");
  const articles = [
    {
      title: "Lorem ipsum 1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus sapiente inventore pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus sapiente inventore pariatur",
    },
    {
      title: "Lorem ipsum 2",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus sapiente inventore pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus sapiente inventore pariatur",
    },
    {
      title: "Lorem ipsum 3",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus sapiente inventore pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus sapiente inventore pariatur",
    },
  ];

  const navItems = articles.map((article) => ({
    title: article.title,
  }));

  const filteredNavItems = navItems.filter((navItem) =>
    navItem.title.toLowerCase().includes(filter.toLowerCase())
  );

  const scrollToArticle = (title) => {
    const element = document.getElementById(title);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFormSubmit = (formData) => {
    // Manejar la lógica de envío del formulario aquí
    console.log('Formulario enviado:', formData);
  };

  return (
    <main>
      <CustomPage
        title="PB+ LEGAL"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in."
        buttonText="Learn more"
        imageUrl="https://i.imgur.com/99mteXf.jpeg"
      />
      <main className="bg-[#f5f3f4]">
        <div className="container-xl pt-6">
          <div className="flex flex-row w-full h-full gap-10 mt-4 mb-6">
            <section className="w-[20%] flex flex-col">
              <input
                type="text"
                className="text-left"
                placeholder="Filtro"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <nav className="mt-4">
                <ul>
                  {filteredNavItems.map((navItem, index) => (
                    <li
                      key={index}
                      onClick={() => scrollToArticle(navItem.title)}
                      className="cursor-pointer transition duration-300 transform hover:scale-105 hover:bg-gray-200 p-2 rounded-md"
                    >
                      <div className=" text-lg font-semibold">
                        {navItem.title}
                      </div>
                    </li>
                  ))}
                </ul>
              </nav>
            </section>
            <section className="flex w-[80%]">
              <div className=" border-l-2 border-gray-300 h-full mx-8"></div>
              <div>
                {articles.map((article, index) => (
                  <a key={index} id={article.title}>
                    <ArticleCard
                      title={article.title}
                      content={article.content}
                    />
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
        <ContactForm onSubmit={handleFormSubmit} />
      </main>
    </main>
  );
};

export default Page;
