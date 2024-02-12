"use client";

import { useFormState } from "react-dom";
import { createTopic } from "@/server";
import FormButton from "./form-button";

export default function TopicCreateForm() {
  const [formState, action] = useFormState(createTopic, {
    fieldErros: {},
  });

  return (
    <div className="popover w-full">
      <button
        className="btn btn-solid-primary popover-trigger mx-auto block"
        tabIndex={0}
      >
        New Topic
      </button>
      <div className="popover-content popover-left-bottom w-80" tabIndex={0}>
        <div className="popover-arrow"></div>
        <form
          action={action}
          className="mx-auto flex w-full max-w-sm flex-col gap-6 p-4"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold ">Create Topic</h2>
          </div>
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
              <FormButton>Submit</FormButton>
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
  );
}
