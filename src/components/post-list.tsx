import Link from "next/link";
import { paths } from "@/utils/paths";
import type { EnrichedPostType } from "@/db/queries/posts";

export interface PostListProps {
  fetchData: () => Promise<EnrichedPostType[]>;
}

export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();

  return (
    <ul className="flex flex-wrap gap-4">
      {posts.map((post) => {
        return (
          <li key={post.id}>
            <Link href={paths.postShow(post.topic.slug, post.id)}>
              <div className="card lg:min-w-96">
                <div className="card-body">
                  <h2 className="card-header">{post.title}</h2>

                  <div className="card-footer gap-4 text-sm">
                    <span>By {post.user.name}</span>
                    <span>{post._count.comments} Comments</span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
