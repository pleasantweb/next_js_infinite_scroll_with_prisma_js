import { Article } from "@prisma/client"
import { useEffect, useState } from "react"


const useArticleGet =(pageNumber:number)=>{
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [articleList,setArticleList] = useState<Article[]>([])
    const [hasMore,setHasMore] = useState(false)

   
    useEffect(()=>{
        const abortController = new AbortController()
        setLoading(true)
        setError(false)
        try{ 
            const fetchData = async()=>{
               
           
              const res=  await fetch(`/api/articleget/${pageNumber}`,{
                    method:"GET",
                    signal:abortController.signal
                })
            const  data = await res.json()
            const articles:Article[] = await data.articles
            
            
           
            setArticleList(prev=>(
                [...prev,...articles]
            ))
            setHasMore(articles.length > 0)
            setLoading(false)
            
            }
           
               
                fetchData()
        
               
        }catch(err){
            setError(true)
            setLoading(false)
            setHasMore(false)
        }   

       return ()=>{
           abortController.abort()
       }
        
    },[pageNumber])

    return {loading,error,articleList,hasMore}
}
export default useArticleGet;