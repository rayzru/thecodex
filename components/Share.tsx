import { PropsWithChildren } from 'react';
import { useSnackbarContext } from 'components/SnackbarProvider';

import Link from './Link';

import style from '../styles/share.module.scss';

interface Props {
  className?: string;
  locale?: string;
  message?: string;
  url: string;
}

const Share: React.FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  message = '',
  locale = '',
  className,
  url = '',
}) => {
  const { openSnackbar } = useSnackbarContext();

  return (
    <Link
      className={[className, style.link].join(' ')}
      key={'copy'}
      href="#"
      locale={locale}
      onClick={(e) => {
        // console.log(e);
        e.preventDefault();
        openSnackbar(message);
        navigator.clipboard.writeText(url);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={style.icon}
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
      </svg>
      {children}
    </Link>
  );
};

export default Share;
