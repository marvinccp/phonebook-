import http from './http'


const getCategories = async () => {

  const categories =  await http.get('/categories')
  
  const sortCategories = categories.data.sort((a,b) => a.id - b.id)
  console.log(sortCategories);
  return sortCategories;
  
}


export default getCategories