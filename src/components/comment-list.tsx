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
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {topLevelComments.map((comment) => {
        return (
          <CommentShow
            key={comment.id}
            topic={topic!}
            post={post}
            commentId={comment.id}
          />
        );
      })}
    </div>
  );
}
