import {stripe} from "@/lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import axios from "axios";
import {GetStaticPaths, GetStaticProps} from "next";
import Head from "next/head";
import Image from "next/image";
import {useRouter} from "next/router";
import {useState} from "react";
import Stripe from "stripe";

interface ProductPros {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({product}: ProductPros) {
  const {isFallback} = useRouter();
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  if (isFallback) {
    return <h1>Loading...</h1>;
  }

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      });
      const {checkoutUrl} = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      // conectar com uma ferramenta de obsevabilidade (datadog / sentry)
      alert("Falha ao redirecioar ao checkout");
      setIsCreatingCheckoutSession(false);
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Shop Tudo tem</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>
          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyProduct}
          >
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{params: {id: "prod_NibyrVqWfu5YQw"}}],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({
  params,
}) => {
  const productId = String(params?.id);

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });
  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-br", {
          style: "currency",
          currency: "BRL",
        }).format((price.unit_amount as number) / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1,
  };
};
