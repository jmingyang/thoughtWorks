var BookingArr = [];
var CancelArr = [];

function handleMethod(){
	var importText = $("#importInput").val().trim();
	if(!checkinput(importText)){
		console.log("Error:the booking is invalid!");
		return;
	}
	var temparr = importText.split(" ");
	
	if(temparr.length==4){//预订
		var isExist=false;//冲突标志 
		BookingArr.map(function(x,i){
			//检查是否冲突  时间是否相交
			if(x.Day==importText.split(" ")[1] && x.Place==importText.split(" ")[3] ){
				var start1 = x.Time.split("~")[0].split(":")[0];
				var end1 = x.Time.split("~")[1].split(":")[0];
				var start2 = importText.split(" ")[2].split("~")[0].split(":")[0];
				var end2 = importText.split(" ")[2].split("~")[1].split(":")[0];
				if(end1<start2 || start1>end2){

				}else{
					isExist=true;
				}
			}
		});
		if(isExist==true){//预订的订单已存在，发生冲突
			console.log("Error:the booking conflicts with existing bookings!");
			return;
		}
		var item = createBookingorCancelItem(temparr);
		BookingArr.push(item);
		console.log("Success:the booking is accepted!");
	}else if(temparr.length==5){//取消预订
		var isExist=false;
		var cancelnum=0;
		BookingArr.map(function(x,i){//检查是否冲突  通过比较是否包含字符串即可
			var str="";
			for(key in x){
				if(key!="cancelTag") str=str+x[key]+" ";
			}
			if(importText.indexOf(str.trim())!=-1){
				isExist=true;
				cancelnum=i;
			}
		});
		if(isExist==true){
			var item = createBookingorCancelItem(temparr);
			CancelArr.push(item);
			BookingArr.splice(cancelnum,1);
			console.log("Success:the booking is accepted!");
		}else{//要取消的订单不存在
			console.log("Error:the booking being cancelled does not exist!");
		}
	}
}
//创建订单对象
 function createBookingorCancelItem(arr){
  var item = new Object();
   item.userId=arr[0];
   item.Day=arr[1];
   item.Time=arr[2];
   item.Place=arr[3];
   if(arr[4]!=undefined){
   		item.cancelTag=arr[4];
   }
   return item;
 }
 //清空输入
 function clearMethod(){
  	$("#importInput").val("");
 };
 //打印账单
 function printMethod(){
 	console.log("\n收入汇总");
 	console.log("----");
  	var Arr = BookingArr.concat(CancelArr);
  	Arr.sort(function(a,b){
  		return a.Place.charCodeAt()-b.Place.charCodeAt();
  	});
  	var bigtotal = printSinglePlace("A",Arr)+printSinglePlace("B",Arr)+printSinglePlace("C",Arr)+printSinglePlace("D",Arr);
  	console.log("----");
  	console.log("总计："+bigtotal+"元");

}; 
//计算单个场地的小计并返回该场地小计
 function printSinglePlace(place,arr){
 	console.log("场地："+place);
 	var total=0;
 	for(var i=0;i<arr.length;i++){
  		if(arr[i].Place==place){
  			var start = parseInt(arr[i].Time.split("~")[0].split(":")[0]);
  			var end = parseInt(arr[i].Time.split("~")[1].split(":")[0]);
  			var costtime = end-start;
  			var date = stringToDate(arr[i].Day);
  			var rate
  			var cost=0;
  			if(date.getDay()==0 || date.getDay()==6){
  				if(start>=9 && end<=12){
  					cost=(end-start)*40;
  				}
  				else if(start>=12 && end<=18){
  					cost=(end-start)*50;
  				}
  				else if(start>=18 && end<=22){
  					cost=(end-start)*60;
  				}else if(start>=12 && end>18){//检查跨时间段的情况  从大到小
  					cost=(18-start)*50+(end-18)*60;
  				}
  				else if(start>=9 && end>12){
  					cost=(12-start)*40+(end-12)*50;
  				}
  				if(arr[i].cancelTag!=undefined){
  					cost=cost*0.25;
  					total+=cost;
  					console.log(arr[i].Day+" "+arr[i].Time+" 违约金"+cost+"元");
  				}else{
  					total+=cost;
  					console.log(arr[i].Day+" "+arr[i].Time+" "+cost+"元");
  				}
  			}else{
  				if(start>=9 && end<=12){
  					cost=(end-start)*30;
  				}
  				else if(start>=12 && end<=18){
  					cost=(end-start)*50;
  				}
  				else if(start>=18 && end<=20){
  					cost=(end-start)*80;
  				}
  				else if(start>=20 && end<=22){
  					cost=(end-start)*60;
  				}else if(start>=18 && end>20){//检查跨时间段的情况  从大到小
  					cost=(20-start)*80+(end-20)*60;
  				}
  				else if(start>=12 && end>18){
  					cost=(18-start)*50+(end-18)*80;
  				}else if(start>=9 && end>12){
  					cost=(12-start)*30+(end-12)*50;
  				}
  				

  				if(arr[i].cancelTag!=undefined){
  					cost=cost*0.50;
  					total+=cost;
  					console.log(arr[i].Day+" "+arr[i].Time+" 违约金"+cost+"元");
  				}else{
  					total+=cost;
  					console.log(arr[i].Day+" "+arr[i].Time+" "+cost+"元");
  				}
  			}
  			
  		}
  	}
  	console.log("小计："+total+"\n");
  	if(place!="D"){
  		console.log("");
  	}
  	return total;
}; 