"use client";

import '../../globals.css';
import styles from './page.module.css';
import Link from 'next/link';
import { auth } from '@/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Modal from '@/component/Modal/Modal';
import { useSelector } from 'react-redux';
import { getPremiumPlusStatus } from '@/app/(homePageAndSales)/choose-plan/getPremiumStatus';
import { initFirebase } from '@/firebase';
import { getAuth } from 'firebase/auth';

function page() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [subscription, setSubscription] = useState<number>(0);
    const userEmail = useSelector((state: any) => state.authReducer.value.userEmail);
    const isLoggedIn = useSelector((state: any) => state.authReducer.value.isAuth);
    const app = initFirebase();
    const auth = getAuth(app);

    useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumPlusStatus(app)
        : 0;
        console.log("Premium status:", newPremiumStatus);
        setSubscription(newPremiumStatus);
    };
    checkPremium();
  }, [app, auth.currentUser?.uid]);

    function handleOpenModal(): void {
        setShowModal(true);
    }
    function handleCloseModal(): void {
        setShowModal(false);
    }

    


  return (
    <div className={styles['container']}>
        <div className={styles['row']}>
            <div className={`${styles['section__title']} ${styles['page__title']}`}>
                Settings
           </div>
            {!isLoggedIn ? (
            <>
                <div className={styles['settings__login--wrapper']}>
                    <img src='./login.png' alt='login'/>
                    <div className={styles['settings__login--text']}>
                        Login to your account to see your details
                    </div>
                    <button className={`${styles['settings__login--btn']} ${styles['btn']}`} onClick={handleOpenModal}>
                        Login
                    </button>
                    {showModal ? <Modal handleCloseModal={handleCloseModal} /> : null}
                </div>
            </>
            ) : (
            <>
                <div className={styles['setting__content']}>
                    <div className={styles['settings__sub--title']}>
                        Your subscription plan
                    </div>
                    <div className={styles['settings__text']}>
                        {subscription === 9900 ? "Premium Plus" : subscription === 999 ? "Premium" : "Basic"}
                    </div>
                    {subscription === 0 ? (
                        <Link href='/choose-plan' className={`${styles['settings__upgrade--btn']} ${styles['btn']}`}>
                            Upgrade to Premium
                        </Link>
                    ) : null}
                </div>
                <div className={styles['setting__content']}>
                    <div className={styles['settings__sub--title']}>
                        Email
                    </div>
                    <div className={styles['settings__text']}>
                        {userEmail}
                    </div>
                </div>
            </>
            )}
        </div>
    </div>
  )
}

export default page