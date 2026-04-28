import AnimeList from "../components/AnimeList";
import Hero from "../components/Hero";
import Header from "../components/Header";

function Home() {
  return (
    <>
      <Header isHome={true} />
      <Hero />
      <AnimeList />
    </>
  );
}

export default Home;
