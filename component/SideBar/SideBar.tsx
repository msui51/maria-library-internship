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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { logOut } from '@/lib/features/signIn/signIn';
import { usePathname } from 'next/navigation';
import { PiTextAa } from "react-icons/pi";
import { fontSizeLarge, fontSizeMedium, fontSizeSmall, fontSizeXlarge } from '@/lib/features/playerFontSize/playerFontSize';
import { useRouter } from 'next/navigation';

function SideBar() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isPlayerPage, setIsPlayerPage] = useState<boolean>(false);
    const [selectedFontSize, setSelectedFontSize] = useState<string>('small');
    const [section, setSection] = useState<string>('for-you');
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();
    const router = useRouter();

    const isLoggedIn = useSelector((state: any) => state.authReducer.value.isAuth);

    useEffect(() => {
        if (pathname.startsWith('/player')) {
            setIsPlayerPage(true);
        }else{
            setIsPlayerPage(false);
        }
    }, [pathname]);

    const handleLogout = (): void => {
        signOut(auth).then(() => {
            console.log('User signed out successfully');
            dispatch(logOut());
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

    const handleFontSizeSmall = (): void => {
        dispatch(fontSizeSmall());
        setSelectedFontSize('small');
    }

    const handleFontSizeMedium = (): void => {
        dispatch(fontSizeMedium());
        setSelectedFontSize('medium');
    }
    
     const handleFontSizeLarge = (): void => {
        dispatch(fontSizeLarge());
        setSelectedFontSize('large');
    }
     const handleFontSizeXlarge = (): void => {
        dispatch(fontSizeXlarge());
        setSelectedFontSize('xlarge');
    }


  return (
    <div className={styles['sidebar']}>
        <div className={styles['sidebar__logo']}>
            <img src='../logo.png' alt='Summarist Logo'/>
        </div>

        <div className={isPlayerPage ? `${styles['sidebar__wrapper--player']}` : `${styles['sidebar__wrapper']}`}>
            
            <div className={styles['sidebar__top']}>
                <Link className={styles['sidebar__link--wrapper']} href='/for-you' onClick={() => setSection('for-you')}>
                    <div className={ `${styles['sidebar__link--line']} ${section === 'for-you' ? styles['active--tab'] : ''}`}></div>
                    <div className={styles['sidebar__icon--wrapper']}>
                        <TiHomeOutline className={styles['sidebar__icon']}/>
                    </div>
                    <div className={styles['sidebar__link--text']}>For You</div>
                </Link>
                <Link className={styles['sidebar__link--wrapper']} href='/library' onClick={() => setSection('library')}>
                    <div className={`${styles['sidebar__link--line']} ${section === 'library' ? styles['active--tab'] : ''}`}></div>
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
                {isPlayerPage ? (
                    <>
                    <div className={`${styles['sidebar__link--wrapper']} ${styles['sidebar__font--size-wrapper']}`}>
                            <div
                                className={`${styles['sidebar__link--text']} ${styles['sidebar__font--size-icon']} ${selectedFontSize === 'small' ? styles['sidebar__font--size-icon--active'] : ''}`}
                                onClick={handleFontSizeSmall}
                            >
                                <PiTextAa className={styles['sidebar__font--size-icon-small']}/>
                            </div>
                            <div
                                className={`${styles['sidebar__link--text']} ${styles['sidebar__font--size-icon']} ${selectedFontSize === 'medium' ? styles['sidebar__font--size-icon--active'] : ''}`}
                                onClick={handleFontSizeMedium}
                            >
                                <PiTextAa className={styles['sidebar__font--size-icon-medium']}/>
                            </div>
                            <div
                                className={`${styles['sidebar__link--text']} ${styles['sidebar__font--size-icon']} ${selectedFontSize === 'large' ? styles['sidebar__font--size-icon--active'] : ''}`}
                                onClick={handleFontSizeLarge}
                            >
                                <PiTextAa className={styles['sidebar__font--size-icon-large']}/>
                            </div>
                            <div
                                className={`${styles['sidebar__link--text']} ${styles['sidebar__font--size-icon']} ${selectedFontSize === 'xlarge' ? styles['sidebar__font--size-icon--active'] : ''}`}
                                onClick={handleFontSizeXlarge}
                            >
                                <PiTextAa className={styles['sidebar__font--size-icon-xlarge']}/>
                            </div>
                    </div>
                    </>
                ) : null}
            </div>
            <div className={styles['sidebar__bottom']}>
                <Link className={styles['sidebar__link--wrapper']} href='/settings' onClick={() => setSection('settings')}>
                    <div className={ `${styles['sidebar__link--line']} ${section === 'settings' ? styles['active--tab'] : ''}`}></div>
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