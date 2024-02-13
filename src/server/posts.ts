"use server";

import type { Post, Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z as zod } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/utils/paths";

const createPostScheme = zod.object({
  title: zod.string().min(3),
  content: zod.string().min(10),
});

export interface CreatePostFormStateType {
  fieldErros: {
    title?: string[];
    content?: string[];
  };
  formErros?: string[];
}

export async function createPost(
  topic: Topic,
  _formState: CreatePostFormStateType,
  formData: FormData,
): Promise<CreatePostFormStateType> {
  const result = createPostScheme.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return { fieldErros: result.error.flatten().fieldErrors };
  }

  const session = await auth();

  if (!session?.user) {
    return {
      fieldErros: {},
      formErros: ["You must be signed in to create a post."],
    };
  }

  let post: Post;

  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id!,
        topicId: topic.id,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return { fieldErros: {}, formErros: [error.message] };
    } else {
      return { fieldErros: {}, formErros: ["Something went wrong."] };
    }
  }

  revalidatePath(paths.home());
  revalidatePath(paths.topicShow(topic.slug));
  redirect(paths.postShow(topic.slug, post.id));
}
