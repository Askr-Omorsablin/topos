'use client';

import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface ResearchCardProps {
  title: string;
  description: string;
  image: StaticImageData;
}

export function ResearchCard({
  title,
  description,
  image
}: ResearchCardProps) {
  return (
    <div className="relative w-[400px] flex-none aspect-[10/16] bg-black rounded-2xl overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      
      <div className="absolute inset-0 p-8 flex flex-col">
        <h3 className="text-2xl font-light text-white mb-2">
          {title}
        </h3>
        <p className="text-white/70">
          {description}
        </p>
      </div>
    </div>
  );
} 