import { useQuery } from "@apollo/client";
import Card from "./Card.tsx";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { GET_AUTHENTICATED_USER, GET_USER_AND_TRANSACTIONS } from "../graphql/queries/user.query";
import { Transaction, User } from "../types/index";
import styles from "./Cards.module.css";

interface TransactionsData {
  transactions: Transaction[];
}

interface AuthUserData {
  authUser: User;
}

interface UserAndTransactionsData {
  user: User & {
    transactions: Transaction[];
  };
}

const Cards = () => {
  const { data, loading } = useQuery<TransactionsData>(GET_TRANSACTIONS);
  const { data: authUser } = useQuery<AuthUserData>(GET_AUTHENTICATED_USER);

  const { data: userAndTransactions } = useQuery<UserAndTransactionsData>(GET_USER_AND_TRANSACTIONS, {
    variables: {
      userId: authUser?.authUser?._id,
    },
  });

  console.log("userAndTransactions:", userAndTransactions);
  console.log("cards:", data);

  return (
    <div className={styles.cardsContainer}>
      <p className={styles.title}>History</p>
      <div className={styles.cardsGrid}>
        {!loading &&
          data?.transactions.map((transaction) => (
            <Card key={transaction._id} transaction={transaction} authUser={authUser!.authUser} />
          ))}
      </div>
      {!loading && data?.transactions?.length === 0 && (
        <p className={styles.emptyMessage}>No transaction history found.</p>
      )}
    </div>
  );
};

export default Cards;
