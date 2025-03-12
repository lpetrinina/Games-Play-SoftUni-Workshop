import { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import GameCatalogItem from "./game-catalog-item/GameGatalogItem";

export default function GameCatalog() {
  const [games, setGames] = useState([]);

  console.log(games);

  useEffect(() => {
    gameService.getAll().then((result) => {
      setGames(result);
    });
  }, []);

  return (
    <section id="catalog-page">
      <h1>All Games</h1>

      {games.map((game) => (
        <GameCatalogItem key={game._id} {...game} />
      ))}
      {/* <!-- Display div: with information about every game (if any) --> */}

      {/* <!-- Display paragraph: If there is no games  --> */}
      <h3 className="no-articles">No articles yet</h3>
    </section>
  );
}
