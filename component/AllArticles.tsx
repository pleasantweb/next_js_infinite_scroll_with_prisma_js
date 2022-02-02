import { Article } from "@prisma/client"
import { useCallback, useRef, useState } from "react"
import styles from '../styles/article.module.scss'
import useArticleGet from "./useArticleGet"

type propType = {
    articles:Article[]
}

const AllArticles=(props:propType)=>{
    const {articles} = props
   
    const [pageNumber,setPageNumber] = useState(1)
    const observer = useRef<IntersectionObserver | null>(null)
    const {loading,error,articleList,hasMore} = useArticleGet(pageNumber)

    const lastArticleElementRef = useCallback(node=>{ 
        if(loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting && hasMore){
              setPageNumber(prev=>prev +1)
            }
        },{rootMargin:'50px'})
    
        if(node) observer.current.observe(node)
        
      },[loading,hasMore])
    
    return (
        <>
        <section className={styles.all_articles}>
            <div className={styles.btn}>Article Fetched <h1>{3 + articleList.length}</h1> </div>
            {articles.map((v,i)=>(
                <article key={i}>
                    <h1>{v.title}</h1>
                </article>
            ))}

            {articleList && articleList.length > 0 ? (
                articleList.map((v,i)=>(
                    articleList.length === i + 1 ? (
                        <article key={i} ref={lastArticleElementRef}><h1>{v.title}</h1></article>
                    ):(<article key={i}><h1>{v.title}</h1></article>)
                )) 
            ):('')}
             {loading ? (<h1>Loading....</h1>):('')}
            {error ? (<h1>Something went wrong</h1>):('')}
        </section>
        </>

    )
}
export default AllArticles