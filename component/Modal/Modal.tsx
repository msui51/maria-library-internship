import styles from './modal.module.css';
import { FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';

interface ModalProps {
  handleCloseModal: () => void;
}

function Modal({ handleCloseModal }: ModalProps) {
  return (
    <>
      {/* <div className="sidebar__overlay sidebar__overlay--hidden">
      </div> */}
      <div className={styles['auth__wrapper']}>
        <div className={styles['auth']}>
          <div className={styles['auth__content']}>
            <div className={styles['auth__title']}>Log in to Summarist</div>
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
            <form className={styles['auth__main--form']}>
              <input className={styles['auth__main--input']} 
                type="text"
                placeholder="Email Address"></input>
              <input className={styles['auth__main--input']}
                type="password"
                placeholder="Password"></input>
              <button className={styles.btn}>
                <span>Log In</span>
              </button>
            </form>
          </div>
          <div className={styles['auth__forgot--password']}>
            Forgot your password?
          </div>
          <button className={styles['auth__switch--btn']}>
            Don't have an account?
          </button>
          <div className={styles['auth__close--btn']} onClick={handleCloseModal}>
            <IoMdClose/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal