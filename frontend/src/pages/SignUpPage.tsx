import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import RadioButton from "../components/RadioButton.tsx";
import InputField from "../components/InputField.tsx";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations/user.mutation";
import toast from "react-hot-toast";
import { SignUpInput } from "../types/index";
import styles from "./AuthPages.module.css";

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState<SignUpInput>({
    name: "",
    username: "",
    password: "",
    gender: "male",
  });

  const [signup, { loading }] = useMutation(SIGN_UP, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signup({
        variables: {
          input: signUpData,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error((error as Error).message);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setSignUpData((prevData: SignUpInput) => ({
        ...prevData,
        gender: value as "male" | "female",
      }));
    } else {
      setSignUpData((prevData: SignUpInput) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.formContainer}>
          <div className={styles.formContent}>
            <h1 className={styles.title}>Sign Up</h1>
            <h1 className={styles.subtitle}>
              Join to keep track of your expenses
            </h1>
            <form className={styles.form} onSubmit={handleSubmit}>
              <InputField
                label='Full Name'
                id='name'
                name='name'
                value={signUpData.name}
                onChange={handleChange}
              />
              <InputField
                label='Username'
                id='username'
                name='username'
                value={signUpData.username}
                onChange={handleChange}
              />

              <InputField
                label='Password'
                id='password'
                name='password'
                type='password'
                value={signUpData.password}
                onChange={handleChange}
              />
              <div className={styles.radioGroup}>
                <RadioButton
                  id='male'
                  label='Male'
                  value='male'
                  onChange={handleChange}
                  checked={signUpData.gender === "male"}
                />
                <RadioButton
                  id='female'
                  label='Female'
                  value='female'
                  onChange={handleChange}
                  checked={signUpData.gender === "female"}
                />
              </div>

              <div>
                <button
                  type='submit'
                  className={styles.button}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Sign Up"}
                </button>
              </div>
            </form>
            <div className={styles.footer}>
              <p>
                Already have an account?{" "}
                <Link to='/login'>
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
