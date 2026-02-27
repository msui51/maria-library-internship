"use client"

import { useState } from 'react';
import styles from './page.module.css'
import Footer from '@/component/Footer/Footer'
import { IoIosArrowDown } from "react-icons/io";
import {getCheckoutUrl, getPortalUrl} from './stripePayment'
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import { initFirebase } from '@/firebase';



function page() {;
const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
const [openAccordion, setOpenAccordion] = useState<number | null>(null);
const router = useRouter(); 
const app = initFirebase();
const auth = getAuth(app);
const email = auth.currentUser?.email;

const upgradeToPremiumPlus = async ()=> {
    const priceID = 'price_1T4VQlDlcCcxBKNt3ESfUiBR';
    const checkoutUrl = await getCheckoutUrl(app, priceID);
    router.push(checkoutUrl);
    console.log('upgrade to premium plus')
}

const upgradeToPremiumMonthly = async ()=> {
    const priceID = 'price_1T4VRaDlcCcxBKNtM1E2778o';
    const checkoutUrl = await getCheckoutUrl(app, priceID);
    router.push(checkoutUrl);
    console.log('upgrade to premium monthly')
}

const toggleAccordion = (id: number) => {
    setOpenAccordion(prev => prev === id ? null : id);
}

const handleSelect = (planId: number): void => {
    setSelectedPlan(planId);
}

  return (
    <div className={styles['plan']}>
        <div className={styles['plan__header--wrapper']}>
            <div className={styles['plan__header']}>
                <div className={styles['plan__title']}>Get unlimited access to many amazing books to read</div>
                <div className={styles['plan__sub--title']}>Turn ordinary moments into amazing learning opportunities</div>
                <figure className={styles['plan__img--mask']}>
                    <img src='./pricing-top.png' alt='pricing'/>
                </figure>
            </div>
        </div>
        <div className={styles['row']}>
            <div className={styles['container']}>
                <div className={styles['plan__features--wrapper']}>
                    <div className={styles['plan__features']}>
                        <figure className={styles['plan__features--icon-wrapper']}>
                            
                        </figure>
                        <div className={styles['plan__features--text']}>
                            <b>Key ideas in few min</b> with many books to read
                        </div>
                    </div>
                    <div className={styles['plan__features']}>
                        <figure className={styles['plan__features--icon-wrapper']}>
                            
                        </figure>
                        <div className={styles['plan__features--text']}>
                            <b>3 million</b> people growing with Summarist everyday
                        </div>
                    </div>
                    <div className={styles['plan__features']}>
                        <figure className={styles['plan__features--icon-wrapper']}>

                        </figure>
                        <div className={styles['plan__features--text']}>
                            <b>Precise recommendations</b> collections curated by experts
                        </div>
                    </div>
                </div>
                <div className={styles['section__title']}>
                    Choose the plan that fits you
                </div>
                <div className={selectedPlan === 1 ? `${styles['plan__card']} ${styles['plan__card--active']}` : styles['plan__card']} onClick={() => handleSelect(1)}>
                    <div className={styles['plan__card--circle']}>
                        {selectedPlan === 1 ? <div className={styles['plan__card--dot']} ></div> : null}
                    </div>
                    <div className={styles['plan__card--content']}>
                        <div className={styles['plan__card--title']}>
                            Premium Plus Yearly
                        </div>
                        <div className={styles['plan__card--price']}>
                            $99.99/year
                        </div>
                        <div className={styles['plan__card--text']}>
                            7-day free trial included
                        </div>
                    </div>
                </div>
                <div className={styles['plan__card--separator']}>
                    <div className={styles['plan__separator']}>or</div>
                </div>
                <div className={selectedPlan === 2 ? `${styles['plan__card']} ${styles['plan__card--active']}` : styles['plan__card']} onClick={() => handleSelect(2)}>
                    <div className={styles['plan__card--circle']}>
                        {selectedPlan === 2 ? <div className={styles['plan__card--dot']} ></div> : null}
                    </div>
                    <div className={styles['plan__card--content']}>
                        <div className={styles['plan__card--title']}>
                            Premium Monthly
                        </div>
                        <div className={styles['plan__card--price']}>
                            $9.99/month
                        </div>
                        <div className={styles['plan__card--text']}>
                            no trial included
                        </div>
                    </div>
                </div>
                <div className={styles['plan__card--cta']}>
                    {selectedPlan === 1 ? (
                    <>
                        <div className={styles['btn--wrapper']}>
                            <button className={styles['btn']} onClick={upgradeToPremiumPlus}>
                                <span>Start your free 7-day trial</span>
                            </button>
                        </div>
                        <div className={styles['plan__disclaimer']}>
                            Cancel your trial at any time before it ends, and you won't be charged.
                        </div>
                    </>
                    ) : (
                    <>
                        <div className={styles['btn--wrapper']}>
                            <button className={styles['btn']} onClick={upgradeToPremiumMonthly}>
                                <span>Start your first month</span>
                            </button>
                        </div>
                        <div className={styles['plan__disclaimer']}>
                            30-day money-back guarantee, no questions asked.
                        </div>
                    </>
                    )}
                </div>
                <div className={styles['faq__wrapper']}>
                    <div className={styles['accordion__card']}>
                            <div className={styles['accordion__header']} onClick={() => toggleAccordion(1)}>
                                <div className={styles['accordion__title']}>
                                    How does the free 7-day trial work?
                                </div>
                                <IoIosArrowDown className={openAccordion === 1 ? `${styles['accordion__icon']} ${styles['accordion__icon--rotate']}` : styles['accordion__icon']}/>
                            </div>
                            <div className={openAccordion === 1 ? `${styles['collapse']} ${styles['show']}` : styles['collapse']}>
                                <div className={styles['accordion__body']}>
                                    Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.
                                </div>
                            </div>
                    </div>
                    <div className={styles['accordion__card']}>
                        <div className={styles['accordion__header']} onClick={() => toggleAccordion(2)}>
                            <div className={styles['accordion__title']}>
                                Can I switch subscription from monthly to yearly or yearly to monthly?
                            </div>
                            <IoIosArrowDown className={openAccordion === 2 ? `${styles['accordion__icon']} ${styles['accordion__icon--rotate']}` : styles['accordion__icon']}/>
                        </div>
                        <div className={openAccordion === 2 ? `${styles['collapse']} ${styles['show']}` : styles['collapse']}>
                            <div className={styles['accordion__body']}>
                                While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.
                            </div>
                        </div>
                    </div>
                    <div className={styles['accordion__card']}>
                        <div className={styles['accordion__header']} onClick={() => toggleAccordion(3)}>
                            <div className={styles['accordion__title']}>
                                What's included in the Premium plan?
                            </div>
                            <IoIosArrowDown className={openAccordion === 3 ? `${styles['accordion__icon']} ${styles['accordion__icon--rotate']}` : styles['accordion__icon']}/>
                        </div>
                        <div className={openAccordion === 3 ? `${styles['collapse']} ${styles['show']}` : styles['collapse']}>
                            <div className={styles['accordion__body']}>
                                Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.
                            </div>
                        </div>
                    </div>
                    <div className={styles['accordion__card']}>
                        <div className={styles['accordion__header']} onClick={() => toggleAccordion(4)}>
                            <div className={styles['accordion__title']}>
                                Can I cancel during my trial or subscription?
                            </div>
                            <IoIosArrowDown className={openAccordion === 4 ? `${styles['accordion__icon']} ${styles['accordion__icon--rotate']}` : styles['accordion__icon']}/>
                        </div>
                        <div className={openAccordion === 4 ? `${styles['collapse']} ${styles['show']}` : styles['collapse']}>
                            <div className={styles['accordion__body']}>
                                You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default page