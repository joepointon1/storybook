import React from "react";
import Task, { TASK_STATE, TaskType } from "./Task";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredTasks,
  selectStatus,
  updateTaskState,
} from "../lib/store";

// export type TaskListProps = {
//   loading: boolean;
//   tasks: TaskType[];
//   onArchiveTask: (id: string) => void;
//   onPinTask: (id: string) => void;
// };

export default function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectFilteredTasks);
  const status = useSelector(selectStatus);

  const pinTask = (value) => {
    dispatch(
      updateTaskState({ id: value, newTaskState: TASK_STATE.TASK_PINNED })
    );
  };
  const archiveTask = (value) => {
    dispatch(
      updateTaskState({ id: value, newTaskState: TASK_STATE.TASK_ARCHIVED })
    );
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (status === "loading") {
    return (
      <div className="list-items" data-testid="loading" key={"loading"}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
      <div className="list-items" key={"empty"} data-testid="empty">
        <div className="wrapper-message">
          <span className="wrapper-message" />
          <p className="title-message">You have no tasks</p>
          <p className="subtitle-message">sit back and relax</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-items">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={(task) => pinTask(task)}
          onArchiveTask={(task) => archiveTask(task)}
        />
      ))}
    </div>
  );
}
