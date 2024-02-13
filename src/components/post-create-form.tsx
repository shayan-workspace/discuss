"use client";

import type { Topic } from "@prisma/client";
import { useFormState } from "react-dom";
import { createPost } from "@/server";
import { FormButton } from "@/components";

export interface PostCreateFormProps {
  topic: Topic;
}

export default function PostCreateForm({ topic }: PostCreateFormProps) {
  const [formState, action] = useFormState(createPost.bind(null, topic), {
    fieldErros: {},
  });

  return (
    <>
      <label className="btn btn-primary" htmlFor="post-create-form-modal">
        New Post
      </label>
      <input
        className="modal-state"
        id="post-create-form-modal"
        type="checkbox"
      />
      <div className="modal">
        <label
          className="modal-overlay"
          htmlFor="post-create-form-modal"
        ></label>
        <div className="modal-content flex w-80 flex-col gap-5">
          <label
            htmlFor="post-create-form-modal"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">New Post</h2>
          <form
            action={action}
            className="mx-auto flex w-full max-w-sm flex-col gap-6"
          >
            <div className="form-group">
              <div className="form-field">
                <label className="form-label">Title</label>
                <input
                  name="title"
                  placeholder="Title"
                  type="text"
                  className={`input max-w-full ${!!formState.fieldErros.title ? "input-error" : ""}`}
                />
                {!!formState.fieldErros.title && (
                  <label className="form-label">
                    <span className="form-label-alt text-error">
                      {formState.fieldErros.title?.join(", ")}
                    </span>
                  </label>
                )}
              </div>
              <div className="form-field">
                <label className="form-label">Content</label>
                <textarea
                  name="content"
                  className={`textarea max-w-full ${!!formState.fieldErros.content ? "textarea-error" : ""}`}
                  placeholder="Content"
                />
                {!!formState.fieldErros.content && (
                  <label className="form-label">
                    <span className="form-label-alt text-error">
                      {formState.fieldErros.content?.join(", ")}
                    </span>
                  </label>
                )}
              </div>
              <div className="form-field pt-5">
                <FormButton className="w-full">Submit</FormButton>
              </div>
              {!!formState.formErros && (
                <label className="form-label">
                  <span className="form-label-alt text-error">
                    {formState.formErros?.join(", ")}
                  </span>
                </label>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
