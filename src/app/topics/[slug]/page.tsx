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
      <section className="flex items-start gap-4 p-12">
        <div className="w-3/4">
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link href={paths.home()}>Home</Link>
              </li>
              <li>
                <Link href={paths.topicShow(slug)}>{slug}</Link>
              </li>
            </ul>
          </div>
          <PostList fetchData={() => fetchPostByTopicSlug(slug)} />
        </div>
        <div className="card w-1/4">
          <div className="card-body">
            <h3 className="card-header">{slug}</h3>
            <p className="text-content2">{topic?.description}</p>
            <div className="divider"></div>
            <div className="card-footer">
              <PostCreateForm topic={topic} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
