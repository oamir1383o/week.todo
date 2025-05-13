//variables
const menuParent = document.getElementById('menuParent');
const menu = document.getElementsByClassName('menu')[0];
const addBTN = document.getElementById('addBTN');
const items = document.getElementsByClassName('items')[0];
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
    console.log(input);
    
    const div = document.createElement('div');
    items.append(div);
    div.className = "item" ;
    div.innerHTML = ` 
    <img class="heart" src="icons/lightHeart.png" >
    <p class="text"> ${input} </p>
    <div class="itemBTN">
    <button class= "itemBTN1"> ویرایش </button>
    <button class="itemBTN2"> حذف </button>
    </div>
    `
}