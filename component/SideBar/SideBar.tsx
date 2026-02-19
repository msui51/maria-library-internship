"use client";

import styles from './side-bar.module.css';
import Link from 'next/link';
import { TiHomeOutline } from "react-icons/ti";
import { FaRegBookmark } from "react-icons/fa6";
import { RiBallPenLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useState, useEffect } from 'react';
import { auth } from '@/firebase';
import { signOut,
        onAuthStateChanged,
        User as FirebaseUser
        } from 'firebase/auth';
import Modal from '../Modal/Modal';
import { on } from 'events';

function SideBar() {
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
    

    const handleLogout = (): void => {
        signOut(auth).then(() => {
            console.log('User signed out successfully');
            setIsLoggedIn(false);
        }).catch((error) => {
            console.error('Error signing out:', error);
        }
        );
    }
    const handleLogin = (): void => {
        setShowModal(true);
    }

    const handleCloseModal = (): void => {
        setShowModal(false);
    }

  return (
    <div className={styles['sidebar']}>
        <div className={styles['sidebar__logo']}>
            <img src='../logo.png' alt='Summarist Logo'/>
        </div>
        <div className={styles['sidebar__wrapper']}>
            <div className={styles['sidebar__top']}>
                <Link className={styles['sidebar__link--wrapper']} href='/for-you'>
                    <div className={`${styles['sidebar__link--line']} ${styles['active--tab']}`}></div>
                    <div className={styles['sidebar__icon--wrapper']}>
                        <TiHomeOutline className={styles['sidebar__icon']}/>
                    </div>
                    <div className={styles['sidebar__link--text']}>For You</div>
                </Link>
                <Link className={styles['sidebar__link--wrapper']} href='/library'>
                    <div className={styles['sidebar__link--line']}></div>
                    <div className={styles['sidebar__icon--wrapper']}>
                        <FaRegBookmark className={styles['sidebar__icon']}/>
                    </div>
                    <div className={styles['sidebar__link--text']}>Library</div>
                </Link>
                <div className={`${styles['sidebar__link--wrapper']} ${styles['sidebar__link--not-allowed']}`}>
                    <div className={styles['sidebar__link--line']}></div>
                    <div className={styles['sidebar__icon--wrapper']}>
                        <RiBallPenLine className={styles['sidebar__icon']}/>
                    </div>
                    <div className={styles['sidebar__link--text']}>Highlights</div>
                </div>
                <div className={`${styles['sidebar__link--wrapper']} ${styles['sidebar__link--not-allowed']}`}>
                    <div className={styles['sidebar__link--line']}></div>
                    <div className={styles['sidebar__icon--wrapper']}>
                        <IoIosSearch className={styles['sidebar__icon']}/>
                    </div>
                    <div className={styles['sidebar__link--text']}>Search</div>
                </div>
            </div>
            <div className={styles['sidebar__bottom']}>
                <Link className={styles['sidebar__link--wrapper']} href='/settings'>
                    <div className={styles['sidebar__link--line']}></div>
                    <div className={styles['sidebar__icon--wrapper']}>
                        <CiSettings className={styles['sidebar__icon']}/>
                    </div>
                    <div className={styles['sidebar__link--text']}>Settings</div>
                </Link>
                <div className={`${styles['sidebar__link--wrapper']} ${styles['sidebar__link--not-allowed']}`}>
                    <div className={styles['sidebar__link--line']}></div>
                    <div className={styles['sidebar__icon--wrapper']}>
                        <IoMdHelpCircleOutline className={styles['sidebar__icon']}/>
                    </div>
                    <div className={styles['sidebar__link--text']}>Help & Support</div>
                </div>
                <div className={styles['sidebar__link--wrapper']}>
                    <div className={styles['sidebar__link--line']}></div>
                    <div className={styles['sidebar__icon--wrapper']}>
                        <FiLogOut className={styles['sidebar__icon']}/>
                    </div>
                    {isLoggedIn ? (
                        <div className={styles['sidebar__link--text']} onClick={handleLogout}>Logout</div>
                    ) : (
                        <div className={styles['sidebar__link--text']} onClick={handleLogin}>Login</div>
                    )}
                    {showModal ? <Modal handleCloseModal={handleCloseModal} /> : null}    
                </div>
            </div>
        </div>
    </div>
  )
}

export default SideBar