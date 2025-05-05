import { getAllNews, patchNews, patchView } from "./service.js";
// $(()=>{
//     const $langDiv = $('#langDiv'); // Elementi önceden seçerek performansı artırıyoruz

// import { getAllNews } from "./service";

    
//     // Dil butonu için toggle fonksiyonu
//     $('#btnLang').click(() => {
//         $langDiv.stop(true, true).slideToggle(300, () => {
//             // Animasyon tamamlandığında yapılacak işlemler
//             if ($langDiv.is(':visible')) {
//                 $langDiv.css('z-index', '1000'); // Görünürken z-index ayarla
//             }
//         });
//     });
    
//     // Kapatma butonu
//     $('#btnMulti').click(() => {
//         $langDiv.stop(true, true).slideUp(300);
//     });
    
//     // Dışarı tıklayınca kapatma
//     $(document).mouseup((e) => {
//         if (!$langDiv.is(e.target) && $langDiv.has(e.target).length === 0) {
//             $langDiv.slideUp(300);
//         }
//     });
// })

let flag = true
$(document).ready(function () {
    $('#langDiv').css({
        display: 'none'
    });
    $('#barDiv').css({
        display: 'none'
    });
    $('#az').css({
        backgroundColor: '#1e293b',
        color: '#FFF'
    });
    $('#btnLang').click(function () { 
        $('#langDiv').fadeIn('500');
        $('#headerDiv1').css({
            display : 'none'
        });
    });
    $('#btnMulti').click(function () {
        $('#langDiv').fadeOut('500');
        $('#headerDiv1').css({
            display : 'flex'
        });
    });
    $('#az, #ru, #tr').click(function() {
        $('#az, #ru, #tr').css({
            backgroundColor: '#fff',
            color: '#1e293b'
        });
        
        $(this).css({
            backgroundColor: '#1e293b',
            color: '#FFF'
        });
        
        $('#btnLang').text(`${this.innerHTML} ⏷`);
        $('#langDiv').fadeOut('500');
    });
    $('#barI').click(function () {
        if(innerWidth < 768){
            $('#barDiv').fadeIn('500');
            $('#headerDiv1').css({
                display : 'none'
            });
        }
        else if(innerWidth > 768){
            $("#desktopHamMenu").slideToggle("1000");
            $('#barI').text(flag ? '×' : '☰');
            flag = !flag;
        }
        else{
            $('#barDiv').hide();
            $('#headerDiv1').css({
                display : 'flex'
            });
        }
    });
    $('#btnMulti2').click(function () {
        $('#barDiv').fadeOut('500');
        $('#headerDiv1').css({
            display : 'flex'
        });
    });

    function checkScreenWidth() {
        if (window.innerWidth < 768) {
            $('#fixedBar').hide(); // Elementi gizlədir
        } else {
            $('#fixedBar').show(); // Elementi göstərir
        }
    }

    // Səhifə yüklənəndə yoxla
    checkScreenWidth();

    // Pəncərənin ölçüsü dəyişdikdə yoxla
    $(window).on('resize', checkScreenWidth); 
});

const scrollBox1 = document.getElementById('scrollBox1'); 
const scrollBox2 = document.getElementById('scrollBox2'); 

window.scroll_left = function () {
  scrollBox1.scrollLeft -= 150; // sola 50px sürüş
  scrollBox2.scrollLeft -= 150; // sola 50px sürüş
}

window.toRight =  function () {
    toLeftBtn.style.display = 'flex'
    toLeftBtn2.style.display = 'flex'
  scrollBox1.scrollLeft += 150; // sağa 50px sürüş
  scrollBox2.scrollLeft += 150; // sağa 50px sürüş
}
let data = []
const tbody = document.querySelector('tbody')
async function getData() {
    data = await getAllNews()
    console.log(data);
    printCards()
}
getData()


const cards = document.getElementById('cards')
function printCards() {
    cards.innerHTML = ''
    console.log(data);
    data.forEach(item =>{
        // 
        cards.innerHTML += `<div class="lg:max-w-xs md:max-w-[15rem] transition-all duration-300 group hover:shadow-xl hover:cursor-pointer rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
        <img src="${item.img}" alt="" class="object-cover object-center w-full rounded-t-md h-52 dark:bg-gray-500">
        <div class="flex flex-col justify-between p-3 space-y-8">
                                <div class="flex justify-between">
                                <p class="text-[#888]"><i class="fa-solid fa-calendar-days"></i> <span>${item.date} </span></p>
                                <p class="text-[#888]"><i class="fa-regular fa-eye text-sm "> </i><span>${item.view}</span></p>
                                </div>
                                <div class="space-y-2">
                                <h2 onclick="makeView(${item.view}, '${item.id}')" class="text-xl text-[#051D39] font-semibold tracking-wide group-hover:underline">${item.content}...</h2>
                                </div>
                                <div class="flex justify-between">
                                <p class="text-[#1a939c]">${item.title}</p>
                                <div class="flex gap-3">
                                <p id="like-${item.id}" onclick=" makeLike('${item.id}', ${item.like}, ${true})" class="flex justify-center items-center gap-1 "><i class="hover:text-[#1a939c]  cursor-pointer fa-regular fa-thumbs-up"></i> <span>${item.like}</span></p>
                                <p id="dislike-${item.id}" onclick=" makeLike('${item.id}', ${item.dislike})"  class="flex justify-center items-center gap-1 "><i class="hover:text-red-500  cursor-pointer fa-regular fa-thumbs-down"></i> <span>${item.dislike}</span></p>
                                        </div>
                                        </div>
                                        
                                        </div>
                                        </div>`
    })
    
    data.forEach(obj => {       
        const vote = localStorage.getItem(`voted-${obj.id}`);
        const likeBtn = document.getElementById(`like-${obj.id}`);
        const dislikeBtn = document.getElementById(`dislike-${obj.id}`);
    
        if (vote === "like" && likeBtn) {
            likeBtn.style.color = "#1894a0";
        } else if (vote === "dislike" && dislikeBtn) {
            dislikeBtn.style.color = "#f66ba6";
        }
    });
}
// let liker 
window.makeLike = async function (id, num, isLike) {
    // let like = data.find(item => item.id == id).like     
    if (localStorage.getItem(`voted-${id}`)) {
        return; // artıq səs verib
    }
    let obj
    if (isLike) {
        obj = {
            like: num+1
        };
        localStorage.setItem(`voted-${id}`, "like");
    } else {
        obj = {
            dislike: num+1
        };
        localStorage.setItem(`voted-${id}`, "dislike");
    }
    
    await patchNews(id, obj)

    // localStorage.setItem(`voted-${id}`, true);

    data = await getAllNews()
    printCards()
    
    
}
window.makeView = async  function (num, id) {
    console.log(num,id);
    let obj
    obj ={
        view: num+1
    }
    await patchView(id, obj)
    await getData()
    // window.location.href = `http://127.0.0.1:5502/detail.htm?id=${id}`
    window.location.href = `https://oxu-azbyrashid-git-main-rashids-projects-6ffc1934.vercel.app/detail.htm?id=${id}`





    
}



                                