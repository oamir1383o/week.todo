// variables
const menuParent = document.getElementById('menuParent');
const menu = document.getElementsByClassName('menu')[0];
const darsad = document.getElementById('darsad');
const closeBTN = document.getElementById('closeBTN');
const addBTN = document.getElementById('addBTN');
const addMenu = document.getElementsByClassName('add')[0];
const backBTN = document.getElementById('backBTN');
const fullBTN = document.getElementById('fullBTN');
const inp1 = document.getElementById('one');
const inp2 = document.getElementById('two');
const inp3 = document.getElementById('three');
const inp4 = document.getElementById('four');
const inp5 = document.getElementById('five');
const submit = document.getElementById('sub');
const cancel = document.getElementById('cancel');
const items = document.getElementsByClassName('items')[0];
const day = document.getElementById('day');
const access = document.getElementsByClassName('access')[0];
//Events
addBTN.addEventListener("click" , openAdd );
backBTN.addEventListener("click" , backPage);
submit.addEventListener("click" , limit);
cancel.addEventListener("click" , openAdd);
menuParent.addEventListener("click" , openMenu);
closeBTN.addEventListener("click" , openMenu);
//functions
// برای باز کردن منو
function openMenu(){
    menu.classList.toggle('hidden');
    menuParent.style.display === "block" ? menuParent.style.display = "none": menuParent.style.display = "block";
    //darsad.style.display === "flex" ? darsad.style.display = "none": darsad.style.display = "flex";
}
// برای باز کردن منوی وارد کردن اطلاعات ماموریت
function openAdd(e){
addMenu.classList.toggle('hidden');
access.classList.toggle('hidePage');
if(e.target.id !== "cancel"){openMenu();}
}
// برای برگشتن به صفحه ی اول برنامه
function backPage(){
    window.location.href="index.html"
}
// برای محدودیت های ورودی ها
function limit(){
    const a = inp2.value.length
    const b = inp4.value.length
    const yekaWord = inp3.value.split(' ').length;
    const nameWord = inp1.value.split(' ').length;
    const txt = `${inp2.value*inp4.value} ${inp3.value} ${inp1.value}`;
    const dataArray = ls.getData();
    let same = false;
    for (var i = 0; i < dataArray.length; i++){
        var txts = `${dataArray[i].i2*dataArray[i].i4} ${dataArray[i].i3} ${dataArray[i].i1}`
        if (txt === txts){same = true};}
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
    else if (same === true){alert("این ماموریت قبلا اضافه شده")}
    else { creatItem();addMenu.classList.toggle('hidden');
            addBTN.setAttribute('src', 'icons/add.png');
}
}

// برای ساختن یک ماموریت هفتگی با اطلاعاتی که کاربر داده
function creatItem(){
    access.classList.toggle('hidePage');
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
    plusBTN.classList.add('hidden', 'plus');
    plusBTN.setAttribute('src', 'icons/plus.png');
    span1.append(plusBTN);
    const subtracBTN = document.createElement('img');
    subtracBTN.classList.add('hidden', 'subtrac');
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
    editBTN.classList.add('hidden' , 'edit')
    editBTN.setAttribute('src' , 'icons/edit.png');
    span1.append(editBTN);
    const delBTN = document.createElement('img');
    delBTN.classList.add('hidden' , 'del')
    delBTN.setAttribute('src' , 'icons/delete.png');
    span1.append(delBTN);
    // ساخت اسپن دوم با اطلاعاتی که کاربر داده
    const span2 = document.createElement('span');
    span2.setAttribute('class', 'navar');
    span2.style.gridTemplateColumns= 'repeat('+inp4.value+', 1fr)';
    newItem.append(span2);
    // تعاملی کردن دکمه های ساخته شده
    newItem.addEventListener("click" , hide);
    newItem.children[0].classList.toggle("row1"); 
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
    allPer();
    // پاک کردن ورودی ها
    inp1.value = "";
    inp2.value = "";
    inp3.value = "";
    inp4.value = "";
    inp5.value = "";
}

