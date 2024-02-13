"use client";

import { useFormState } from "react-dom";
import { createComment } from "@/server";
import { FormButton } from "@/components";
import { Comment, Post, Topic } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

export interface CommentCreateFormProps {
  initOpen?: boolean;
  topic: Topic;
  post: Post;
  parent?: Comment;
}

export default function CommentCreateForm({
  initOpen,
  topic,
  post,
  parent,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(initOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action] = useFormState(
    createComment.bind(null, { topic, post, parent }),
    {
      fieldErros: {},
    },
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!initOpen) {
        setOpen(false);
      }
    }
  }, [formState.success, initOpen]);

  const form = (
    <form action={action}>
      <div className="form-group">
        <div className="form-field">
          <textarea
            name="message"
            className={`textarea max-w-full ${!!formState.fieldErros.message ? "textarea-error" : ""}`}
            placeholder="Message"
          />
          {!!formState.fieldErros.message && (
            <label className="form-label">
              <span className="form-label-alt text-error">
                {formState.fieldErros.message?.join(", ")}
              </span>
            </label>
          )}
        </div>
        <div className="form-field">
          <FormButton className="max-w-fit">Submit</FormButton>
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
  );

  return (
    <div className="w-full">
      <button onClick={() => setOpen(!open)} className="btn btn-outline mb-2">
        Reply
      </button>
      {open && form}
    </div>
  );
}
