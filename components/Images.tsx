"use client";

import Image from "next/image";
import useSWR from "swr";
import fetchImages from "../lib/fetchImages";

type ImageType = {
  name: string;
  url: string;
};

export default function Images() {
  const {
    data: images,
    mutate: refreshImages,
    isValidating,
    isLoading,
  } = useSWR("api/getImages", fetchImages, { revalidateOnFocus: false });

  console.log(images);

  return (
    <div>
      <div className="grid gap-4  grid-cols-1  md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 px-0 md:px-10">
        {images?.imageUrls?.map((image: ImageType, index: number) => (
          <div
            className={` cursor-help hover:scale-105 transition-transform duration-200 ease-in-out ${
              index === 0 && "md:col-span-2 md:row-span-2"
            }`}
            key={image.name}
          >
            <Image
              src={image.url}
              alt={image.name}
              height={800}
              width={800}
              className="w-full rounded-sm shadow-2xl drop-shadow-lg -z-10"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
