"use client";

import styles from './modal.module.css';
import { FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { JSX, useState } from 'react';
import { useRouter } from 'next/navigation';
import {auth, db} from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged } from 'firebase/auth';

interface Props {
  handleCloseModal: () => void;
}
  

export default function Modal({ handleCloseModal }: Props): JSX.Element {
  const [signUp, setSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

 

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  }

  const handleSignUpWithEmail = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed up:', user);
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
      });
      console.log('User added to database');
      router.push('/for-you');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }

  const handleLogInWithEmail = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in:', user);
      router.push('/for-you');
    } catch (error) {
      setError(true);
      console.error('Error logging in:', error);
    }
  }

  const handleSignUp = (): void => {
    if(signUp) {
      setSignUp(false);
    }else {
    setSignUp(true);
    }
  }

  return (
    <>
      {/* <div className="sidebar__overlay sidebar__overlay--hidden">
      </div> */}
      <div className={styles['auth__wrapper']}>
        {!signUp ? (
        <>
          <div className={styles['auth']}>
            <div className={styles['auth__content']}>
              <div className={styles['auth__title']}>
              Log in to Summarist
              </div>
              {error ? <div className={styles['auth__error']}>Invalid email or password. Please try again.</div> : null}
              <Link href='/for-you'>
              <button className={`${styles.btn} ${styles['guest__btn--wrapper']}`}>
                <FaUser className={`${styles['google__icon--mask']} ${styles['guest__icon--mask']}`}/>
                <div>Login as Guest</div>
              </button>
              </Link>
              <div className={styles['auth__separator']}>
                <span className={styles['auth__separator--text']}>or</span>
              </div>
              <button className={`${styles.btn} ${styles['google__btn--wrapper']}`}>
                <FcGoogle className={styles['google__icon--mask']}/>
                <div>Login with Google</div>
              </button>
              <div className={styles['auth__separator']}>
                <span className={styles['auth__separator--text']}>or</span>
              </div>
              <form className={styles['auth__main--form']} onSubmit={handleLogInWithEmail}>
                <input className={styles['auth__main--input'] } 
                  type="text"
                  placeholder="Email Address"
                  value={email}
                  onChange={handleEmailChange}></input>
                <input className={styles['auth__main--input']}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}></input>
                <button className={styles.btn} >
                  <span>Log In</span>
                </button>
              </form>
            </div>
            <div className={styles['auth__forgot--password']}>
            Forgot your password?
            </div>
            <button className={styles['auth__switch--btn']} onClick={handleSignUp}>
              Don't have an account?
            </button>
            <div className={styles['auth__close--btn']} onClick={handleCloseModal}>
              <IoMdClose/>
            </div>
          </div>
      </>
      ) : (
        <>
          <div className={styles['auth']}>
          <div className={styles['auth__content']}>
            <div className={styles['auth__title']}>
            Sign up to Summarist
            </div>
            <button className={`${styles.btn} ${styles['google__btn--wrapper']}`}>
              <FcGoogle className={styles['google__icon--mask']}/>
              <div>Login with Google</div>
            </button>
            <div className={styles['auth__separator']}>
              <span className={styles['auth__separator--text']}>or</span>
            </div>
            <form className={styles['auth__main--form']} onSubmit={handleSignUpWithEmail}>
              <input className={styles['auth__main--input'] } 
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={handleEmailChange}></input>
              <input className={styles['auth__main--input']}
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}></input>
              <button className={styles.btn} >
                <span>Sign Up</span>
              </button>
            </form>
          </div>
          <button className={styles['auth__switch--btn']} onClick={handleSignUp}>
            Already an account?
          </button>
          <div className={styles['auth__close--btn']} onClick={handleCloseModal}>
            <IoMdClose/>
          </div>
        </div>
        </>
      )}
      </div>
    </>
  )
}

