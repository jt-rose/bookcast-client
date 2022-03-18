const Character = (props) => {
  const { name, actor, description, photo_url, votes, comments } =
    props.character;

  console.log(votes);
  console.log(comments);
  const totalVotes = votes
    .map((vote) => (vote.like ? 1 : -1))
    .reduce((x, y) => x + y, 0);
  return (
    <div>
      <img src={photo_url} alt={actor + "-photo"} />
      <h1>{name}</h1>
      <h3>Played by {actor}</h3>
      <h4>Description: {description}</h4>
      <h3>Votes: {totalVotes}</h3>
      <h3>Comments:</h3>
      {comments.map((comment) => (
        <div>
          {comment.user.username}: {comment.comment}
        </div>
      ))}
      <input placeholder="...share a comment"></input>
      <input type="checkbox" name="like" id="like" />
    </div>
  );
};

export default Character;
