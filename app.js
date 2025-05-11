// variables
const menuParent = document.getElementById('menuParent');
const menu = document.getElementsByClassName('menu')[0];
const darsad = document.getElementById('darsad');
const closeBTN = document.getElementById('closeBTN');
const addBTN = document.getElementById('addBTN');
const addMenu = document.getElementsByClassName('add')[0];
const backBTN = document.getElementById('backBTN');
const inp1 = document.getElementById('one');
const inp2 = document.getElementById('two');
const inp3 = document.getElementById('three');
const inp4 = document.getElementById('four');
const inp5 = document.getElementById('five');
const submit = document.getElementById('sub');
const items = document.getElementsByClassName('items')[0];

//Events
addBTN.addEventListener("click" , openAdd );
backBTN.addEventListener("click" , backPage);
submit.addEventListener("click" , limit);
menuParent.addEventListener("click" , openMenu);
closeBTN.addEventListener("click" , openMenu);
//functions
// برای باز کردن منو
function openMenu(){
    menu.classList.toggle('hidden');
    menuParent.style.display === "block" ? menuParent.style.display = "none": menuParent.style.display = "block";
    darsad.style.display === "flex" ? darsad.style.display = "none": darsad.style.display = "flex";
}
// برای باز کردن منوی وارد کردن اطلاعات ماموریت
function openAdd(){
addMenu.classList.toggle('hidden');
if(addBTN.getAttribute('src') === 'icons/add.png'){
addBTN.setAttribute('src', 'icons/close.png');
addBTN.style.boxShadow = '2px 2px 4px inset';}
else {
    addBTN.setAttribute('src', 'icons/add.png');
    addBTN.style.boxShadow = 'none';}
}
// برای برگشتن به صفحه ی اول برنامه
function backPage(){
    window.location.href="index.html"
}
// برای محدودیت های ورودی ها
function limit(){
    const a = inp2.value.length
    const b = inp4.value.length
    let yekaWord = inp3.value.split(' ').length;
    let nameWord = inp1.value.split(' ').length;
    if (a > 2 || b > 2 ||
        inp1.value === "" ||
        inp2.value === "" || inp2.value < 1 ||
        inp3.value === "" ||
        inp4.value === "" || inp4.value < 1 ||
        inp5.value === "" 
        ){
        alert("  واحد و تکرار نمیتوانند بیشتر از 2 رقم، منفی، خالی یا اعشاری باشند همچنین تمام فیلد ها باید پر شوند. ")}
    else if (yekaWord > 1){alert(' یکا نمیتواند بیشتر از یک کلمه باشد ')}
    else if (nameWord > 3){alert('نام ماموریت نمیتواند بیشتر از 3 کلمه باشد ')}
    else { creatItem();addMenu.classList.toggle('hidden');
            addBTN.setAttribute('src', 'icons/add.png');
            addBTN.style.boxShadow = 'none';
}
}

