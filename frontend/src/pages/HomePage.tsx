import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Cards from "../components/Cards.tsx";
import TransactionForm from "../components/TransactionForm.tsx";
import { MdLogout } from "react-icons/md";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations/user.mutation";
import { GET_TRANSACTION_STATISTICS } from "../graphql/queries/transaction.query";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { useEffect, useState } from "react";
import { CategoryStatistic, ChartData, User } from "../types/index";
import styles from "./HomePage.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

interface TransactionStatisticsData {
  categoryStatistics: CategoryStatistic[];
}

interface AuthUserData {
  authUser: User;
}

const HomePage = () => {
  const { data } = useQuery<TransactionStatisticsData>(GET_TRANSACTION_STATISTICS);
  useQuery<AuthUserData>(GET_AUTHENTICATED_USER);

  const [logout, { loading, client }] = useMutation(LOGOUT, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "$",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 130,
      },
    ],
  });

  useEffect(() => {
    if (data?.categoryStatistics) {
      const categories = data.categoryStatistics.map((stat) => stat.category);
      const totalAmounts = data.categoryStatistics.map((stat) => stat.totalAmount);

      const backgroundColors: string[] = [];
      const borderColors: string[] = [];

      categories.forEach((category) => {
        if (category === "saving") {
          backgroundColors.push("rgba(75, 192, 192)");
          borderColors.push("rgba(75, 192, 192)");
        } else if (category === "expense") {
          backgroundColors.push("rgba(255, 99, 132)");
          borderColors.push("rgba(255, 99, 132)");
        } else if (category === "investment") {
          backgroundColors.push("rgba(54, 162, 235)");
          borderColors.push("rgba(54, 162, 235)");
        }
      });

      setChartData((prev: ChartData) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmounts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
          },
        ],
      }));
    }
  }, [data]);

  const handleLogout = async () => {
    try {
      await logout();
      client.resetStore();
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error((error as Error).message);
    }
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.chartSection}>
        <div className={styles.chartContainer}>
          <Doughnut data={chartData} />
        </div>

        <div className={styles.logoutSection}>
          <TransactionForm />
          <button className={styles.logoutButton} onClick={handleLogout} disabled={loading}>
            <p className={styles.logoutText}>{loading ? "Logging out..." : "Logout"}</p>
            <MdLogout size={20} />
          </button>
        </div>
      </div>
      <Cards />
    </div>
  );
};

export default HomePage;
