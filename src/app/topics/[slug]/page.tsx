import { PostCreateForm, TopicList } from "@/components";
import { db } from "@/db";

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
      <section className="grid grid-cols-4 gap-4 p-12">
        <div className="col-span-3">
          <h2 className="mb-2 text-2xl font-bold">{slug}</h2>
        </div>
        <div className="card col-span-1">
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
