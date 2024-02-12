import Link from "next/link";
import { db } from "@/db";
import { paths } from "@/utils/paths";

export default async function TopicList() {
  const topics = await db.topic.findMany();

  return (
    <ul className="flex flex-wrap gap-2">
      {topics.map((topic) => (
        <li key={topic.id} className="badge badge-flat-warning">
          <Link href={paths.topicShow(topic.slug)}>{topic.slug}</Link>
        </li>
      ))}
    </ul>
  );
}
