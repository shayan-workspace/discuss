import { PostList, TopicCreateForm, TopicList } from "@/components";
import { fetchTopPosts } from "@/db/queries/posts";

export default function HomePage() {
  return (
    <>
      <section className="grid grid-cols-4 gap-4 p-12">
        <div className="col-span-3">
          <h2 className="m-2 text-xl font-semibold">Top Posts</h2>
          <PostList fetchData={fetchTopPosts} />
        </div>
        <div className="card col-span-1">
          <div className="card-body">
            <h3 className="card-header">Topics</h3>
            <TopicList />
            <div className="divider"></div>
            <div className="card-footer">
              <TopicCreateForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
