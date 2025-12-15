import { useMutation, useQuery } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_TRANSACTION, GET_TRANSACTION_STATISTICS } from "../graphql/queries/transaction.query";
import { UPDATE_TRANSACTION } from "../graphql/mutations/transcation.mutation";
import toast from "react-hot-toast";
import TransactionFormSkeleton from "../components/skeletons/TransactionFormSkeleton.tsx";
import { Transaction, TransactionInput } from "../types/index";
import styles from "./TransactionPage.module.css";
import formStyles from "../components/TransactionForm.module.css";

interface TransactionData {
  transaction: Transaction;
}

const TransactionPage = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, data } = useQuery<TransactionData>(GET_TRANSACTION, {
    variables: { id: id },
  });

  console.log("Transaction", data);

  const [updateTransaction, { loading: loadingUpdate }] = useMutation(UPDATE_TRANSACTION, {
    refetchQueries: [{ query: GET_TRANSACTION_STATISTICS }],
  });

  const [formData, setFormData] = useState<TransactionInput>({
    description: "",
    paymentType: "card",
    category: "saving",
    amount: 0,
    location: "",
    date: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount.toString());

    try {
      await updateTransaction({
        variables: {
          input: {
            ...formData,
            amount,
            transactionId: id,
          },
        },
      });
      toast.success("Transaction updated successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: TransactionInput) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (data) {
      setFormData({
        description: data?.transaction?.description || "",
        paymentType: data?.transaction?.paymentType || "card",
        category: data?.transaction?.category || "saving",
        amount: data?.transaction?.amount || 0,
        location: data?.transaction?.location || "",
        date: new Date(+data.transaction.date).toISOString().substr(0, 10),
      });
    }
  }, [data]);

  if (loading) return <TransactionFormSkeleton />;

  return (
    <div className={styles.transactionPage}>
      <p className={styles.pageTitle}>
        Update this transaction
      </p>
      <form className={formStyles.formContainer} onSubmit={handleSubmit}>
        <div className={formStyles.fieldGroup}>
          <div className={formStyles.fullWidth}>
            <label
              className={formStyles.label}
              htmlFor='description'
            >
              Transaction
            </label>
            <input
              className={formStyles.input}
              id='description'
              name='description'
              type='text'
              placeholder='Rent, Groceries, Salary, etc.'
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={formStyles.flexGroup}>
          <div className={formStyles.flexItem}>
            <label
              className={formStyles.label}
              htmlFor='paymentType'
            >
              Payment Type
            </label>
            <div className={formStyles.selectWrapper}>
              <select
                className={formStyles.select}
                id='paymentType'
                name='paymentType'
                onChange={handleInputChange}
                value={formData.paymentType}
              >
                <option value='card'>Card</option>
                <option value='cash'>Cash</option>
              </select>
              <div className={formStyles.selectIcon}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>
          </div>

          <div className={formStyles.flexItem}>
            <label
              className={formStyles.label}
              htmlFor='category'
            >
              Category
            </label>
            <div className={formStyles.selectWrapper}>
              <select
                className={formStyles.select}
                id='category'
                name='category'
                onChange={handleInputChange}
                value={formData.category}
              >
                <option value='saving'>Saving</option>
                <option value='expense'>Expense</option>
                <option value='investment'>Investment</option>
              </select>
              <div className={formStyles.selectIcon}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>
          </div>

          <div className={formStyles.flexItem}>
            <label className={formStyles.label} htmlFor='amount'>
              Amount($)
            </label>
            <input
              className={formStyles.input}
              id='amount'
              name='amount'
              type='number'
              placeholder='150'
              value={formData.amount}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={formStyles.flexGroup}>
          <div className={formStyles.flexItem}>
            <label
              className={formStyles.label}
              htmlFor='location'
            >
              Location
            </label>
            <input
              className={formStyles.input}
              id='location'
              name='location'
              type='text'
              placeholder='New York'
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          <div className={formStyles.flexItem}>
            <label className={formStyles.label} htmlFor='date'>
              Date
            </label>
            <input
              className={formStyles.input}
              id='date'
              name='date'
              type='date'
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button
          className={formStyles.button}
          type='submit'
          disabled={loadingUpdate}
        >
          {loadingUpdate ? "Updating..." : "Update Transaction"}
        </button>
      </form>
    </div>
  );
};

export default TransactionPage;
