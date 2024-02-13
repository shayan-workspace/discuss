import { Post, Topic } from "@prisma/client";
import { CommentCreateForm, CommentList } from ".";

export interface PostShowProps {
  topic: Topic;
  post: Post;
}

export default async function PostShow({ topic, post }: PostShowProps) {
  return (
    <div className="card my-4 w-full max-w-full">
      <div className="card-body">
        <h2 className="card-header">{post.title}</h2>
        <p className="text-content2">{post.content}</p>
        <div className="card-footer flex-col items-stretch gap-4">
          <CommentCreateForm initOpen={true} topic={topic} post={post} />
          <CommentList post={post} />
        </div>
      </div>
    </div>
  );
}
