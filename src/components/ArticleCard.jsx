import React from "react";

const ArticleCard = ({ title, content }) => {
  return (
    <section className="w-full mt-8 mx-auto text-lg ">
      <p className="font-bold text-2xl mb-2">{title}</p>
      <div className="flex items-center justify-center flex-col p-6 bg-white rounded-lg shadow-md">
        <article>
          <p className="my-6">{content}</p>
        </article>
      </div>
    </section>
  );
};

export default ArticleCard;