// برای ساختن یک ماموریت هفتگی با اطلاعاتی که کاربر داده
function creatItem(){
    // ساخت دیو و اسپن اول
    const newItem = document.createElement('div');
    newItem.setAttribute('class', 'item');
    newItem.style.order = -Number(inp5.value);
    items.append(newItem);
    const span1 = document.createElement('span');
    span1.setAttribute('class', 'itemInfo');
    newItem.append(span1);
    // ساخت دکمه ی افزایش و کاهش
    const plusBTN = document.createElement('img');
    plusBTN.setAttribute('class', 'plus');
    plusBTN.setAttribute('src', 'icons/plus.png');
    span1.append(plusBTN);
    const subtracBTN = document.createElement('img');
    subtracBTN.setAttribute('class', 'subtrac');
    subtracBTN.setAttribute('src', 'icons/subtrac.png');
    span1.append(subtracBTN);
    // قرار دادن اطلاعات ماموریت در اسپن اول
    const p = document.createElement('p');
    const inp = inp2.value*inp4.value ;
    p.append(inp + ' ' , inp3.value + " " , inp1.value);
    p.setAttribute('class' , 'textInfo');
    span1.append(p);
    // ساخت دکمه ی حذف و ویرایش
    const editBTN = document.createElement('img');
    editBTN.setAttribute('class' , 'edit')
    editBTN.setAttribute('src' , 'icons/edit.png');
    span1.append(editBTN);
    const delBTN = document.createElement('img');
    delBTN.setAttribute('class' , 'del')
    delBTN.setAttribute('src' , 'icons/delete.png');
    span1.append(delBTN);
    // ساخت اسپن دوم با اطلاعاتی که کاربر داده
    const span2 = document.createElement('span');
    span2.setAttribute('class', 'navar');
    span2.style.gridTemplateColumns= 'repeat('+inp4.value+', 1fr)';
    newItem.append(span2);
    // تعاملی کردن دکمه های ساخته شده
    plusBTN.addEventListener('click' , plus);
    subtracBTN.addEventListener('click' , subtrac);
    editBTN.addEventListener('click' , edit);
    delBTN.addEventListener('click' , del);
    // Local Storage
    const obj = {
        i1: inp1.value,
        i2: inp2.value,
        i3: inp3.value,
        i4: inp4.value,
        i5: inp5.value,
        i6: 0
    } ;
    ls.setData(obj);
    // پاک کردن ورودی ها
    inp1.value = "";
    inp2.value = "";
    inp3.value = "";
    inp4.value = "";
    inp5.value = "";
}


// تابع کمکی گرفتن مقادیر آیتم
function helper(e){
    const pTag = e.target.parentElement.children[2]
    const p = e.target.parentElement.children[2].textContent.split(' ') ;
    switch (p.length){
        case 3 : var name = p[2]; break;
        case 4 : var name = `${p[2]} ${p[3]}`; break;
        case 5 : var name = `${p[2]} ${p[3]} ${p[4]}`; break;}
    const yeka = p[1];
    const span2 = e.target.parentElement.parentElement.children[1];
    const num0 = span2.style.gridTemplateColumns;
    const tekrar = Number(num0.match(/\d{1,3}/)[0]);
    const vahed = Number(p[0])/tekrar;
    const olaviyat = -e.target.parentElement.parentElement.style.order
    const Obj = { name , vahed , yeka , tekrar , olaviyat};
    const haveDiv = e.target.parentElement.parentElement.children[1].children.length
    // دستگاه تشخیص اعداد تا 3 رقم برای ظرفیت اسپن دوم
    const num1 = Number(num0.match(/\d{1,3}/)[0]);
    const items = {pTag , p , name , yeka , span2 , num0 , tekrar , vahed , olaviyat , Obj , haveDiv , num1} 
    return items
}


// تابع دکمه ی افزایش
function plus(e){
    const {p , span2 , Obj , haveDiv , num1} = helper(e) ;
    // اگه نوار وظیفه وجود نداره با اولین کلیک رو دکمه ی افزایش یدونه بساز
    if(haveDiv === 0){
        const div = document.createElement('div');
        div.setAttribute('class' , 'fraktion');
        div.style.gridColumn = "span 1";
        span2.append(div);
        percent(span2 , num1 , 0, p);
        // اگه ظرفیت کلا یدونه بود، مستقیم نوار وظیفه ی ساخته شده رو طلایی کن
        if (num1 === 1) {span2.children[0].style.backgroundColor = "goldenrod" }
        //Local Storage
        ls.setDone(Obj , 1)
    // اگه نوار وظیفه وجود داشت، اونو یه واحد بیشتر کن
    }else{
        // دستگاه تشخیص اعداد تا 3 رقم برای مقدار نوار وظیفه
        const num = span2.children[0].style.gridColumn;
        const num2 = Number(num.match(/\d{1,3}/)[0]);
        // اگه نوار وظیفه از ظرفیتش کمتر بود یدونه بیشترش کن
        if (num2 < num1-1){
        let newNum = num2+1;
        span2.children[0].style.gridColumn = `span ${newNum}`;
        percent(span2 , num1 , num2, p);
        ls.setDone(Obj , newNum);
        // وقتی ظرفیت نوار وظیفه پر شد، رنگشو عوض کن
        }else if (num2 < num1){
        let newNum = num2+1;
        span2.children[0].style.gridColumn = `span ${newNum}`;
        span2.children[0].style.backgroundColor = "goldenrod";
        percent(span2 , num1 , num2 , p);
        ls.setDone(Obj , newNum);
        }
    }
}


