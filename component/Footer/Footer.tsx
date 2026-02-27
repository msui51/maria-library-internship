import styles from './footer.module.css'

function Footer() {
  return (
    <section className={styles['footer']}>
            <div className={styles['container']}>
                <div className={styles['row']}>
                    <div className={styles['footer__top--wrapper']}>
                        <div className={styles['footer__block']}>
                            <div className={styles['footer__link--title']}>
                                Actions
                            </div>
                            <div className={styles['footer__link']}>
                                Summarist Magazine
                            </div>
                            <div className={styles['footer__link']}>
                                Cancel Subscription
                            </div>
                            <div className={styles['footer__link']}>
                                Help
                            </div>
                            <div className={styles['footer__link']}>
                                Contact Us
                            </div>
                        </div>
                        <div className={styles['footer__block']}>
                            <div className={styles['footer__link--title']}>
                                Useful Links
                            </div>
                            <div className={styles['footer__link']}>
                                Pricing
                            </div>
                            <div className={styles['footer__link']}>
                                Summarist Business
                            </div>
                            <div className={styles['footer__link']}>
                                Gift Cards
                            </div>
                            <div className={styles['footer__link']}>
                                Authors & Publishers
                            </div>
                        </div>
                        <div className={styles['footer__block']}>
                            <div className={styles['footer__link--title']}>
                                Company
                            </div>
                            <div className={styles['footer__link']}>
                                About
                            </div>
                            <div className={styles['footer__link']}>
                                Careers
                            </div>
                            <div className={styles['footer__link']}>
                                Partners
                            </div>
                            <div className={styles['footer__link']}>
                                Code of Conduct
                            </div>
                        </div>
                        <div className={styles['footer__block']}>
                            <div className={styles['footer__link--title']}>
                                Other
                            </div>
                            <div className={styles['footer__link']}>
                                Sitemap
                            </div>
                            <div className={styles['footer__link']}>
                                Legal Notice
                            </div>
                            <div className={styles['footer__link']}>
                                Terms of Service
                            </div>
                            <div className={styles['footer__link']}>
                                Privacy Policies
                            </div>
                        </div>
                    </div>
                    <div className={styles['footer__copyright--wrapper']}>
                        <div className={styles['footer__copyright']}>
                            © 2024 Summarist. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Footer