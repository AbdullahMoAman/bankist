# 💳 Bankist App

A vanilla JavaScript banking application with locale-aware formatting, session management, and real-time UI updates.

---

## 🚀 Demo Accounts

| Username | PIN  |
| -------- | ---- |
| `am`     | 1111 |
| `sa`     | 2222 |
| `ks`     | 3333 |

---

## 📖 How to Use

### 1. Logging In

Enter a username and its matching PIN in the login fields, then press **→** (or hit Enter).  
Once authenticated, the dashboard appears showing your balance, transaction history, and a **1.30-minute session timer** in the top right. If the timer reaches `00:00`, you are automatically logged out.

---

### 2. Reading the Dashboard

| Section       | Description                                                                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Movements** | Full list of deposits (green) and withdrawals (red), each with a relative date — _Today_, _Yesterday_, _N days ago_, or the full formatted date |
| **Balance**   | Your current total, displayed in the top right in your account's currency                                                                       |
| **Summary**   | Totals at the bottom — money in, money out, and interest earned on deposits                                                                     |

---

### 3. Transferring Money

1. Fill in the **Transfer to** field with another user's username (e.g. `sa` or `ks`)
2. Enter the amount
3. Click **→** to confirm

The amount is instantly deducted from your account and added to the recipient's. The session timer resets after each transfer.

> ⚠️ You cannot transfer to yourself, transfer more than your current balance, or send a negative amount.

---

### 4. Requesting a Loan

1. Enter the desired loan amount in the **Request loan** field
2. Click **→** to submit

The bank approves a loan only if **at least one of your existing deposits is ≥ 10% of the requested amount**. If approved, there is a 3-second processing delay before the amount is credited to your account.

---

### 5. Closing Your Account

1. Enter your **own username** in the _Confirm user_ field
2. Enter your **PIN** in the _Confirm PIN_ field
3. Click **→** to permanently delete the account

The dashboard will disappear and the account is removed from the application.

---

### 6. Sorting Movements

Click the **↑↓ Sort** button above the movements list to sort transactions from the lowest to the highest amount. Click it again to return to the default order.

---

## 💡 Quick Tip

Log in as `am`, transfer some money to `sa`, then log out and log in as `sa` — you'll see the deposit appear instantly in the movements list.
