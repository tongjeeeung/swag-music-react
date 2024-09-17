import { FC, useState } from "react";
import styles from './login.module.css';
import { LoginUIProps } from "./type";
import { Link } from "react-router-dom";

export const LoginUI: FC<LoginUIProps> = ({email, setEmail, handleSubmit, password, setPassword}) => {
  const [localErrors, setLocalErrors] = useState<{ email?: string; password?: string }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? '' : 'Invalid email address';
  };

  const validatePassword = (password: string) => {
    return password.length >= 6 ? '' : 'Password must be at least 6 characters';
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
    <div className={styles.login}>
      <h2 className={styles.title}>Authorization</h2>
      <form className={styles.form} name="login" onSubmit={handleFormSubmit}>
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

        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          style={localErrors.password ? { margin: '0' } : {}}
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {localErrors.password && <p className={styles.error}>{localErrors.password}</p>}

        <Link to={'/swag-music-react/forgot'} className={styles.forgot}>Forgot your password?</Link>
        <button className={styles.button} type="submit">Login</button>
        <Link to={'/swag-music-react/registration'} className={styles.button}>Registration</Link>
      </form>
    </div>
  );
}