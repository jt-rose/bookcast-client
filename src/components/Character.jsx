const Character = (props) => {
  const { name, actor, description, photo_url, votes_and_comments } =
    props.character;

  console.log(votes_and_comments);
  const totalVotes = votes_and_comments
    .map((vnc) => {
      switch (vnc.like) {
        case true:
          return 1;
        case null:
          return 0;
        case false:
          return -1;
        default:
          return 0;
      }
    })
    .reduce((x, y) => x + y);
  return (
    <div>
      <img src={photo_url} alt={actor + "-photo"} />
      <h1>{name}</h1>
      <h3>Played by {actor}</h3>
      <h4>Description: {description}</h4>
      <h3>Votes: {totalVotes}</h3>
      <h3>Comments:</h3>
      {votes_and_comments.map((vnc) => (
        <div>
          {vnc.user.username}: {vnc.comment}
        </div>
      ))}
    </div>
  );
};

export default Character;
