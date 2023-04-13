import {globalStyles} from "@/styles/global";
import type {AppProps} from "next/app";

globalStyles();
import logoImg from "../assets/img/logo.svg";
import {Container, Header} from "@/styles/pages/app";
export default function App({Component, pageProps}: AppProps) {
  return (
    <Container>
      <Header>
        <div>
          <img src={logoImg.src} alt="" />
          <span>Shop ignite</span>
        </div>
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
