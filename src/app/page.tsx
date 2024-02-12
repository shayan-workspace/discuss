import { PostList, TopicCreateForm } from "@/components";

export default function HomePage() {
  return (
    <>
      <section className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3">
          <PostList />
        </div>
        <div className="col-span-1">
          <TopicCreateForm />
        </div>
      </section>
    </>
  );
}
