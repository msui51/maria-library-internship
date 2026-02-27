
import styles from './page.module.css'
import BookPlayer from '@/component/BookPlayer/BookPlayer';


interface Book{
  id: string;
  title: string;
  author: string;
  imageLink: string;
  audioLink: string;
  subscriptionRequired: boolean;
  summary: string;
}

async function page({params}:  {params: Promise<{id: string}>}) {
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
    <>
        <BookPlayer bookDetail={bookDetail}/>
    </>
  )
}

export default page