// تابع دکمه ی کاهش 
function subtrac(e){
    const {p , span2 , Obj , haveDiv , num1} = helper(e);
    // اگه نوار وظیفه وجود داشت یه واحد کمترش کن
    if (haveDiv !== 0){
        // دستگاه تشخیص اعداد تا 3 رقم برای مقدار نوار وظیفه
        const num = span2.children[0].style.gridColumn;
        const num2 = Number(num.match(/\d{1,3}/)[0]);
        // اگه ظرفیت پر بود، موقع کم کردن، رنگ نوار رو برگردون
        if (num2 === num1 && num1 !== 1){
        const newNum = num2-1;
        span2.children[0].style.gridColumn = `span ${newNum}`;
        span2.children[0].style.backgroundColor = "blue";
        percent(span2 , num1 , newNum-1 , p);
        ls.setDone(Obj , newNum);
        // اگه نوار وظیفه فقط یدونه پر بود، کلا حذفش کن
        }else if (num2 === 1){
            span2.children[0].remove();
            ls.setDone(Obj , 0);
        // اگه هیچکدوم از دو شرط بالا رو نداشت، فقط یدونه کمش کن
        }else{
        const newNum = num2-1;
        span2.children[0].style.gridColumn = `span ${newNum}`;
        percent(span2 , num1 , newNum-1, p);
        ls.setDone(Obj , newNum);
        }
    }
}


// درصد گیری وظایف
function percent(span2 , num1 , num2 , p){
var vahed = p[0]/num1;
var num = num2+1;
span2.children[0].innerHTML= `${vahed*num} ${p[1]} (%${Math.floor((num/num1)*100)})`
}


// درصد کل وظایف 
function allPer(){
    ls.getData
}


