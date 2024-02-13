import { PostList, TopicCreateForm, TopicList } from "@/components";
import { fetchTopPosts } from "@/db/queries/posts";

export default function HomePage() {
  return (
    <>
      <section className="flex flex-col-reverse items-center gap-4 px-12 py-8 lg:flex-row lg:items-start">
        <div className="lg:w-3/4">
          <h2 className="m-2 text-xl font-semibold">Top Posts</h2>
          <PostList fetchData={fetchTopPosts} />
        </div>
        <div className="card w-full max-w-full lg:w-1/4">
          <div className="card-body">
            <h3 className="card-header">Topics</h3>
            <TopicList />
            <div className="divider my-0.5"></div>
            <div className="card-footer">
              <TopicCreateForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
