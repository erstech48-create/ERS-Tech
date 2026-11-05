import HomePage from "../pages/home/index";

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
