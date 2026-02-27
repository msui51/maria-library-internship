

import styles from './page.module.css'
import BookDetails from '@/component/BookDetails/BookDetails';



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
    const {id} = await params;


    
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


    const bookDetail = await getBookDetail();

   
  return (
    
    <div className={styles['row']}>
        <div className={styles['container']}>
            <BookDetails bookDetail={bookDetail} />
        </div>
    </div>
  )
}

export default book