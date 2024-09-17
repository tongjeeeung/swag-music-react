import { FC, useState } from "react";
import styles from './fotgot.module.css'
import { Link } from "react-router-dom";
import { ForgotUIProps } from "./type";

export const ForgotUI: FC<ForgotUIProps> = ({email, setEmail, setPassword, password, handleSubmit}) => {
  const [localErrors, setLocalErrors] = useState<{ email?: string; password?: string }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? '' : 'Некорректный адрес электронной почты';
  };

  const validatePassword = (password: string) => {
    return password.length >= 6 ? '' : 'Пароль должен быть не менее 6 символов';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setLocalErrors((prevErrors) => ({ ...prevErrors, email: validateEmail(newEmail) }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setLocalErrors((prevErrors) => ({ ...prevErrors, password: validatePassword(newPassword) }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setLocalErrors({ email: emailError, password: passwordError });
    } else {
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.forgotPassword}>
      <h2 className={styles.title}>Password reset</h2>
      <form className={styles.form} name="forgotPassword" onSubmit={handleFormSubmit}>
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          style={localErrors.email ? { margin: '0' } : {}}
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        {localErrors.email && <p className={styles.error}>{localErrors.email}</p>}

        <label className={styles.label}>New password</label>
        <input
          className={styles.input}
          style={localErrors.password ? { margin: '0' } : {}}
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {localErrors.password && <p className={styles.error}>{localErrors.password}</p>}

        <button className={styles.button} type="submit">Send</button>
        <Link to={'/swag-music-react/login'} className={styles.button}>Login</Link>
      </form>
    </div>
  );
};