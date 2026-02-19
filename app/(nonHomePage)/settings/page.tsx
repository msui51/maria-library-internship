"use client";

import '../../globals.css';
import styles from './page.module.css';
import Link from 'next/link';
import { auth } from '@/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Modal from '@/component/Modal/Modal';


function page() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    
    useEffect(() => {
        onAuthStateChanged(auth, (user: FirebaseUser | null) => {
            if (user) {
              setIsLoggedIn(true);
            } else {
              setIsLoggedIn(false);
            }
        });
    }, []);
    
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
                
                    </div>
                    <Link href='/choose-plan' className={`${styles['settings__upgrade--btn']} ${styles['btn']}`}>
                        Upgrade to Premium
                    </Link>
                </div>
                <div className={styles['setting__content']}>
                    <div className={styles['settings__sub--title']}>
                        Email
                    </div>
                    <div className={styles['settings__text']}>
                
                    </div>
                </div>
            </>
            )}
        </div>
    </div>
  )
}

export default page