import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import s from './NotFoundComponent.module.scss';

const NotFoundComponent = () => {
  const styles = {
    textDecoration: 'none',
    marginTop: '60px',
  };

  return (
    <div className={s.wrapper}>
      <div className={s.error}>404</div>
      <div className={s.title}> Page not Found</div>
      <Link style={styles} to="/">
        <Button variant="contained" color="primary">
          go to home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundComponent;