// برای نمایان کردن دکمه های آیتم
function hide(e){
    if (e.target.classList[0] !== "plus" &&
        e.target.classList[0] !== "subtrac" &&
        e.target.classList[0] !== "edit" &&
        e.target.classList[0] !== "del"
    ){
    //e.currentTarget.children[0].classList.toggle("row1");
    e.currentTarget.children[0].children[0].classList.toggle('hidden');
    e.currentTarget.children[0].children[1].classList.toggle('hidden');
    e.currentTarget.children[0].children[3].classList.toggle('hidden');
    e.currentTarget.children[0].children[4].classList.toggle('hidden');
    }
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
        ls.setDone(Obj , 1)
        percent(span2 , num1 , 0, p);
        // اگه ظرفیت کلا یدونه بود، مستقیم نوار وظیفه ی ساخته شده رو طلایی کن
        if (num1 === 1) {span2.children[0].style.backgroundColor = "#2E7D32" }
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
        ls.setDone(Obj , newNum);
        percent(span2 , num1 , num2, p);
        // وقتی ظرفیت نوار وظیفه پر شد، رنگشو عوض کن
        }else if (num2 < num1){
        let newNum = num2+1;
        span2.children[0].style.gridColumn = `span ${newNum}`;
        span2.children[0].style.backgroundColor = "#2E7D32";
        ls.setDone(Obj , newNum);
        percent(span2 , num1 , num2 , p);
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
        span2.children[0].style.backgroundColor = "#9000cd";
        ls.setDone(Obj , newNum);
        percent(span2 , num1 , newNum-1 , p);
        // اگه نوار وظیفه فقط یدونه پر بود، کلا حذفش کن
        }else if (num2 === 1){
            span2.children[0].remove();
            ls.setDone(Obj , 0);
            allPer(0 , num1);
        // اگه هیچکدوم از دو شرط بالا رو نداشت، فقط یدونه کمش کن
        }else{
        const newNum = num2-1;
        span2.children[0].style.gridColumn = `span ${newNum}`;
        ls.setDone(Obj , newNum);
        percent(span2 , num1 , newNum-1, p);
        }
    }
}


// درصد گیری وظایف
function percent(span2 , num1 , num2 , p){
var vahed = p[0]/num1;
var num = num2+1;
span2.children[0].innerHTML= `${vahed*num} (%${Math.floor((num/num1)*100)})`
allPer()
}


// درصد کل وظایف 
function allPer(){
    let all = 0;
    const dataArray = ls.getData();
    for (var i = 0 ; i < dataArray.length ; i++){
        const per = Math.floor((dataArray[i].i6/dataArray[i].i4)*100)
        all += per;
        }
    if (dataArray.length === 0){dataArray.length = 1}
    darsad.children[0].innerHTML = Math.floor(all/dataArray.length)+"%" ;
    return Math.floor(all/dataArray.length)+"%"
}


