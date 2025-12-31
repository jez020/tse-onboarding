import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTask, type Task } from "src/api/tasks";
import { Button, Page, TaskForm, UserTag } from "src/components";
import styles from "src/pages/TaskDetail.module.css";

export function TaskDetail() {
  const [task, setTask] = useState<Task | undefined>(undefined);
  const [isEditing, setEditing] = useState<boolean>(false);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getTask(params.id)
        .then((result) => {
          if (result.success) setTask(result.data);
          else {
            console.error(`Failed to fetch task:${result.error}`);
            setTask(undefined);
          }
        })
        .catch((error) => {
          console.error(`An unexpected error occurred: ${error}`);
          setTask(undefined);
        });
    }
  }, [params.id]);

  const formatCreated = (d?: Date) => {
    if (!d) return "";
    const date = d.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const time = d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
    return `${date} at ${time}`;
  };

  return (
    <Page>
      <title>Task details | TSE Todos</title>
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          Back to home
        </Link>
        <div className={styles.topRow}>
          <div className={styles.header}>
            <div className={styles.titleArea}>
              <h2 className={styles.title}>{task?.title || "Task title"}</h2>
              {task && task.description ? (
                <div className={styles.description}>{task.description}</div>
              ) : (
                <div className={styles.description}>Task description</div>
              )}
            </div>
            {task && (
              <Button
                kind="primary"
                className={styles.editButton}
                label="Edit task"
                onClick={() => {
                  setEditing(true);
                }}
              />
            )}
          </div>
        </div>

        {isEditing ? (
          <TaskForm
            task={task}
            mode="edit"
            onSubmit={(updatedTask) => {
              setTask(updatedTask);
              setEditing(false);
            }}
          />
        ) : task ? (
          <div>
            <div className={styles.metaList}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Assignee</span>
                <UserTag user={task.assignee} />
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Status</span>
                <span className={styles.metaValue}>{task.isChecked ? "Done" : "Incomplete"}</span>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Date created</span>
                <span className={styles.metaValue}>{formatCreated(task.dateCreated)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.centered}>
            <p>Task not found.</p>
            <p>
              <Link to="/">Return to Home</Link>
            </p>
          </div>
        )}
      </div>
    </Page>
  );
}
