'use client';

import { FaRegStar } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa6";
import { HiOutlineLightBulb } from "react-icons/hi";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { IoBookOutline } from "react-icons/io5";
import styles from './bookDetails.module.css';
import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import { useRouter } from "next/navigation";
import book from "@/app/(nonHomePage)/book/[id]/page";
import formatTime from "@/lib/utils/formatTime";

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


function BookDetails({bookDetail}: {bookDetail: Book}) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [durations, setDurations] = useState<Record<string, number>>({});

    const router = useRouter();
    const isLoggedIn = useSelector((state: any) => state.authReducer.value.isAuth);
    const handleOpenModal = (): void => {
        if (!isLoggedIn) {
            setShowModal(true);
        }else if (isLoggedIn && !bookDetail.subscriptionRequired) {
            router.push(`/player/${bookDetail.id}`);
        }else if (bookDetail.subscriptionRequired) {
            router.push('/choose-plan')
    }
}
    const handleCloseModal = (): void => {
        setShowModal(false);
    }

    const handleLoadedMetadata = (id: string, event: React.SyntheticEvent<HTMLAudioElement>) => {
            const audio = event.currentTarget;
            setDurations(prev => ({ ...prev, [id]: audio.duration }));
        };
    

  return (
    <div className={styles['inner__wrapper']}>
        {showModal ? <Modal handleCloseModal={handleCloseModal} showModal={showModal} /> : null}
                <div className={styles['inner__book']}>
                    <audio
                        src={bookDetail.audioLink}
                        onLoadedMetadata={e => handleLoadedMetadata(bookDetail.id, e)}
                    ></audio>
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
                                    {formatTime(durations[bookDetail.id] || 0)}
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
                        <button className={styles['inner-book__read--btn']}
                         onClick={handleOpenModal}>
                            <div className={styles['inner-book__read--icon']}>
                                <IoBookOutline className={styles['inner-book__read--icon-mask']}/>
                            </div>
                            <div className={styles['inner-book__read--text']}>
                                Read
                            </div>
                        </button>
                        <button className={styles['inner-book__read--btn']} onClick={handleOpenModal}>
                            <div className={styles['inner-book__read--icon']}>
                                <HiOutlineMicrophone className={styles['inner-book__read--icon-mask']}/>
                            </div>
                            <div className={styles['inner-book__read--text']}>
                                Listen
                            </div>
                        </button>
                    </div>
                    <div className={styles['inner-book__bookmark']} onClick={handleOpenModal}>
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
            </div>
  )
}

export default BookDetails