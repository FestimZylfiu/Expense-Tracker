import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "../components/InputField.tsx";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations/user.mutation";
import toast from "react-hot-toast";
import { LoginInput } from "../types/index";
import styles from "./AuthPages.module.css";

const LoginPage = () => {
  const [loginData, setLoginData] = useState<LoginInput>({
    username: "",
    password: "",
  });

  const [login, { loading }] = useMutation(LOGIN, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData: LoginInput) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      return toast.error("Please fill in all fields");
    }
    try {
      await login({ variables: { input: loginData } });
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error((error as Error).message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.formContainer}>
          <div className={styles.formContent}>
            <h1 className={styles.title}>Login</h1>
            <h1 className={styles.subtitle}>
              Welcome back! Log in to your account
            </h1>
            <form className={styles.form} onSubmit={handleSubmit}>
              <InputField
                label='Username'
                id='username'
                name='username'
                value={loginData.username}
                onChange={handleChange}
              />

              <InputField
                label='Password'
                id='password'
                name='password'
                type='password'
                value={loginData.password}
                onChange={handleChange}
              />
              <div>
                <button
                  type='submit'
                  className={styles.button}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </div>
            </form>
            <div className={styles.footer}>
              <p>
                {"Don't"} have an account?{" "}
                <Link to='/signup'>
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
