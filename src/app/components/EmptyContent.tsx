"use client";

export const EmptyContent = (props: { message: string }) => {
  return <p className="text-center text-gray-500">{props.message}</p>;
};
