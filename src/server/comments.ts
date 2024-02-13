"use server";

import type { Comment, Post, Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z as zod } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/utils/paths";

const createCommentScheme = zod.object({
  message: zod.string().min(10),
});

export interface CreateCommentFormStateType {
  fieldErros: {
    message?: string[];
  };
  formErros?: string[];
  success?: boolean;
}

export async function createComment(
  { topic, post, parent }: { topic: Topic; post: Post; parent?: Comment },
  _formState: CreateCommentFormStateType,
  formData: FormData,
): Promise<CreateCommentFormStateType> {
  const result = createCommentScheme.safeParse({
    message: formData.get("message"),
  });

  if (!result.success) {
    return { fieldErros: result.error.flatten().fieldErrors };
  }

  const session = await auth();

  if (!session?.user) {
    return {
      fieldErros: {},
      formErros: ["You must be signed in to create a comment."],
    };
  }

  let comment: Comment;

  try {
    comment = await db.comment.create({
      data: {
        message: result.data.message,
        parentId: parent?.id,
        postId: post.id,
        userId: session.user.id!,
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
  revalidatePath(paths.postShow(topic.slug, comment.id));
  return { fieldErros: {}, success: true };
}
