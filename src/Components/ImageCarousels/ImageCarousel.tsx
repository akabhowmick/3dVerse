import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface ImageForCarousel {
  original: string;
  thumbnail: string;
  originalAlt: string;
  thumbnailAlt: string;
}

export const ImageCarousel = ({ images, alt }: { images: string[]; alt: string }) => {
  const imageArray: ImageForCarousel[] = [];
  images.map((image, index) => {
    imageArray.push({
      original: image,
      thumbnail: image,
      originalAlt: `${alt}, view ${index + 1}`,
      thumbnailAlt: `${alt} thumbnail ${index + 1}`,
    });
  });
  return (
    <div className="hero-images">
      <ImageGallery items={imageArray} showBullets lazyLoad />
    </div>
  );
};
