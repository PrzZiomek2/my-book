import { getApiData } from '@/utils/handlers';
import { urls } from '@/utils/urls';
import React from 'react'

const {rootPath} = urls();  

export default async function Ranking() {
   const books = await fetch(`${rootPath}/api/ranking`, {cache: "no-cache"}).then(res => res.json()); 
   console.log({books});
   
  return (
    <div>Ranking</div>
  )
}
