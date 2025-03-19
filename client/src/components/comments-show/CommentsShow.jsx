export default function CommentsShow({ comments }) {
  return (
    <div className="details-comments">
      <h2>Comments:</h2>

      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment._id} className="comment">
              <p>
                {comment.email}: {comment.comment}.
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-comment">No comments.</p>
      )}
    </div>
  );
}
