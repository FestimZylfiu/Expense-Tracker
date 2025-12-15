export interface User {
  _id: string;
  username: string;
  name: string;
  profilePicture: string;
}

export interface Transaction {
  _id: string;
  description: string;
  paymentType: 'card' | 'cash';
  category: 'saving' | 'expense' | 'investment';
  amount: number;
  location: string;
  date: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface SignUpInput {
  name: string;
  username: string;
  password: string;
  gender: 'male' | 'female';
}

export interface TransactionInput {
  description: string;
  paymentType: 'card' | 'cash';
  category: 'saving' | 'expense' | 'investment';
  amount: number;
  location: string;
  date: string;
}

export interface TransactionUpdateInput extends TransactionInput {
  transactionId: string;
}

export interface CategoryStatistic {
  category: string;
  totalAmount: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
    borderRadius: number;
    spacing: number;
    cutout: number;
  }[];
}
