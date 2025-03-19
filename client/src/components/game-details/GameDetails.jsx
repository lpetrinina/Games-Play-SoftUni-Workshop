import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";

import gameService from "../../services/gameService";
import CommentsShow from "../comments-show/CommentsShow";
import CommentsCreate from "../comments-create/CommentsCreate";
import commentService from "../../services/commentService";
import { UserContext } from "../../contexts/UserContext";

export default function GameDetails() {
  const navigate = useNavigate();
  const { email } = useContext(UserContext);

  const { gameId } = useParams();

  const [game, setGame] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    gameService.getOne(gameId).then((result) => setGame(result));

    commentService.getAll(gameId).then((result) => setComments(result));
  }, [gameId]);

  const gemeDeleteClickHandler = async () => {
    const hasConfirmed = confirm(
      `Are you sure you want to delete ${game.title} game?`
    );

    if (!hasConfirmed) {
      return;
    }

    await gameService.delete(gameId);
    navigate("/games");
  };

  const commentsCreateHandler = (newComment) => {
    setComments((comments) => [...comments, newComment]);
  };

  return (
    <section id="game-details">
      <h1>Game Details</h1>
      <div className="info-section">
        <div className="game-header">
          <img className="game-img" src={game.imageUrl} />
          <h1>{game.title}</h1>
          <span className="levels">MaxLevel: {game.maxLevel}</span>
          <p className="type">{game.category}</p>
        </div>

        <p className="text">{game.summary}</p>

        {/* <!-- Bonus ( for Guests and Users ) --> */}
        <CommentsShow comments={comments} />

        {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
        <div className="buttons">
          <Link to={`/games/${gameId}/edit`} className="button">
            Edit
          </Link>

          <button onClick={gemeDeleteClickHandler} className="button">
            Delete
          </button>
        </div>
      </div>

      {/* <!-- Bonus -->
        <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
      <CommentsCreate
        email={email}
        gameId={gameId}
        onCreate={commentsCreateHandler}
      />
    </section>
  );
}
