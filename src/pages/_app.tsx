import {globalStyles} from "@/styles/global";
import type {AppProps} from "next/app";

globalStyles();
import logoImg from "../assets/img/logo.svg";
import {Container, Header} from "@/styles/pages/app";

import Image from "next/image";

export default function App({Component, pageProps}: AppProps) {
  return (
    <Container>
      <Header>
        <div>
          <Image src={logoImg} alt="" />
          <span>Shop Tudo tem (by rocketseat)</span>
        </div>
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
