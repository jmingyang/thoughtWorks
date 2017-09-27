
//检查输入是否合理
function checkinput(str){
	var temparr = str.split(" ");
	if(temparr.length!=4 && temparr.length!=5){
		return false;
	}else if(temparr.length==5){//取消订单标志
		if(temparr[4]!="C"){
			return false;
		}
	}
	var date = temparr[1];
	if(!checkDate(date)){
		return false;
	}
	//时间就这样可以不  晓得怎么弄  累累累
	var timereg = /^(\d{1,2}):(00)~(\d{1,2}):(00)$/;
	var time = temparr[2];
	if (!timereg.test(time) || time.split("~")[0]==time.split("~")[1]) { 
		return false;
	} 
	//场地必须是A,B,C,D
	var place = temparr[3];
	if("ABCD".indexOf(place)==-1){
		return false;
	}
	return true;
}
//检查日期是否合法
function checkDate(str){
	var arr = str.split("-");
    var year = parseInt(arr[0]);
    var month = parseInt(arr[1]);
	var noch;
    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
        noch = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3]0))$/;
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            noch = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1]))$/;
        } if (month == 2) {
            noch = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:[0-2][1-9])$/;
        }
    } else {
        noch = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-8])|(?:[1-3]0))$/;
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            noch = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-8])|(?:[1-3][0-1]))$/;
        } if (month == 2) {
            noch = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:[0-2][1-8])$/;
        }
    }
    return noch.test(str);
}
function stringToDate (fDate){  
   var fullDate = fDate.split("-");  
   return new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0);  
} 