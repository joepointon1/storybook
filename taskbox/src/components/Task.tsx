import React from "react";

export type TaskProps = {
  task: TaskType
  onArchiveTask: (id: string) => void;
  onPinTask: (id: string) => void;
};

export type TaskType = {
  id: string;
  title: string;
  state: TASK_STATE;
};

export enum TASK_STATE {
  TASK_INBOX = "TASK_INBOX",
  TASK_PINNED = "TASK_PINNED",
  TASK_ARCHIVED = "TASK_ARCHIVED",
}

export default function Task({
  task: { id, title, state },
  onArchiveTask,
  onPinTask,
}: TaskProps) {
  return (
    <div className="list-item">
      <label
        htmlFor={`archiveTask-${id}`}
        aria-label={`archiveTask-${id}`}
        className="checkbox"
      >
        <input
          type="checkbox"
          disabled={true}
          name="checked"
          id={`archiveTask-${id}`}
          checked={state === "TASK_ARCHIVED"}
        />
        <span
          className="checkbox-custom"
          onClick={() => {
            onArchiveTask(id);
          }}
        />
      </label>

      <label htmlFor={`title-${id}`} aria-label={title} className="title">
        <input
          type="text"
          value={title}
          readOnly={true}
          name="title"
          id={`title-${id}`}
          placeholder="Input title"
        />
      </label>

      {state !== "TASK_ARCHIVED" && (
        <button
          className="pin-button"
          onClick={() => onPinTask(id)}
          id={`pinTask-${id}`}
          aria-label={`pinTask-${id}`}
          key={`pinTask-${id}`}
        >
          <span className={`icon-star`} />
        </button>
      )}
    </div>
  );
}
