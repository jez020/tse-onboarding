import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTask, type Task } from "src/api/tasks";
import { Button, Page } from "src/components";
import styles from "src/pages/TaskDetail.module.css";

export function TaskDetail() {
  const [task, setTask] = useState<Task | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();

  useEffect(() => {
    setLoading(true);
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
        })
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, [params.id]);

  const assigneeInitials = (name?: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((s) => s[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

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
            <Link to={params.id ? `/task/${params.id}/edit` : "/"}>
              <Button kind="primary" className={styles.editButton} label="Edit task" />
            </Link>
          </div>
        </div>

        {loading ? (
          <div className={styles.centered}>Loading task…</div>
        ) : task ? (
          <div>
            <div className={styles.metaList}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Assignee</span>
                <span className={styles.metaValue}>
                  {task.assignee ? (
                    <>
                      <span className={styles.avatar}>{assigneeInitials(task.assignee.name)}</span>
                      {task.assignee.name}
                    </>
                  ) : (
                    "Unassigned"
                  )}
                </span>
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
