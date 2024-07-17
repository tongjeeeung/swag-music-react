import { FC } from 'react';
import { AppHeaderUI } from '../ui';
import styles from './app-header.module.css'
import { useDispatch, useSelector } from '../../services/store';
import { getState, setThreme } from '../../services/currentSlice';
import { getUser, logOutThunk } from '../../services/userSlice';

export const AppHeader: FC = () => {
  const dispatch = useDispatch();
  const current = useSelector(getState);
  const user = useSelector(getUser);

  if (current.threme === 'default') {
    document.querySelector('body')?.classList.remove(styles.dark);
    document.querySelector('body')?.classList.remove(styles.light);
  }
  else if (current.threme === styles.light) {
    document.querySelector('body')?.classList.add(styles.light);
  }
  else {
    document.querySelector('body')?.classList.add(styles.dark);
  }

  function changeThreme() {
    if(document.querySelector('body')?.classList.value == '') {
      dispatch(setThreme(styles.light));
    }
    else if(document.querySelector('body')?.classList.value == styles.light) {
      document.querySelector('body')?.classList.remove(styles.light);
      dispatch(setThreme(styles.dark));
    }
    else {
      document.querySelector('body')?.classList.remove(styles.dark);
      dispatch(setThreme('default'));
    }
  }

  function logOutHandle() {
    if (user) {
      dispatch(logOutThunk());
    }
  }

  return (<AppHeaderUI userName={user ? user.name : ''} userAvatar={user ? user.avatar : ''} logOutHandle={user ? logOutHandle : () => {}} thremeVoid={changeThreme}/>)
}