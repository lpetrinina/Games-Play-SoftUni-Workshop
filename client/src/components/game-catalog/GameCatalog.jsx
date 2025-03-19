import GameCatalogItem from "./game-catalog-item/GameGatalogItem";
import { useAllGames } from "../../api/gameAPI";

export default function GameCatalog() {
  const { games } = useAllGames();

  console.log(games);

  return (
    <section id="catalog-page">
      <h1>All Games</h1>

      {games.length > 0 ? (
        games.map((game) => <GameCatalogItem key={game._id} {...game} />)
      ) : (
        <h3 className="no-articles">No articles yet</h3>
      )}
    </section>
  );
}
