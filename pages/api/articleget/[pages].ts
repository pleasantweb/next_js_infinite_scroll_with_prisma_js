import { Article } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from '../../../lib/prisma'

type Data = {
    message?: string,
    articles?:Article[]
}

const pages=async(req: NextApiRequest, res: NextApiResponse<Data>)=>{
    const {pages} = req.query
    const pageNumber = parseInt(pages.toString())

    try{
        const articles = await prisma.article.findMany({
            skip:3*pageNumber,
            take:3
        })
        return res.status(200).json({articles:articles })
    }catch(err){
        return res.status(400).json({message:"Bad Request"})
    }
}
export default pages;