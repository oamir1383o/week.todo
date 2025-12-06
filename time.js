import {ls ,monthName , allPer} from "./utils.js";
// تابع زمان
function time(){
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
            if(dataArray[i].i6 !== 0){
                infoArray.push(`${dataArray[i].i1}: ${dataArray[i].i2*dataArray[i].i6}/${dataArray[i].i4*dataArray[i].i2} ${dataArray[i].i3}`)
            }
        }

        for(var g = 0 ; g < giftArray.length ; g++){
            if (giftArray[g][1] === true){giftInfo.push(giftArray[g][0]);}
        }
        
        // ساخت عنوان هفته با تاریخ 
        const ldd = new Date(ld);ldd.setDate(ldd.getDate() + 7);
        const year = moment(ldd).jYear();const Lyear = moment(ld).jYear();
        const monthNum = moment(ldd).jMonth();const LmonthNum = moment(ld).jMonth();
        const month = monthName(monthNum);const Lmonth = monthName(LmonthNum);
        const day = moment(ldd).jDate();const Lday = moment(ld).jDate();
        let title = year === Lyear? `${year}: از ${Lday} ${Lmonth} تا ${day} ${month}`:` از ${Lday} ${Lmonth} ${Lyear} تا ${day} ${month} ${year}`;
        
        const hisArray = ls.getHistory();
        hisArray.push([giftInfo , infoArray , allPer() , title]);
        localStorage.setItem("history" , JSON.stringify(hisArray));
        localStorage.setItem("lastDate" , new Date());
        reset();
    }else{localStorage.setItem("lastDate" , new Date());}
        
    }
};

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

};

document.addEventListener("DOMContentLoaded" , time);