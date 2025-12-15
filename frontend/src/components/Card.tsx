import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../graphql/mutations/transcation.mutation";
import { Transaction, User } from "../types/index";
import styles from "./Card.module.css";

interface CardProps {
  transaction: Transaction;
  authUser: User;
}

const Card = ({ transaction, authUser }: CardProps) => {
  let { category, amount, location, date, paymentType, description } = transaction;

  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: ["GetTransactions", "GetTransactionStatistics"],
  });

  const capitalizedDescription = description[0]?.toUpperCase() + description.slice(1);
  const capitalizedCategory = category[0]?.toUpperCase() + category.slice(1);
  const capitalizedPaymentType = paymentType[0]?.toUpperCase() + paymentType.slice(1);

  const formattedDate = formatDate(date);

  const handleDelete = async () => {
    try {
      await deleteTransaction({ variables: { transactionId: transaction._id } });
      toast.success("Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error((error as Error).message);
    }
  };

  return (
    <div className={`${styles.card} ${styles[category]}`}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h2 className={styles.category}>{capitalizedCategory}</h2>
          <div className={styles.actions}>
            {!loading && (
              <button className={styles.deleteButton} onClick={handleDelete}>
                <FaTrash />
              </button>
            )}
            {loading && <div className={styles.spinner}></div>}
            <Link to={`/transaction/${transaction._id}`} className={styles.editButton}>
              <HiPencilAlt size={20} />
            </Link>
          </div>
        </div>
        <p className={styles.cardInfo}>
          <BsCardText />
          Description: {capitalizedDescription}
        </p>
        <p className={styles.cardInfo}>
          <MdOutlinePayments />
          Payment Type: {capitalizedPaymentType}
        </p>
        <p className={styles.cardInfo}>
          <FaSackDollar />
          Amount: ${amount}
        </p>
        <p className={styles.cardInfo}>
          <FaLocationDot />
          Location: {location || "N/A"}
        </p>
        <div className={styles.cardFooter}>
          <p className={styles.date}>{formattedDate}</p>
          <img src={authUser?.profilePicture} className={styles.profilePicture} alt='' />
        </div>
      </div>
    </div>
  );
};

export default Card;
