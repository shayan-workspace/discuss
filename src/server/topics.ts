"use server";

import type { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z as zod } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/utils/paths";

const createTopicScheme = zod.object({
  name: zod
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters or dashes without spaces",
    }),
  description: zod.string().min(10),
});
``;
export interface CreateTopicFormStateType {
  fieldErros: {
    name?: string[];
    description?: string[];
  };
  formErros?: string[];
}

export async function createTopic(
  formState: CreateTopicFormStateType,
  formData: FormData,
): Promise<CreateTopicFormStateType> {
  const result = createTopicScheme.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    return { fieldErros: result.error.flatten().fieldErrors };
  }

  const session = await auth();
  if (!session?.user) {
    return {
      fieldErros: {},
      formErros: ["You must be signed in to create a topic."],
    };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return { fieldErros: {}, formErros: [error.message] };
    } else {
      return { fieldErros: {}, formErros: ["Something went wrong."] };
    }
  }

  revalidatePath("/");
  redirect(paths.topicShow(topic.slug));
}
