//variables
const menuParent = document.getElementById('menuParent');
const menu = document.getElementsByClassName('menu')[0];
const addBTN = document.getElementById('addBTN');
const items = document.getElementsByClassName('items')[0];
const pop = document.getElementById('pop');
const access = document.getElementsByClassName('access')[0];
//Events
menuParent.addEventListener("click" , openMenu);
closeBTN.addEventListener("click" , openMenu);
backBTN.addEventListener("click" , backPage);
addBTN.addEventListener("click" , add)
// برای باز کردن منو
function openMenu(){
    menu.classList.toggle('hidden');
    menuParent.style.display === "block" ? menuParent.style.display = "none": menuParent.style.display = "block";
}
// برای برگشتن به صفحه ی اول برنامه
function backPage(){
    window.location.href="index.html";
}

//برای اضافه کردن جایزه 
function add(){
    // بستن منو
    openMenu();
    // قطع دسترسی به صفحه پشت 
    access.classList.toggle('hidePage');
    //ساخت آیتم های مورد نیاز 
    const div = document.createElement('div');
    document.body.append(div);
    div.className = "addPage";
    div.innerHTML = `<input id="addinp" type="text" required placeholder="چه جایزه ای میخوای به خودت بدی؟ ">
    <div class="addPageBTN"> <input id="sub" type="submit" value="اضافه کن"> <input id="can" type="button" value="لغو"> </div>`
    const sub = document.getElementById('sub');
    const can = document.getElementById('can');

    sub.addEventListener('click' , create);

    can.addEventListener('click' , Close = () => {can.parentElement.parentElement.remove(); access.classList.toggle('hidePage');});
}


function create (e){
    const input = e.target.parentElement.parentElement.children[0].value
    if (input === ''){alert("چیزی ننوشتی که!")}
    else if (ls.findInd(input) !== undefined){alert("این جایزه رو قبلا نوشتی!")}else{
    access.classList.toggle('hidePage');    
    const div = document.createElement('div'); div.className = "item" ; items.append(div);
    const img = document.createElement("img") ; img.className = "heart" ; img.setAttribute("src" , "icons/lightHeart.png" ); div.append(img);
    const p = document.createElement("p") ; p.className = "text" ; p.innerHTML = input ; div.append(p);
    const div0 = document.createElement("div") ; div0.className = "itemBTN" ;  div.append(div0);
    const Edit = document.createElement("button") ; Edit.className = "itemBTN1" ; Edit.innerHTML = "ویرایش" ; div0.append(Edit);
    const Del = document.createElement("button") ; Del.className = "itemBTN2" ; Del.innerHTML = "حذف" ; div0.append(Del);
    e.target.parentElement.parentElement.remove();
    Edit.addEventListener("click" , edit);
    Del.addEventListener("click" , del);
    img.addEventListener("click" , heart);
    ls.setData(input , false);
}}


function edit(e){
     // قطع دسترسی به صفحه پشت 
    access.classList.toggle('hidePage');

    let p = e.target.parentElement.parentElement.children[1];
    const text = e.target.parentElement.parentElement.children[1].textContent;
    const div = document.createElement('div'); div.className = 'del edit' ; document.body.append(div);
    const inp = document.createElement('input'); inp.className = 'editInp'; inp.setAttribute('value' , text); div.append(inp);
    const div0 = document.createElement("div") ; div0.className = "addPageBTN" ;  div.append(div0);
    const sub = document.createElement("input") ; sub.id = 'sub'; sub.setAttribute("type" , "submit"); sub.setAttribute("value" , "ثبت"); div0.append(sub); 
    const can = document.createElement("input") ; can.id = 'can'; can.setAttribute("type" , "button"); can.setAttribute("value" , "لغو"); div0.append(can); 
    
    can.addEventListener("click" , Close = () => {can.parentElement.parentElement.remove(); access.classList.toggle('hidePage');})
    
    sub.addEventListener("click" , editing);

    function editing(){
        if (inp.value === ""){alert("فیلد خالیه!")}
        else if (ls.findInd(inp.value) !== undefined){alert("این جایزه رو قبلا نوشتی!")}
        else{
        access.classList.toggle('hidePage');
        p.innerHTML = inp.value;
        ls.edit(text , inp.value);
        can.parentElement.parentElement.remove();
    }}
    
}