// تابع دکمه ی ویرایش 
function edit(e){
    access.classList.toggle('hidePage');
    const {pTag , name , yeka , span2 , tekrar , vahed , olaviyat , Obj } = helper(e);
    // ساخت تمام عنصر های لازم
    const editPage = document.createElement('div'); editPage.className = 'editPage';  document.body.append(editPage);
    const p1 = document.createElement('p'); p1.innerHTML = "نام ماموریت: ";
    const p2 = document.createElement('p'); p2.innerHTML = "واحد: ";
    const p3 = document.createElement('p'); p3.innerHTML = "یکا: "; 
    const p4 = document.createElement('p'); p4.innerHTML = "تکرار: ";
    const p5 = document.createElement('p'); p5.innerHTML = "اولویت: ";
    p1.className = "add_p"; p2.className = "add_p"; p3.className = "add_p"; p4.className = "add_p"; p5.className = "add_p";
    const div1 = document.createElement('div'); div1.className = "top1";
    const div2 = document.createElement('div'); div2.className = "top1";
    const inputText1 = document.createElement('input'); inputText1.setAttribute('id' , 'one'); inputText1.value = name; 
    const inputText2 = document.createElement('input'); inputText2.setAttribute('id' , 'three'); inputText2.value = yeka; inputText2.className = "add_input";
    const inputNum1 = document.createElement('input'); inputNum1.setAttribute('type' , 'number'); inputNum1.value = vahed; inputNum1.className = "add_input";
    const inputNum2 = document.createElement('input'); inputNum2.setAttribute('type' , 'number'); inputNum2.value = tekrar; inputNum2.className = "add_input";
    const inputNum3 = document.createElement('input'); inputNum3.setAttribute('type' , 'number'); inputNum3.value = olaviyat; inputNum3.className = "add_input";
    const hr1 = document.createElement('hr'); 
    const hr2 = document.createElement('hr'); 
    const hr3 = document.createElement('hr'); 
    const submit = document.createElement('input'); submit.setAttribute("id" , "sub"); submit.setAttribute("value" , " ویرایش "); submit.setAttribute('type' , 'submit');
    const cancel = document.createElement('input'); cancel.setAttribute("id" , "can"); cancel.setAttribute("value" , " لغو "); cancel.setAttribute('type' , 'submit');
    editPage.append(p1 , inputText1 , hr1 , div1 , hr2, div2, hr3 , submit , cancel); p2.append(inputNum1); p3.append(inputText2); p4.append(inputNum2); p5.append(inputNum3); div1.append(p2 , p3); div2.append(p4 , p5);
    // تعاملی کردن دکمه ها 
    cancel.addEventListener('click' , laghv);
    submit.addEventListener('click' , editLimit);
    // محدودیت های ورودی های ویرایش 
    
    function editLimit(){
        const a = inputNum1.value.length
        const b = inputNum2.value.length
        const yekaWord = inputText2.value.split(' ').length;
        const nameWord = inputText1.value.split(' ').length;
        const txt = `${vahed*tekrar} ${yeka} ${name}`;
        const newtxt = `${inputNum1.value*inputNum2.value} ${inputText2.value} ${inputText1.value}`;
        const dataArray = ls.getData();
        let same = false;
        for (var i = 0; i < dataArray.length; i++){
            var txts = `${dataArray[i].i2*dataArray[i].i4} ${dataArray[i].i3} ${dataArray[i].i1}`
            if (newtxt === txts && newtxt !== txt){same = true};}
        if (a > 2 || b > 2 ||
            inputText1.value === "" ||
            inputNum1.value === "" || inputNum1.value < 1 ||
            inputText2.value === "" ||
            inputNum2.value === "" || inputNum2.value < 1 ||
            inputNum3.value === "" 
            ){alert("  واحد و تکرار نمیتوانند بیشتر از 2 رقم، منفی، خالی یا اعشاری باشند همچنین تمام فیلد ها باید پر شوند. ")
       }else if (yekaWord > 1){alert(' یکا نمیتواند بیشتر از یک کلمه باشد ')}
        else if (nameWord > 3){alert('نام ماموریت نمیتواند بیشتر از 3 کلمه باشد ')}
        else if (same === true){alert("این ماموریت قبلا اضافه شده")}
        else {submitEdit();}
    }

    // ثبت ویرایش
    function submitEdit() {
        pTag.innerHTML = "";
        const inp = inputNum1.value*inputNum2.value ;
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
            i5: inputNum3.value,
            i6: 0
        } ;
        ls.deleteData(Obj);
        ls.setData(newObj);
        laghv();
        allPer();
    }
    // بستن صفحه ی ویرایش 
    function laghv(){cancel.parentElement.remove();access.classList.toggle('hidePage');}
}


