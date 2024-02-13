import { PostCreateForm, PostList } from "@/components";
import { db } from "@/db";
import { fetchPostByTopicSlug } from "@/db/queries/posts";
import { paths } from "@/utils/paths";
import Link from "next/link";

export interface TopicShowPageProps {
  params: {
    slug: string;
  };
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = params;
  const topic = await db.topic.findUnique({ where: { slug } });

  if (!topic) return null;

  return (
    <>
      <section className="px-8 py-8 lg:px-12">
        <div className="breadcrumbs mb-4 flex-wrap overflow-hidden text-sm">
          <ul>
            <li>
              <Link href={paths.home()}>Home</Link>
            </li>
            <li>
              <Link href={paths.topicShow(slug)}>{slug}</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col-reverse items-center gap-4 lg:flex-row lg:items-start">
          <div className="lg:w-3/4">
            <PostList fetchData={() => fetchPostByTopicSlug(slug)} />
          </div>
          <div className="card w-full max-w-full lg:w-1/4">
            <div className="card-body">
              <h3 className="card-header">{slug}</h3>
              <p className="text-content2">{topic?.description}</p>
              <div className="divider my-0.5"></div>
              <div className="card-footer">
                <PostCreateForm topic={topic} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
