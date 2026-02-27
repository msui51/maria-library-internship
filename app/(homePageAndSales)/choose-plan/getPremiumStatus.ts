import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export const getPremiumPlusStatus = async (app: FirebaseApp) => {
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User not logged in");

  const db = getFirestore(app);
  const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
  const q = query(
    subscriptionsRef,
    where("status", "in", ["trialing", "active"]),
    // where("unit_amount", "==", "9900")
  );

  return new Promise<number>((resolve, reject) => {
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // In this implementation we only expect one active or trialing subscription to exist.
        console.log("Subscription snapshot", snapshot.docs.length);
        console.log(snapshot.docs);
        // log price information if available
        if (snapshot.docs.length > 0) {
          const data = snapshot.docs[0].data();
          console.log("subscription data", data);
          // common price fields from Stripe integration
          const unitAmount = data.items?.[0]?.price?.unit_amount;
          console.log("subscription price", unitAmount);
          resolve(unitAmount);
        }
        if (snapshot.docs.length === 0) {
          console.log("No active or trialing subscriptions found");
          resolve(0);
        } 
        // else {
        //   console.log("Active or trialing subscription found");
        //   resolve(unitAmount);
        // }
        unsubscribe();
      },
      reject
    );
  });
};