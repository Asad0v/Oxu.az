import { getAllNews, patchNews } from "./service.js"
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
            display: 'none'
        });
    });
    $('#btnMulti').click(function () {
        $('#langDiv').fadeOut('500');
        $('#headerDiv1').css({
            display: 'flex'
        });
    });
    $('#az, #ru, #tr').click(function () {
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
        if (innerWidth < 768) {
            $('#barDiv').fadeIn('500');
            $('#headerDiv1').css({
                display: 'none'
            });
        }
        else if (innerWidth > 768) {
            $("#desktopHamMenu").slideToggle("1000");
            $('#barI').text(flag ? '×' : '☰');
            flag = !flag;
        }
        else {
            $('#barDiv').hide();
            $('#headerDiv1').css({
                display: 'flex'
            });
        }
    });
    $('#btnMulti2').click(function () {
        $('#barDiv').fadeOut('500');
        $('#headerDiv1').css({
            display: 'flex'
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

const scrollBox = document.getElementById('scrollBox');

window.scroll_left = function () {
    scrollBox.scrollLeft -= 150; // sola 50px sürüş
}

window.toRight = function () {
    toRightBtn.style.display = 'flex'
    scrollBox.scrollLeft += 150; // sağa 50px sürüş
}

let data = []
let sortView = []
const cardDet = document.getElementById('cardDet')
const cardCont = document.getElementById('cardCont')
const mostView = document.getElementById('mostView')
async function getData() {
    data = await getAllNews()
    printDet()
    printMostView()
}
getData()
// console.log(sortView);




function printDet() {
    cardDet.innerHTML = ""
    cardCont.innerHTML = ""
    const query = window.location.search
    const params = new URLSearchParams(query)
    const id = params.get('id')
    // console.log(id)
    const obj = data.find(item => item.id == id)

    // console.log(obj);
    cardDet.innerHTML = `
                            <div class="w-full   ">
                                <div class="flex justify-between border-b">
                                <div class="flex items-center">
                                    <!-- Buraya başlıq və ya icon əlavə oluna bilər -->
                                </div>
                                </div>
                                <div class="space-y-4">
                                <div class="space-y-2">
                                    <img src="${obj.img}" alt="" class="object-cover object-center w-full h-[420px] dark:bg-gray-500">
                                    <div class="flex flex-col sm:flex-row justify-start sm:justify-between sm:items-center p-3 ">
                                        <p class="text-sm md:text-md text-black font-semibold">
                                            <a href="">Ana səhifə</a> /
                                            <span>${obj.title}</span>
                                        </p>
                                        <p class="flex justify-between gap-2 ">
                                            <span>Tarix: ${obj.date}</span>
                                            <span><i class="fa-regular fa-eye"></i> ${obj.view}</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="space-y-2">
                                    <a rel="noopener noreferrer" href="#" class="block">
                                    
                                    </a>
                                    <p class="leading-snug text-[20px] md:text-[30px] font-semibold p-2">${obj.content}</p>
                                </div>
                                </div>
                            </div>
                            `
    cardCont.innerHTML += `
                                <div class="w-full p-2 flex flex-col gap-3">
                                    <div class="flex justify-start items-center gap-5">
                                        <p onclick=" makeLike('${obj.id}', ${obj.like}, ${true})" class="flex justify-start cursor-pointer items-center gap-1 sm:text-lg md:text-md lg:text-lg"><i class="fa-regular fa-thumbs-up"></i>${obj.like}</p>
                                        <p onclick=" makeLike('${obj.id}', ${obj.dislike})" class="flex justify-start cursor-pointer items-center gap-1 sm:text-lg md:text-md lg:text-lg"><i class="fa-regular fa-thumbs-down"></i>${obj.dislike}</p>
                                        </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at egestas massa, eu luctus risus. Duis in ornare lectus. Proin.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus, nisi non aliquet finibus, orci dolor malesuada elit, a viverra nibh erat at dolor. Mauris ac ex ante. Sed id diam in lectus interdum egestas. Vivamus dolor nunc, aliquam sed finibus eu, ultrices non orci. Aenean dignissim congue leo, nec.</p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut turpis orci, imperdiet lacinia ligula nec, tincidunt maximus tellus. Cras quis hendrerit sapien. Suspendisse potenti. Nullam a lorem nec arcu pellentesque varius. Vivamus suscipit dolor a nulla pulvinar sollicitudin. Sed ex metus, varius nec consectetur ut, 
                                        fringilla at massa. Morbi ut turpis ut nisl tempor condimentum. Proin varius ex non odio viverra pulvinar. Vestibulum eleifend, tellus eu facilisis placerat, odio dui accumsan orci, ac congue elit leo nec ligula. Phasellus consequat vestibulum rutrum. Mauris ex risus, cursus sit amet finibus eget, luctus ut risus. 
                                        Praesent libero lorem, imperdiet et tortor sit amet, feugiat suscipit justo. Cras a elit porttitor nunc vehicula eleifend sit amet sed mi. Mauris nisl lectus, volutpat eget fringilla eget, varius vel ipsum. Nulla iaculis lacus vel nibh porta vehicula. Maecenas in pharetra nulla. Curabitur elementum ex eget tellus 
                                        placerat pellentesque. Nulla condimentum quis arcu at viverra. Maecenas.
                                    </p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at egestas massa, eu luctus risus. Duis in ornare lectus. Proin.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus, nisi non aliquet finibus, orci dolor malesuada elit, a viverra nibh erat at dolor. Mauris ac ex ante. Sed id diam in lectus interdum egestas. Vivamus dolor nunc, aliquam sed finibus eu, ultrices non orci. Aenean dignissim congue leo, nec.</p>
                                
                                
                                
                                    </div>
                            `
   
}


async function printMostView() {
    mostView.innerHTML = ""
    sortView = data.sort((a,b) => b.view - a.view)
    // console.log(sortView); 
    sortView
    .splice(0,5)
    .forEach(item => {

        mostView.innerHTML += `
                                    <div class="bg-[#FAFAF9] p-4">
                                                                <div class="flex items-center justify-start gap-6 text-[0.8rem]  py-3">
                                                                    <p class="text-[#777] flex items-center justify-start gap-2"><i class="fa-solid fa-calendar-days "></i><span>${item.date}</span></p>
                                                                    <p class="text-[#777] flex items-center justify-start gap-2"><i class="fa-regular fa-eye"></i> <span>${item.view}</span></p>
                                                                </div>
                                                                <div class="flex items-center justify-start gap-2">
                                                                    <div class="bg-[#F8E07F] p-1 rounded-lg text-white text-sm"> <i class="fa-regular fa-bell"></i></div>
                                                                    <div class="bg-[#A8D287] p-1 rounded-lg text-white text-sm flex items-center justify-center gap-2"> <i class="fa-solid fa-video"></i> <span>video</span></div>
                                                                </div>
                                                                <p class="text-xl font-semibold">${item.content}</p>
                                                            </div>
                                `
    })
}

window.makeLike = async function (id, num, isLike) {
    // let like = data.find(item => item.id == id).like     
    
    let obj
    if (isLike) {
        obj = {
            like: num+1
        }
    } else {
        obj = {
            dislike: num+1
        }
    }
    
    await patchNews(id, obj)
    await getData()
    
    // data.push(newLikedata)
    // console.log(id);
    
}










/* 
<div class="flex justify-between  border-bottom">
                                    <div class="flex items-center">
                                        
                                        </div>
                                </div>
<a rel="noopener noreferrer" href="#" class="mb-0 capitalize dark:text-gray-800">${obj.title}</a>
<a rel="noopener noreferrer" href="#"> <i class="fa-regular fa-eye"></i> ${obj.view}</a>
<h3 class="text-xl font-semibold dark:text-violet-600">${obj.title}</h3>


*/