// تابع دکمه ی ویرایش 
function edit(e){
    const {pTag , name , yeka , span2 , tekrar , vahed , olaviyat , Obj } = helper(e);
    // ساخت تمام عنصر های لازم
    var editPage = document.createElement('div');
    var p1 = document.createElement('p');
    var p2 = document.createElement('p');
    var p3 = document.createElement('p');
    var p4 = document.createElement('p');
    var p5 = document.createElement('p');
    var div1 = document.createElement('div');
    var div2 = document.createElement('div');
    var inputText1 = document.createElement('input');
    var inputText2 = document.createElement('input');
    var inputNum1 = document.createElement('input');
    var inputNum2 = document.createElement('input');
    var inputNum3 = document.createElement('input');
    var hr1 = document.createElement('hr');
    var hr2 = document.createElement('hr');
    var hr3 = document.createElement('hr');
    var submit = document.createElement('input');
    var cancel = document.createElement('input');
    // تایین ویژگی های عناصر ساخته شده
    editPage.className = 'editPage';
    p1.innerHTML = "نام ماموریت: ";
    p2.innerHTML = "واحد: ";
    p3.innerHTML = "یکا: ";
    p4.innerHTML = "تکرار: ";
    p5.innerHTML = "اولویت: ";
    p1.className = "add_p";
    p2.className = "add_p";
    p3.className = "add_p";
    p4.className = "add_p";
    p5.className = "add_p";
    div1.className = "top1";
    div2.className = "top1";
    inputNum1.setAttribute('type' , 'number');
    inputNum2.setAttribute('type' , 'number');
    inputNum3.setAttribute('type' , 'number');
    inputText1.setAttribute('id' , 'one');
    inputText2.setAttribute('id' , 'three');
    inputNum1.value = vahed;
    inputNum2.value = tekrar;
    inputNum3.value = olaviyat;
    inputText1.value = name;
    inputText2.value = yeka;
    inputNum1.className = "add_input";
    inputNum2.className = "add_input";
    inputNum3.className = "add_input";
    inputText2.className = "add_input";
    submit.setAttribute("id" , "sub");
    cancel.setAttribute("id" , "can");
    submit.setAttribute("value" , " ویرایش ");
    cancel.setAttribute("value" , " لغو ");
    submit.setAttribute('type' , 'submit');
    cancel.setAttribute('type' , 'submit');
    // جایگذاری عناصر ساخته شده
    document.body.append(editPage);
    editPage.append(p1 , inputText1 , hr1 , div1 , hr2, div2, hr3 , submit , cancel);
    p2.append(inputNum1);
    p3.append(inputText2);
    p4.append(inputNum2);
    p5.append(inputNum3);
    div1.append(p2 , p3);
    div2.append(p4 , p5);
    // تعاملی کردن دکمه ها 
    cancel.addEventListener('click' , laghv);
    submit.addEventListener('click' , editLimit);
    // محدودیت های ورودی های ویرایش 
    function editLimit(){
        var a = inputNum1.value.length
        var b = inputNum2.value.length
        var yekaWord = inputText2.value.split(' ').length;
        var nameWord = inputText1.value.split(' ').length;

        if (a > 2 || b > 2 ||
            inputText1.value === "" ||
            inputNum1.value === "" || inputNum1.value < 1 ||
            inputText2.value === "" ||
            inputNum2.value === "" || inputNum2.value < 1 ||
            inputNum3.value === "" 
            ){alert("  واحد و تکرار نمیتوانند بیشتر از 2 رقم، منفی، خالی یا اعشاری باشند همچنین تمام فیلد ها باید پر شوند. ")
       } else if (yekaWord > 1){alert(' یکا نمیتواند بیشتر از یک کلمه باشد ')}
         else if (nameWord > 3){alert('نام ماموریت نمیتواند بیشتر از 3 کلمه باشد ')}
       else {submitEdit();}
    }
    // ثبت ویرایش
    function submitEdit() {
        pTag.innerHTML = "";
        var inp = inputNum1.value*inputNum2.value ;
        pTag.append(inp + ' ' , inputText2.value + " " , inputText1.value)
        span2.parentElement.style.order = -inputNum3.value;
        span2.style.gridTemplateColumns =  'repeat('+inputNum2.value+', 1fr)';
        if (span2.children.length !== 0){span2.children[0].remove();}
        // Local Storage
        const newObj = {
            i1: inputText1.value,
            i2: inputNum1.value,
            i3: inputText2.value,
            i4: inputNum2.value,
            i5: inputNum3.value
        } ;
        ls.deleteData(Obj);
        ls.setData(newObj);
        laghv()  
    }
    // بستن صفحه ی ویرایش 
    function laghv(){cancel.parentElement.remove();}
}


// تابع دکمه ی حذف
function del(e){
    const {Obj} = helper(e);
    // ساخت تمام عنصر های لازم
    var deletePage = document.createElement('div');
    var sub = document.createElement('input'); 
    var can = document.createElement('input');
    var div = document.createElement('div');
    var p0 = document.createElement('p');
    var pTag = e.target.parentElement.children[2].textContent;
    // ویژگی های عناصر
    deletePage.className = "delPage";
    sub.className = "subDel";
    can.className = "canDel";
    sub.setAttribute('type' , 'submit');
    can.setAttribute('type' , 'submit');
    sub.value = "حذف" ;
    can.value = "لغو" ;
    p0.innerHTML = "آیا از حذف این آیتم ("+pTag+") اطمینان دارید؟";
    

    // جاگذاری عناصر 
    document.body.append(deletePage);
    div.append(sub , can);
    deletePage.append(p0 ,div);
    can.addEventListener('click' , laghv);
    sub.addEventListener('click' , subDelete);

    function subDelete(){
        e.target.parentElement.parentElement.remove()
        ls.deleteData(Obj);
        laghv();
    }
    
    function laghv(){deletePage.remove();}

}


