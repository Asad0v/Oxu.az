import { createNews, deleteNewsById, getAllNews, updateNews } from "./service.js";
let data = []
const tbody = document.querySelector('tbody')
const form = document.querySelectorAll('#form input' )
const categorySec = document.querySelector('#categorySec')
const editModal = document.querySelector('#editModal')
const editInps = document.querySelectorAll('#editModal input')
async function getData() {
    data = await getAllNews()
    console.log(data);
    printTable()
}
getData()
function printTable(){
    tbody.innerHTML =" "
    data.forEach(news =>{
        tbody.innerHTML += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
        <th scope="row" class="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        ${news.title}
        </th>
        <td class="px-6 py-1">
        ${news.content}
        </td>
        <td class="px-6 py-1">
        ${news.category}
        </td>
        <td class="px-6 py-1">
        ${news.like}, ${news.dislike}, ${news.view}
        </td>
        <td class="w-[150px] ">
        <img class="w-full h-[150px] object-cover" src="${news.img}"  />
        
        </td>
        <td class="px-6 py-1">
        ${news.date}
        </td>
        <td class="px-6 py-1 flex justify-center items-center pt-16 gap-2">
            <i   onclick ="  handleModal(${true} , ${news.id})"  class="text-[20px] cursor-pointer  text-[green] fa-solid fa-pen-to-square"></i>
            <i onclick="handleDelete('${news.id}')" class="text-[20px] cursor-pointer  text-[red] fa-solid fa-trash-can"></i>
        </td>
        </tr>`
    })
}

window.handleDelete = async function (id) {
    await deleteNewsById(id)
     data = data.filter(item => item.id != id)
     printTable()
    
}
let globId 
window.handlePost =async function (){
    data = data.filter(item => item.id != globId)
   const news = getVal()  
   console.log(news);
   
   const resNews = await createNews(news)  
   console.log(resNews);
   
   if(resNews){
       data.push(resNews)

   }
   printTable()
}


function getVal() {
    const news = {
        title:form  [0].value,
        img: form   [1].value,
        date: form  [2].value,
        content: tinymce.get('mytextarea').getContent(),
        category: categorySec.value,
        like:0,
        dislike:0,
        view:0,
    }
    return news
}
function getVal2() {
    const editNews = {
        title:  editInps[0].value,
        img:    editInps[1].value,
        date:   editInps[2].value,
        category:    editInps[3].value,
        content:   editInps[4].value,
    }
    return editNews
}
window.handleEdit = async () =>{ 
    editModal.style.display = 'none '
    const editObj = getVal2()
    console.log(editObj);
    data = data.filter(item => item.id != editId)
    updateNews(editId, editObj)
   const  editNews = await updateNews(editId, editObj)
    if(editNews){
        data.push(editNews)
    }
    printTable()

}
let editId 
window.handleModal = (status , id) => {
    window.scrollTo(0, 0);
    editId = id
    editModal.style.display = status ? 'flex' : 'none'
   const elem =  data.find(item => item.id == id)
   console.log(editInps);

   editInps[0].value = elem.title
   editInps[1].value = elem.img
   editInps[2].value = elem.date
   editInps[3].value = elem.categ
   editInps[4].value = elem.content
   
}

