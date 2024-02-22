"use client";
import React, { useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";

const Page = () => {
  const [filter, setFilter] = useState("");
  const articles = [
    {
      title: "Inmigration Services",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus sapiente inventore pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus sapiente inventore pariatur",
    },
    {
      title: "Property Regularization",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus sapiente inventore pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus sapiente inventore pariatur",
    },
    {
      title: "Property Acquisition",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus sapiente inventore pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus sapiente inventore pariatur",
    },
    {
        title: "Court Represention",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus sapiente inventore pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus sapiente inventore pariatur",
      },
      {
        title: "Legal Consulting",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus sapiente inventore pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus sapiente inventore pariatur",
      },
      {
        title: "Formation Of Companies And Trust",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus sapiente inventore pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus sapiente inventore pariatur",
      },
      {
        title: "Funeral Arrangements",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus sapiente inventore pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus sapiente inventore pariatur",
      },
      {
        title: "More Legal Services",
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
    console.log("Formulario enviado:", formData);
  };

  return (
    <main>
      <main className="bg-[#f5f3f4] ">
        <div className="flex w-full pt-12 pl-60 bg-[#323d51]">
          <Link
            href={"/"}
            className="px-6  pt-3 rounded-[10px] font-medium text-lg w-[110px]   text-[#FCFFFC] transition-colors   hover:text-[#D3AC2B]   text-center"
          >
            Inicio
          </Link>
          <span className=" text-white self-center text-xl pt-2">&#62;</span>
          <Link
            href={"/legal"}
            className="px-6 pt-3  rounded-[10px] font-medium text-lg w-[110px]   text-[#FCFFFC] transition-colors   hover:text-[#D3AC2B]   text-center"
          >
            Legal
          </Link>
          <span className=" text-white self-center text-xl pt-2">&#62;</span>
          <Link
            href={"/legal/services"}
            className="px-6 pt-3  rounded-[10px] font-medium text-lg w-[110px]   text-[#FCFFFC] transition-colors   hover:text-[#D3AC2B]   text-center"
          >
            Services
          </Link>
        </div>
        
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
              <div className=" border-l-2 border-[#D3AC2B] h-full mx-8"></div>
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
      </main>
    </main>
  );
};

export default Page;
