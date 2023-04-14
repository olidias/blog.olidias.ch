import React from "react";
import Layout from '../components/layout';
import Navigation from "../components/navigation";
import Header from "../components/header";
import InitialBanner from "../components/initial-banner";
import ImageGallery from 'react-image-gallery';
import { graphql } from 'gatsby';
import { Seo } from "../components/seo";

function Gallery({ data: { gallery } }) {
    let galleryImages = [];
    gallery.images.forEach(image => {
        galleryImages.push({
            original: image.url,
            thumbnail: `${image.url}?h=100&w=200`
        })
    });
    return (
        <Layout className="w-full h-full">
            <InitialBanner />
            <Header />
            <Navigation activeIndex={1} />
            <div className="z-10 max-w-full h-auto pb-56">
                <ImageGallery items={galleryImages} />
            </div>
        </Layout>
    )
}
export default Gallery;
export const Head = () => (
  <Seo title="Gallery - Oli Dias">
    <script type="application/ld+json">
      {`
    {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "url": "https://blog.olidias.ch/gallery",
        "name": "olidias.ch - Photography Gallery",
        "creator": {
          "@type": "Person",
          "givenName": "Oli",
          "familyName": "Dias",
          "additionalName": "Oli"
        }
      }
  `}
    </script>
  </Seo>
);

export const query = graphql`
{
    gallery: datoCmsGallery {
      id
      images {
        url
        alt
      }
    }
  }
`  
