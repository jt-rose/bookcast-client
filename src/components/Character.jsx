import "../styles/character.css";
import { FaHeart, FaHeartBroken } from 'react-icons/fa';

const Character = (props) => {
  const { name, actor, description, photo_url, votes, comments } =
    props.character;

  console.log(votes);
  console.log(comments);
  const totalVotes = votes
    .map((vote) => (vote.like ? 1 : -1))
    .reduce((x, y) => x + y, 0);
  return (
    <div className="charactercard">
      <img src={photo_url} alt={actor + "-photo"} />
      <h1>{name}</h1>
      <h3>Played by <span>{actor}</span></h3><br />
      <FaHeart /> <FaHeartBroken />
      <h4><span>Description: </span>{description}</h4>
      <h3>Votes: {totalVotes}</h3>
      <div className="comments">
      <h3>Comments:</h3>
      {comments.map((comment) => (
        <div className="comment">
          <span>{comment.user.username}:</span> {comment.comment}
        </div>
      ))}
      <input className="forms" placeholder="...share a comment"></input>
      </div>
      <input type="checkbox" name="like" id="like" />
    </div>
  );
};

export default Character;
