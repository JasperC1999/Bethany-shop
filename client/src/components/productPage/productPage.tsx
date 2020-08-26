import React, { useState, useEffect, MouseEventHandler } from 'react';
import { Product } from '../interfaces';
import { GlobalStyle, ProductImg } from '../styles';
import { match } from 'react-router-dom';
import { dummyProducts } from '../../../dummyProducts';
import { MainHeader } from '../mainHeader';
import styled from 'styled-components';
import { ProductPageMainImg } from './productPageMainImg';
import { ProductPageImagesList } from './productPageImagesList'

import { ProductPageMain, ProductTitle, Preview, Purchasing, AddToCartButton } from './styles';


interface Params {
  id: string | undefined;
}

interface Props {
  match: match<Params>;
}

export const ProductPage: React.FC<Props> = ({ match: {params: { id }} }) => {
  const [product, setProduct] = useState<Product>();
  const [featuredImg, setFeaturedImg] = useState<string>();

  const imgMouseOverHandler: MouseEventHandler = (e) => {
    const element = e.target;
    const url = element.src;
    setFeaturedImg(url);
  }

  useEffect(() => {
    for (let listing of dummyProducts) {
      if (listing.id === Number(id)) {
        setProduct(listing);
        break;
      }
    }
  }, []);

  if (!product) {
    return <h1>LOADING</h1>
  } else {
    return (
      <>
        <GlobalStyle />
        <MainHeader />
        <ProductPageMain>
          <Preview>
            <ProductPageImagesList imgMouseOverHandler={imgMouseOverHandler} images={product.images} featuredImg={featuredImg || product.imageMainUrl} />
            <ProductPageMainImg url={featuredImg || product.imageMainUrl} />
          </Preview>
          <Purchasing>
            <ProductTitle>{product.title}</ProductTitle>
            <h2 style={{ display: 'inline', paddingRight: '5px' }}>
              ${product.price}</h2>
            <h4 style={{ color: 'gray', display: 'inline' }}>
              + {product.shipping} shipping
            </h4>
            <AddToCartButton>
              Add to Cart
            </AddToCartButton>
          </Purchasing>
        </ProductPageMain>
      </>

    );
  }
}