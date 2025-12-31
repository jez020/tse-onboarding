import React from "react";
import styles from "src/components/UserTag.module.css";

import type { User } from "src/api/users";

export type UserTagProps = {
  user: User | undefined;
};

export function UserTag({ user }: UserTagProps) {
  if (user === undefined || user === null) {
    return <div className={styles.usertag}>Not Assigned</div>;
  }

  return (
    <div className={styles.usertag}>
      <img
        src={user.profilePictureURL === undefined ? "/userDefault.svg" : user.profilePictureURL}
        alt={`${user.name}'s profile picture`}
        className={styles.usertagimage}
      />
      <span className={styles.usertagname}>{user.name}</span>
    </div>
  );
}
