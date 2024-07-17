import { FC, useState } from "react";
import styles from './registration.module.css';
import { RegistrationUIProps } from "./type";
import { Link } from "react-router-dom";

export const RegistrationUI: FC<RegistrationUIProps> = ({name, setName, email, setEmail, handleSubmit, password, setPassword}) => {
  const [localErrors, setLocalErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const validateName = (name: string) => {
    return name.trim().length >= 4 ? '' : 'Name must be at least 4 characters';
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? '' : 'Invalid email address';
  };

  const validatePassword = (password: string) => {
    return password.length >= 6 ? '' : 'Password must be at least 6 characters';
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setLocalErrors((prevErrors) => ({ ...prevErrors, name: validateName(newName) }));
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
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (nameError || emailError || passwordError) {
      setLocalErrors({ name: nameError, email: emailError, password: passwordError });
    } else {
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.registration}>
      <h2 className={styles.title}>Registration</h2>
      <form className={styles.form} name="registration" onSubmit={handleFormSubmit}>
        <label className={styles.label}>Name</label>
        <input
          className={styles.input}
          style={localErrors.name ? { margin: '0' } : {}}
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
        {localErrors.name && <p className={styles.error}>{localErrors.name}</p>}

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

        <button className={styles.button} type="submit">Registration</button>
        <Link to={'/login'} className={styles.button}>Login</Link>
      </form>
    </div>
  );
}