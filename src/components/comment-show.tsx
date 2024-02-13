import Image from "next/image";
import { CommentCreateForm } from "@/components";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import { Post, Topic } from "@prisma/client";

interface CommentShowProps {
  topic: Topic;
  post: Post;
  commentId: string;
}

export default async function CommentShow({
  topic,
  post,
  commentId,
}: CommentShowProps) {
  const comments = await fetchCommentsByPostId(post.id);
  const comment = comments.find((item) => item.id === commentId);

  if (!comment) {
    return null;
  }

  const childComments = comments.filter((item) => item.parentId === commentId);

  return (
    <div className="card my-4 w-full max-w-full shadow-xl drop-shadow-xl">
      <div className="card-body pb-1">
        <div className="card-header justify-normal gap-4">
          <Image
            src={comment.user.image || ""}
            alt="user image"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />
          <h4>{comment.user.name}</h4>
        </div>
        <p className="text-content2">{comment.message}</p>

        <div className="card-footer flex-col items-stretch gap-4">
          <CommentCreateForm topic={topic} post={post} parent={comment} />
        </div>
        <div className="pl-4">
          {childComments.map((child) => {
            return (
              <CommentShow
                key={child.id}
                topic={topic}
                commentId={child.id}
                post={post}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
