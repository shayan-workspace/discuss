import { PostCreateForm } from "@/components";
import PostShow from "@/components/post-show";
import { db } from "@/db";
import { paths } from "@/utils/paths";
import Link from "next/link";
import { notFound } from "next/navigation";

export interface PostShowPageProps {
  params: {
    slug: string;
    id: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, id } = params;
  const topic = await db.topic.findUnique({ where: { slug } });
  const post = await db.post.findUnique({ where: { id } });

  if (!topic || !post) {
    notFound();
  }

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
                <Link href={paths.topicShow(topic.slug)}>{topic.slug}</Link>
              </li>
              <li>
                <Link href={paths.postShow(topic.slug, post.id)}>
                  {post.title}
                </Link>
              </li>
            </ul>
          </div>
          <PostShow topic={topic} post={post} />
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
