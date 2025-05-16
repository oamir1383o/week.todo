//variables
const menuParent = document.getElementById('menuParent');
const menu = document.getElementsByClassName('menu')[0];
const addBTN = document.getElementById('addBTN');
const items = document.getElementsByClassName('items')[0];
const pop = document.getElementById('pop');
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
    window.location.href="index.html"
}

//برای اضافه کردن جایزه 
function add(){
    //ساخت آیتم های مورد نیاز 
    const div = document.createElement('div');
    document.body.append(div);
    div.className = "addPage";
    div.innerHTML = `<input id="addinp" type="text" required placeholder="چه جایزه ای میخوای به خودت بدی؟ ">
    <div class="addPageBTN"> <input id="sub" type="submit" value="اضافه کن"> <input id="can" type="button" value="لغو"> </div>`
    const sub = document.getElementById('sub');
    const can = document.getElementById('can');

    sub.addEventListener('click' , create);
    can.addEventListener('click' , Close = () => can.parentElement.parentElement.remove());
    
     

}

function create (e){
    const input = e.target.parentElement.parentElement.children[0].value
    if (input === ''){alert("چیزی ننوشتی که!")}else{
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
}}

function edit(e){
    let p = e.target.parentElement.parentElement.children[1];
    const text = e.target.parentElement.parentElement.children[1].textContent;
    const div = document.createElement('div'); div.className = 'del edit' ; document.body.append(div);
    const inp = document.createElement('input'); inp.className = 'editInp'; inp.setAttribute('value' , text); div.append(inp);
    const div0 = document.createElement("div") ; div0.className = "addPageBTN" ;  div.append(div0);
    const sub = document.createElement("input") ; sub.id = 'sub'; sub.setAttribute("type" , "submit"); sub.setAttribute("value" , "ثبت"); div0.append(sub); 
    const can = document.createElement("input") ; can.id = 'can'; can.setAttribute("type" , "button"); can.setAttribute("value" , "لغو"); div0.append(can); 
    
    can.addEventListener("click" , Close = () => can.parentElement.parentElement.remove());
    sub.addEventListener("click" , editing);

    function editing(){
        if (inp.value === ""){alert("فیلد خالیه!")}else{
        p.innerHTML = inp.value;
        can.parentElement.parentElement.remove();
    }}
    
}

function del(e){
    const item = e.target.parentElement.parentElement ;
    const text = e.target.parentElement.parentElement.children[1].textContent;
    const div = document.createElement('div'); div.className = 'del' ; document.body.append(div);
    const p = document.createElement('p'); p.className = 'delText'; p.innerHTML = `  آیا از حذف "${text}" اطمینان داری؟  `; div.append(p);
    const div0 = document.createElement("div") ; div0.className = "addPageBTN" ;  div.append(div0);
    const sub = document.createElement("input") ; sub.id = 'sub'; sub.setAttribute("type" , "submit"); sub.setAttribute("value" , "آره!"); div0.append(sub); 
    const can = document.createElement("input") ; can.id = 'can'; can.setAttribute("type" , "button"); can.setAttribute("value" , "لغو"); div0.append(can); 
    
    can.addEventListener("click" , Close = () => can.parentElement.parentElement.remove());
    sub.addEventListener("click" , deleting)

    function deleting(){
        item.remove();
        can.parentElement.parentElement.remove();
    }
}

function heart(e){
    if(e.target.getAttribute('src') === "icons/lightHeart.png"){
        e.target.setAttribute("src" , "icons/heart.png" );
        e.target.classList.toggle('fulHeart');
        pop.currentTime = 0.45;
        pop.play()
    }else {e.target.setAttribute("src" , "icons/lightHeart.png" );e.target.classList.toggle('fulHeart');}
}