"use client";

import { useFormState } from "react-dom";
import { createTopic } from "@/server";
import { FormButton } from "@/components";

export default function TopicCreateForm() {
  const [formState, action] = useFormState(createTopic, {
    fieldErros: {},
  });

  return (
    <>
      <label className="btn btn-primary" htmlFor="modal-1">
        New Topic
      </label>
      <input className="modal-state" id="modal-1" type="checkbox" />
      <div className="modal">
        <label className="modal-overlay" htmlFor="modal-1"></label>
        <div className="modal-content flex w-80 flex-col gap-5">
          <label
            htmlFor="modal-1"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">New Topic</h2>
          <form
            action={action}
            className="mx-auto flex w-full max-w-sm flex-col gap-6"
          >
            <div className="form-group">
              <div className="form-field">
                <label className="form-label">Name</label>
                <input
                  name="name"
                  placeholder="Name"
                  type="text"
                  className={`input max-w-full ${!!formState.fieldErros.name ? "input-error" : ""}`}
                />
                {!!formState.fieldErros.name && (
                  <label className="form-label">
                    <span className="form-label-alt text-error">
                      {formState.fieldErros.name?.join(", ")}
                    </span>
                  </label>
                )}
              </div>
              <div className="form-field">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className={`textarea max-w-full ${!!formState.fieldErros.description ? "textarea-error" : ""}`}
                  placeholder="Describe your topic!"
                />
                {!!formState.fieldErros.description && (
                  <label className="form-label">
                    <span className="form-label-alt text-error">
                      {formState.fieldErros.description?.join(", ")}
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