// تابع دکمه ی حذف
function del(e){
    access.classList.toggle('hidePage');
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
        allPer();
    }
    
    function laghv(){deletePage.remove();access.classList.toggle('hidePage');}

}

// برای پیدا کردن ایندکس آیتم
function findINDEX(dA , obj){
    const {name , vahed , yeka , tekrar , olaviyat} = obj;
    const index = dA.findIndex(function(data){   
            return (data.i1 == name &&
                    data.i2 == vahed &&
                    data.i3 == yeka &&
                    data.i4 == tekrar &&
                    data.i5 == olaviyat )});
    return index
}
// تابع فول اسکرین
function fs(){
	document.documentElement.requestFullscreen();	
}
// تابع زمان
function time(){
    
    
    // برای نمایش روز هفته در صفحه 
    const getDay = new Date().getDay();
    ir.weekDay(getDay);

    // تابع برگرداندن اول هفته 
    function weekStart(date){
        const d = new Date(date);
        const day = d.getDay();
        const diff = day === 6 ? 0: day+1 ;
        d.setDate(d.getDate() - diff);
        d.setHours(0,0,0,0);
        return d 
    } diff();

    // تابع تشخیص اختلاف تاریخ ها
    function diff(){
        const nd = new Date();
        const ld = localStorage.getItem('lastDate');
        const letReset = weekStart(nd).getTime() === weekStart(ld).getTime();
        resetData(letReset ,weekStart(ld));
    }

    // تابع ریست کردن برنامه
    function resetData(letReset , ld){
        if(letReset === false){
        // گرفتن اطلاعات ماموریت برای ذخیره در تاریخچه 
        const dataArray = ls.getData();
        const giftArray = ls.getGifts();
        const infoArray = [];
        const giftInfo = [];

        for(var i = 0 ; i < dataArray.length ; i++){
            infoArray.push(`${dataArray[i].i1}: ${dataArray[i].i2*dataArray[i].i6} ${dataArray[i].i3} از ${dataArray[i].i4*dataArray[i].i2} ${dataArray[i].i3}`)
        }

        for(var g = 0 ; g < giftArray.length ; g++){
            if (giftArray[g][1] === true){giftInfo.push(giftArray[g][0]);}
        }
        
        // ساخت عنوان هفته با تاریخ 
        const ldd = new Date(ld);ldd.setDate(ldd.getDate() + 7);
        const year = moment(ldd).jYear();const Lyear = moment(ld).jYear();
        const monthNum = moment(ldd).jMonth();const LmonthNum = moment(ld).jMonth();
        const month = ir.monthName(monthNum);const Lmonth = ir.monthName(LmonthNum);
        const day = moment(ldd).jDate();const Lday = moment(ld).jDate();
        let title = year === Lyear? `${year}: از ${Lday} ${Lmonth} تا ${day} ${month}`:` از ${Lday} ${Lmonth} ${Lyear} تا ${day} ${month} ${year}`;
        
        const hisArray = ls.getHistory();
        hisArray.push([giftInfo , infoArray , allPer() , title]);
        console.log(hisArray);
        localStorage.setItem("history" , JSON.stringify(hisArray));
        localStorage.setItem("lastDate" , new Date());
        reset();
    }else{localStorage.setItem("lastDate" , new Date());}
        
    }
}

