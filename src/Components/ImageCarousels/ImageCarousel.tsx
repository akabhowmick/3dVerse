import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface ImageForCarousel {
  original: string;
  thumbnail: string;
}

export const ImageCarousel = ({ images }: { images: string[] }) => {
  const imageArray: ImageForCarousel[] = [];
  images.map((image) => {
    imageArray.push({
      original: image,
      thumbnail: image,
    });
  });
  return (
    <div className="hero-images">
      <ImageGallery items={imageArray} showBullets lazyLoad />
    </div>
  );
};
