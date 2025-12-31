import { useState } from "react"; // update this line
import { Link } from "react-router";
import { updateTask } from "src/api/tasks";
import { CheckButton, UserTag } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task: initialTask }: TaskItemProps) {
  // update the previous line and add the following
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleToggleCheck = async () => {
    setLoading(true);
    try {
      const result = await updateTask({
        _id: task._id,
        title: task.title,
        description: task.description || "",
        isChecked: !task.isChecked,
        assignee: task.assignee?._id,
        dateCreated: task.dateCreated,
      });
      if (result.success) {
        setTask(result.data);
      } else {
        console.error(`Failed to update task: ${result.error}`);
      }
    } catch (err) {
      console.error("Failed to update task:", err);
    } finally {
      setLoading(false);
      // window.location.reload();
    }
  };

  return (
    <div className={styles.item}>
      <CheckButton
        checked={task.isChecked}
        onPress={() => {
          return void handleToggleCheck();
        }}
        disabled={isLoading}
      />
      <div
        className={
          task.isChecked ? `${styles.textContainer} ${styles.checked}` : styles.textContainer
        }
      >
        <Link to={`/task/${task._id}`} className={styles.titleLink}>
          <span className={styles.title}>{task.title}</span>
        </Link>
        {task.description && <span>{task.description}</span>}
      </div>
      <UserTag user={task.assignee} />
    </div>
  );
}
