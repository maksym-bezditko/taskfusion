import { CreateProjectForm } from '@/components/common/forms/CreateProjectForm';

import styles from './CreateProjectView.module.scss';

export const CreateProjectView = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Create new project</h1>

      <div className="contentWrapper">
        <CreateProjectForm />
      </div>
    </div>
  );
};