function del(e){

    access.classList.toggle('hidePage');
    const item = e.target.parentElement.parentElement ;
    const text = e.target.parentElement.parentElement.children[1].textContent;
    const div = document.createElement('div'); div.className = 'del' ; document.body.append(div);
    const p = document.createElement('p'); p.className = 'delText'; p.innerHTML = `  آیا از حذف "${text}" اطمینان داری؟  `; div.append(p);
    const div0 = document.createElement("div") ; div0.className = "addPageBTN" ;  div.append(div0);
    const sub = document.createElement("input") ; sub.id = 'sub'; sub.setAttribute("type" , "submit"); sub.setAttribute("value" , "آره!"); div0.append(sub); 
    const can = document.createElement("input") ; can.id = 'can'; can.setAttribute("type" , "button"); can.setAttribute("value" , "لغو"); div0.append(can); 
    
        
    can.addEventListener("click" , Close = () => {can.parentElement.parentElement.remove(); access.classList.toggle('hidePage'); });
    sub.addEventListener("click" , deleting)

    function deleting(){
        access.classList.toggle('hidePage');
        item.remove();
        ls.deleteData(text);
        can.parentElement.parentElement.remove();
    }
}

function heart(e){
    const text = e.target.parentElement.children[1].textContent;
    if(e.target.getAttribute('src') === "icons/lightHeart.png"){
        e.target.setAttribute("src" , "icons/heart.png" );
        e.target.classList.toggle('fulHeart');
        pop.currentTime = 0.45;
        pop.play();
        ls.change(text , true);
    }else{
        e.target.setAttribute("src" , "icons/lightHeart.png" );e.target.classList.toggle('fulHeart');
        ls.change(text , false);
    }
}


const ls = {
    findInd: function(text){
        const dataArray = ls.getData();
        for (var i = 0; i < dataArray.length; i++){
        if (dataArray[i][0] === text){return i ;}
        }

    }
,
    getData: function(){
        let dataArray ;
        const dataString = localStorage.getItem("gift");
        dataString === null ? dataArray = [] : dataArray = JSON.parse(dataString);
        return dataArray;
     }
,
    setData: function(input , heart){
        const item = [input , heart]
        const dataArray = ls.getData();
        dataArray.push(item);
        localStorage.setItem("gift" , JSON.stringify(dataArray));
     }
,
    change: function(text , val){
        const dataArray = ls.getData();
        const index = ls.findInd(text);
        dataArray[index][1] = val;
        localStorage.setItem("gift" , JSON.stringify(dataArray));
        }
,
    showData: function(){
        const dataArray = ls.getData();
        for (var i = 0; i < dataArray.length; i++){
            ls.createAgain(dataArray[i][0] , dataArray[i][1])
        }
    }
,
    createAgain: function(text , val){
    const div = document.createElement('div'); div.className = "item" ; items.append(div);
    const img = document.createElement("img") ; img.className = "heart" ; div.append(img);
    val === true? img.setAttribute("src" , "icons/heart.png") : img.setAttribute("src" , "icons/lightHeart.png" );
    val === true? img.classList.toggle('fulHeart'): undefined;
    const p = document.createElement("p") ; p.className = "text" ; p.innerHTML = text ; div.append(p);
    const div0 = document.createElement("div") ; div0.className = "itemBTN" ;  div.append(div0);
    const Edit = document.createElement("button") ; Edit.className = "itemBTN1" ; Edit.innerHTML = "ویرایش" ; div0.append(Edit);
    const Del = document.createElement("button") ; Del.className = "itemBTN2" ; Del.innerHTML = "حذف" ; div0.append(Del);
    Edit.addEventListener("click" , edit);
    Del.addEventListener("click" , del);
    img.addEventListener("click" , heart);
    }
,
    deleteData: function(text){
        const dataArray = ls.getData();
        const index = ls.findInd(text);
        dataArray.splice(index , 1);
        localStorage.setItem("gift" , JSON.stringify(dataArray));
    }
,
    edit: function(text , newText){
        const dataArray = ls.getData();
        const index = ls.findInd(text);
        dataArray[index][0] = newText ;
        localStorage.setItem("gift" , JSON.stringify(dataArray));
    }
}

document.addEventListener("DOMContentLoaded" , ls.showData);