const ls = {

    getData: function(){
        var dataArray ;
        var dataString = localStorage.getItem('itm');
        if (dataString === null){dataArray = []}
        else {dataArray = JSON.parse(dataString)};
        return dataArray;
    },

    setData: function(obj){
        var dataArray = ls.getData()
        dataArray.push(obj);
        localStorage.setItem("itm" , JSON.stringify(dataArray));
    },

    showData: function(){
        var dataArray = ls.getData()
        for(var i = 0 ; i <dataArray.length ; i++){
            ls.createAgain(dataArray[i]);
        }
    },

    createAgain: function(a){
         // ساخت دیو و اسپن اول
        var newItem = document.createElement('div');
        newItem.setAttribute('class', 'item');
        newItem.style.order = -Number(a.i5);
        items.append(newItem);
        var span1 = document.createElement('span');
        span1.setAttribute('class', 'itemInfo');
        newItem.append(span1);
        // ساخت دکمه ی افزایش و کاهش
        var plusBTN = document.createElement('img');
        plusBTN.setAttribute('class', 'plus');
        plusBTN.setAttribute('src', 'icons/plus.png');
        span1.append(plusBTN);
        var subtracBTN = document.createElement('img');
        subtracBTN.setAttribute('class', 'subtrac');
        subtracBTN.setAttribute('src', 'icons/subtrac.png');
        span1.append(subtracBTN);
        // قرار دادن اطلاعات ماموریت در اسپن اول
        var p = document.createElement('p');
        var inp = a.i2*a.i4 ;
        p.append(inp + ' ' , a.i3 + " " , a.i1);
        p.setAttribute('class' , 'textInfo');
        span1.append(p);
        // ساخت دکمه ی حذف و ویرایش
        var editBTN = document.createElement('img');
        editBTN.setAttribute('class' , 'edit')
        editBTN.setAttribute('src' , 'icons/edit.png');
        span1.append(editBTN);
        var delBTN = document.createElement('img');
        delBTN.setAttribute('class' , 'del')
        delBTN.setAttribute('src' , 'icons/delete.png');
        span1.append(delBTN);
        // ساخت اسپن دوم و نوار وظیفه با اطلاعاتی که کاربر داده
        var span2 = document.createElement('span');
        span2.setAttribute('class', 'navar');
        span2.style.gridTemplateColumns= 'repeat('+a.i4+', 1fr)';
        newItem.append(span2);
        const div = document.createElement('div');
        div.setAttribute('class' , 'fraktion');
        // تعاملی کردن دکمه های ساخته شده
        plusBTN.addEventListener('click' , plus);
        subtracBTN.addEventListener('click' , subtrac);
        editBTN.addEventListener('click' , edit);
        delBTN.addEventListener('click' , del);
        // پر کردن نوار وظیفه
        if (a.i6 !== 0 && Number(a.i4) !== Number(a.i6)){
            span2.append(div);
            div.style.gridColumn = `span ${a.i6}`;
            div.style.backgroundColor = "blue";
            percent(span2 , a.i4 , a.i6-1 , p.textContent.split(' '));
        }else if (a.i6 !== 0 && Number(a.i4) === Number(a.i6)){
            span2.append(div);
            div.style.gridColumn = `span ${a.i6}`;
            div.style.backgroundColor = "goldenrod";
            percent(span2 , a.i4 , a.i6-1 , p.textContent.split(' '));
        }

        },

    deleteData: function(obj){
        const dataArray = ls.getData();
        const {name , vahed , yeka , tekrar , olaviyat} = obj;
        const index = dataArray.findIndex(function(data){   
            return (data.i1 == name &&
                    data.i2 == vahed &&
                    data.i3 == yeka &&
                    data.i4 == tekrar &&
                    data.i5 == olaviyat )});
        dataArray.splice(index , 1);
        localStorage.setItem("itm" , JSON.stringify(dataArray));
    },

    getDone: function(){
        let doneArray ;
        const doneString = localStorage.getItem("done");
        doneString === null ? doneArray = [] : doneArray = JSON.parse(doneString);
        return doneArray;
    }, 

    setDone: function(obj , doNum){
        const dataArray = ls.getData();
        const {name , vahed , yeka , tekrar , olaviyat} = obj;
        const index = dataArray.findIndex(function(data){   
            return (data.i1 == name &&
                    data.i2 == vahed &&
                    data.i3 == yeka &&
                    data.i4 == tekrar &&
                    data.i5 == olaviyat )});
        dataArray[index].i6 = doNum;
        localStorage.setItem("itm" , JSON.stringify(dataArray)); 
    },
}
document.addEventListener("DOMContentLoaded" , ls.showData);