import React from "react";

type CardProps = {
  title: string;
  description: string;
  image?: string;
  children?: React.ReactNode;
};

const Card = ({ title, description, image, children }: CardProps) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-64">
    {image && <img src={image} alt={title} className="w-32 h-32 object-cover rounded-full mb-2" />}
    <h3 className="text-xl font-bold text-red-600 mb-1">{title}</h3>
    <p className="text-gray-700 mb-2 text-center">{description}</p>
    {children}
  </div>
);

export default Card;