function reset(){
    const dataArray = ls.getData();
    const giftArray = ls.getGifts();

    for(var i = 0 ; i < dataArray.length ; i++){
        dataArray[i].i6 = 0 ;
    }
    localStorage.setItem("itm" , JSON.stringify(dataArray)); 
    
    for(var g = 0 ; g < giftArray.length ; g++){
        giftArray[g][1] = false;
    }
    localStorage.setItem("gift" , JSON.stringify(giftArray));

}
// بخش دیتا بیس
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
        const dataArray = ls.getData()
        for(var i = 0 ; i <dataArray.length ; i++){
            ls.createAgain(dataArray[i]);
        }
        const firstLoad = localStorage.getItem("lastDate");
        if (firstLoad === null){
            const nd = new Date();
            localStorage.setItem("lastDate" , nd);}
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
        plusBTN.classList.add('hidden' , 'plus');
        plusBTN.setAttribute('src', 'icons/plus.png');
        span1.append(plusBTN);
        var subtracBTN = document.createElement('img');
        subtracBTN.classList.add('hidden', 'subtrac');
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
        editBTN.classList.add('hidden' , 'edit');
        editBTN.setAttribute('src' , 'icons/edit.png');
        span1.append(editBTN);
        var delBTN = document.createElement('img');
        delBTN.classList.add('hidden' , 'del');
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
        newItem.addEventListener("click" , hide);
        plusBTN.addEventListener('click' , plus);
        subtracBTN.addEventListener('click' , subtrac);
        editBTN.addEventListener('click' , edit);
        delBTN.addEventListener('click' , del);
        // پر کردن نوار وظیفه
        if (a.i6 !== 0 && Number(a.i4) !== Number(a.i6)){
            span2.append(div);
            div.style.gridColumn = `span ${a.i6}`;
            div.style.backgroundColor = "#9000cd";
            percent(span2 , a.i4 , a.i6-1 , p.textContent.split(' '));
        }else if (a.i6 !== 0 && Number(a.i4) === Number(a.i6)){
            span2.append(div);
            div.style.gridColumn = `span ${a.i6}`;
            div.style.backgroundColor = "#2E7D32";
            percent(span2 , a.i4 , a.i6-1 , p.textContent.split(' '));
        }

    },

    deleteData: function(obj){
        const dataArray = ls.getData();
        const index = findINDEX(dataArray , obj);
        dataArray.splice(index , 1);
        localStorage.setItem("itm" , JSON.stringify(dataArray));
    },

    setDone: function(obj , doNum){
        const dataArray = ls.getData();
        const index = findINDEX(dataArray , obj);
        dataArray[index].i6 = doNum;
        localStorage.setItem("itm" , JSON.stringify(dataArray)); 
    },

    getPer: function(){
        let perArray ;
        const perString = localStorage.getItem("per");
        perString === null ? perArray = [] : perArray = JSON.parse(perString);
        return perArray;
    },

    getGifts: function(){
        let giftArray ;
        const giftString = localStorage.getItem("gift");
        giftString === null ? giftArray = [] : giftArray = JSON.parse(giftString);
        return giftArray;
    },

    getHistory: function(){
        let hisArray ;
        const hisString = localStorage.getItem("history");
        hisString === null ? hisArray = [] : hisArray = JSON.parse(hisString);
        return hisArray;
    }
}

// کتابخانه تاریخ شمسی 
const ir = {
    weekDay: function(getDay){
        switch (getDay){
        case 6: day.innerHTML = "شنبه"; break;
        case 0: day.innerHTML = "یکشنبه"; break;
        case 1: day.innerHTML = "دوشنبه"; break;
        case 2: day.innerHTML = "سه‌شنبه"; break;
        case 3: day.innerHTML = "چهارشنبه"; break;
        case 4: day.innerHTML = "پنجشنبه"; break;
        case 5: day.innerHTML = "جمعه"; break;
        }
    },

    monthName: function(mNum){
        switch (mNum){
        case 0: return "فروردین"; break;
        case 1: return "اردیبهشت"; break;
        case 2: return "خرداد"; break;
        case 3: return "تیر"; break;
        case 4: return "مرداد"; break;
        case 5: return "شهریور"; break;
        case 6: return "مهر"; break;
        case 7: return "آبان"; break;
        case 8: return "آذر"; break;
        case 9: return "دی"; break;
        case 10: return "بهمن"; break;
        case 11: return "اسفند"; break;
        }
    }
}
document.addEventListener("DOMContentLoaded" , ls.showData);
document.addEventListener("DOMContentLoaded" , time);
fullBTN.addEventListener("click" , fs);