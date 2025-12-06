// بخش دیتا بیس
const ls = {

    getData: function(){
        var dataArray ;
        var dataString = localStorage.getItem('itm');
        if (dataString === null){dataArray = []}
        else {dataArray = JSON.parse(dataString)};
        return dataArray;
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
};

// کتابخانه تاریخ شمسی 
function monthName(mNum){
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
};

// درصد کل وظایف 
function allPer(){
    let all = 0;
    const dataArray = ls.getData();
    for (var i = 0 ; i < dataArray.length ; i++){
        const per = Math.floor((dataArray[i].i6/dataArray[i].i4)*100)
        all += per;
        }
    if (dataArray.length === 0){dataArray.length = 1}
    if(document.getElementById('darsad')){
        darsad.children[0].innerHTML = Math.floor(all/dataArray.length)+"%" ;
    }
    return Math.floor(all/dataArray.length)+"%"
};

export {ls , monthName , allPer};