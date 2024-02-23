import { useEffect, useState } from 'react';

import style from '../styles/snackbar.module.scss';

export interface SnackBarProps {
  message: string;
  id: string;
}

const SnackBar = ({ message, id }: SnackBarProps) => {
  const [active, setActive] = useState(false);
  const [, setTimer] = useState(0);

  // allow animation to slide up from the bottom of view point
  useEffect(() => {
    const t = setTimeout(() => setActive(true), 50);
    return () => clearTimeout(t);
  }, [id]);

  useEffect(() => {
    const timerDeactivate = window.setTimeout(() => setActive(false), 2000);

    setTimer(timerDeactivate);

    return () => clearTimeout(timerDeactivate);
  }, [id]);

  const classNames = [style.message, active ? style.open : ''].join(' ');
  return (
    <div id={`snack-${id}`} className={classNames}>
      {message}
    </div>
  );
};

export default SnackBar;
