

import styles from './page.module.css'
import { FaRegStar } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa6";
import { HiOutlineLightBulb } from "react-icons/hi";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { IoBookOutline } from "react-icons/io5";
import { onAuthStateChanged,
        User as FirebaseUser,
        } from 'firebase/auth';
import { auth } from '@/firebase';

import Modal from '@/component/Modal/Modal';
import { useSelector } from 'react-redux';



interface Book{
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}


async function book({params}: {params: Promise<{id: string}>}) {
    // const [showModal, setShowModal] = useState<boolean>(false);
    const {id} = await params;

    // const isLoggedIn = useSelector((state: any) => state.authReducer.value.isAuth);
    
    async function getBookDetail(): Promise<Book> {
        try {
            const res = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
            if (!res.ok) throw new Error(`API error: ${res.status}`);
            const bookData: Book = await res.json();
            return bookData;
        }catch (error) {
            console.error('Failed to fetch book details:', error);
            throw error;
    }}

    // onAuthStateChanged(auth, (user: FirebaseUser | null) => {
    //         if (user) {
    //           setIsLoggedIn(true);
    //         } else {
    //           setIsLoggedIn(false);
    //         }
    //     });

    // function handleOpenModal(): void {
    //     if (!isLoggedIn){
    //         setShowModal(true);
    //     }
    // }

    // function handleCloseModal(): void {
    //         setShowModal(false);
    //     }

    const bookDetail = await getBookDetail();

   
  return (
    
    <div className={styles['row']}>
        {/* {showModal ? <Modal handleCloseModal={handleCloseModal} /> : null} */}
        <div className={styles['container']}>
            <div className={styles['inner__wrapper']}>
                <div className={styles['inner__book']}>
                    <div className={styles['inner-book__title']}>{bookDetail.title}</div>
                    <div className={styles['inner-book__author']}>{bookDetail.author}</div>
                    <div className={styles['inner-book__sub--title']}>{bookDetail.subTitle}</div>
                    <div className={styles['inner-book__wrapper']}>
                        <div className={styles['inner-book__description--wrapper']}>
                            <div className={styles['inner-book__description']}>
                                <div className={styles['inner-book__icon']}>
                                    <FaRegStar className={styles['inner-book__icon--mask']}/>
                                </div>
                                <div className={styles['inner-book__overall--rating']}>
                                    {bookDetail.averageRating}
                                </div>
                                <div className={styles['inner-book__total--rating']}>
                                    ({bookDetail.totalRating} ratings)
                                </div>
                            </div>
                            <div className={styles['inner-book__description']}>
                                <div className={styles['inner-book__icon']}>
                                    <IoTimeOutline className={styles['inner-book__icon--mask']}/>
                                </div>
                                <div className={styles['inner-book__duration']}>
                        
                                </div>
                            </div>
                            <div className={styles['inner-book__description']}>
                                <div className={styles['inner-book__icon']}>
                                    <HiOutlineMicrophone className={styles['inner-book__icon--mask']}/>
                                </div>
                                <div className={styles['inner-book__type']}>
                                    Audio & Text
                                </div>
                            </div>
                            <div className={styles['inner-book__description']}>
                                <div className={styles['inner-book__icon']}>
                                    <HiOutlineLightBulb className={styles['inner-book__icon--mask']}/>
                                </div>
                                <div className={styles['inner-book__key--ideas']}>
                                    {bookDetail.keyIdeas} Key Ideas
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['inner-book__read--btn-wrapper']}>
                        <button className={styles['inner-book__read--btn']} >
                            <div className={styles['inner-book__read--icon']}>
                                <IoBookOutline className={styles['inner-book__read--icon-mask']}/>
                            </div>
                            <div className={styles['inner-book__read--text']}>
                                Read
                            </div>
                        </button>
                        <button className={styles['inner-book__read--btn']}>
                            <div className={styles['inner-book__read--icon']}>
                                <HiOutlineMicrophone className={styles['inner-book__read--icon-mask']}/>
                            </div>
                            <div className={styles['inner-book__read--text']}>
                                Listen
                            </div>
                        </button>
                    </div>
                    <div className={styles['inner-book__bookmark']} >
                        <div className={styles['inner-book__bookmark--icon']}>
                            <FaRegBookmark className={styles['inner-book__bookmark--icon-mask']}/>
                        </div>
                        <div className={styles['inner-book__bookmark--text']}>
                            Add title to my library
                        </div>
                    </div>
                    <div className={styles['inner-book__secondary--title']}>What's it about?</div>
                    <div className={styles['inner-book__tags--wrapper']}>
                        <div className={styles['inner-book__tag']}>
                            {bookDetail.tags[0]}
                        </div>
                        <div className={styles['inner-book__tag']}>
                            {bookDetail.tags[1]}
                        </div>
                    </div>
                    <div className={styles['inner-book__book--description']}>
                        {bookDetail.bookDescription}
                    </div>
                    <h2 className={styles['inner-book__secondary--title']}>About the author</h2>
                    <div className={styles['inner-book__author--description']}>
                        {bookDetail.authorDescription}
                    </div>
                </div>
                <div className={styles['inner-book--img-wrapper']}>
                    <figure className={styles['book__image--wrapper']}>
                        <img className={styles['book__image']} src={bookDetail.imageLink} alt='Book Cover Image' />
                    </figure>
                </div>
                {/* {showModal ? <Modal handleCloseModal={handleCloseModal} /> : null} */}
            </div>
        </div>
    </div>
  )
}

export default book