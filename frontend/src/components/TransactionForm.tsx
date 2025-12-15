import { FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TRANSACTION } from "../graphql/mutations/transcation.mutation";
import toast from "react-hot-toast";
import styles from "./TransactionForm.module.css";

const TransactionForm = () => {
  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: ["GetTransactions", "GetTransactionStatistics"],
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const transactionData = {
      description: formData.get("description") as string,
      paymentType: formData.get("paymentType") as string,
      category: formData.get("category") as string,
      amount: parseFloat(formData.get("amount") as string),
      location: formData.get("location") as string,
      date: formData.get("date") as string,
    };

    try {
      await createTransaction({ variables: { input: transactionData } });
      form.reset();
      toast.success("Transaction created successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.fieldGroup}>
        <div className={styles.fullWidth}>
          <label className={styles.label} htmlFor='description'>
            Transaction
          </label>
          <input
            className={styles.input}
            id='description'
            name='description'
            type='text'
            required
            placeholder='Rent, Groceries, Salary, etc.'
          />
        </div>
      </div>

      <div className={styles.flexGroup}>
        <div className={styles.flexItem}>
          <label className={styles.label} htmlFor='paymentType'>
            Payment Type
          </label>
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              id='paymentType'
              name='paymentType'
            >
              <option value='card'>Card</option>
              <option value='cash'>Cash</option>
            </select>
            <div className={styles.selectIcon}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.flexItem}>
          <label className={styles.label} htmlFor='category'>
            Category
          </label>
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              id='category'
              name='category'
            >
              <option value='saving'>Saving</option>
              <option value='expense'>Expense</option>
              <option value='investment'>Investment</option>
            </select>
            <div className={styles.selectIcon}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.flexItem}>
          <label className={styles.label} htmlFor='amount'>
            Amount($)
          </label>
          <input
            className={styles.input}
            id='amount'
            name='amount'
            type='number'
            placeholder='150'
          />
        </div>
      </div>

      <div className={styles.flexGroup}>
        <div className={styles.flexItem}>
          <label className={styles.label} htmlFor='location'>
            Location
          </label>
          <input
            className={styles.input}
            id='location'
            name='location'
            type='text'
            placeholder='New York'
          />
        </div>

        <div className={styles.flexItem}>
          <label className={styles.label} htmlFor='date'>
            Date
          </label>
          <input
            className={styles.input}
            id='date'
            name='date'
            type='date'
          />
        </div>
      </div>

      <button
        className={styles.button}
        type='submit'
        disabled={loading}
      >
        {loading ? "Loading..." : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
