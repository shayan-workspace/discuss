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
    <div className="mb-1 mt-2 border p-4">
      <div className="flex gap-3">
        <Image
          src={comment.user.image || ""}
          alt="user image"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500">
            {comment.user.name}
          </p>
          <p className="text-gray-900">{comment.message}</p>

          <CommentCreateForm topic={topic} post={post} parent={comment} />
        </div>
      </div>
      <div className="pl-4">
        {childComments.map((child) => {
          return (
            <CommentShow
              key={child.id}
              topic={topic}
              post={post}
              commentId={child.id}
            />
          );
        })}
      </div>
    </div>
  );
}
