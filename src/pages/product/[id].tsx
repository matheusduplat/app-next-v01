import {useRouter} from "next/router";

export default function Product() {
  const {query} = useRouter();

  return <h1>produtos: {query.id}</h1>;
}
