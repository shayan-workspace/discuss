import { CommentShow } from "@/components";
import { db } from "@/db";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import { Post } from "@prisma/client";

interface CommentListProps {
  post: Post;
}

export default async function CommentList({ post }: CommentListProps) {
  const topic = await db.topic.findUnique({ where: { id: post.topicId } });
  const comments = await fetchCommentsByPostId(post.id);

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null,
  );

  return (
    <ul>
      {topLevelComments.map((comment) => {
        return (
          <li key={comment.id}>
            <CommentShow topic={topic!} post={post} commentId={comment.id} />
          </li>
        );
      })}
    </ul>
  );
}
