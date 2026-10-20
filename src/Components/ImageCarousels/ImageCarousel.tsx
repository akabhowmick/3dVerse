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
  // No bullets: with up to 14 photos they wrapped over the image on
  // phones, and the thumbnail strip already shows position. No slideshow
  // play button either -- auto-advancing photos fight the shopper.
  return (
    <div className="hero-images">
      <ImageGallery items={imageArray} showPlayButton={false} lazyLoad />
    </div>
  );
};
