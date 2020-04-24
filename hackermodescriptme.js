var cnt = [] ;
var x=0;

var buttons= document.getElementsByTagName("button");
var Clicks = 0;
var refArr = [];

var s=0,ms=0;
var dummy;
var flg=1;
if(!localStorage.CountE|| !localStorage.CountM || !localStorage.CountD)
 { 
     localStorage.CountE=1;
     localStorage.CountM=1;
     localStorage.CountD=1;
}

 var hnog;
 var nog ;
 var b2=[];

 

function Myfunc(i,val)
{
 if(flg==1)
 {dummy=setInterval(startTime,10);
  flg=0;}
 if(val==refArr[Clicks])
 {
 cnt[i]+=1;
 if(cnt[i]==1)
  {
   buttons[i].innerHTML=b2[i];
   buttons[i].style.backgroundColor="rgba(0,0,0," + (b2[i]*(1/nog)) + ")";
  }
 else if(cnt[i]==2)
  { buttons[i].style.visibility="hidden";}
 Clicks+=1;
 }
 
 if(Clicks==nog )
 {Endtimer(nog);}
}

function dispScores()
{ var temp="";
 var Scores=[];

 if(nog==40)
 {temp=localStorage.getItem("highScoresE");}
 else if(nog==50)
 {temp=localStorage.getItem("highScoresM");}
 else if(nog==60)
 {temp=localStorage.getItem("highScoresD");}
 
 Scores = temp.split(";");
 var len = Scores.length;
 var res = "The best " + len + " performances in "+ "<br>"+ ( (nog==40)?"easy":((nog==50)?"moderate":"difficult") ) + " mode are : " + "<p></p>";
 
 for(x=0;x<len;x++)
   {
     res = res +"<div class='scoreItem'>"+ Scores[x] +"</div>"+"<br>";
   }
   
 document.getElementById("scores").innerHTML = res;
 
} 

function Endtimer(nog)
{

 clearInterval(dummy);

 var scr = 0;
 scr = s + ms/100 ;
 
 
 if(nog==40){easyScores(scr);}
 else if(nog==50){moderateScores(scr);}
 else if(nog==60){difficultScores(scr);}

}

function easyScores(scr)                                                   //copy of highScores() with an E in it.
{
    var num = Number(localStorage.CountE);
 var scores = [];
 var temp="";
 
 if(num==1)
 { 
   localStorage.setItem("highScoresE",scr);    
   num+=1;
   localStorage.CountE=num;    
 }
 else
 {
   temp = localStorage.getItem("highScoresE");
   temp = temp + ";" + scr;
   scores=temp.split(";");
   for(x=0;x<scores.length;x++)
   {
     scores[x]=Number(scores[x]);
   }
   scores.sort(function(a,b){return a-b;});
   temp=String(scores[0]);

   if(num==6)
   {
    num=5;
    localStorage.CountE=num;
   }

   for(x=1;x<num;x++)
   {
     temp = temp + ";" + String(scores[x]) ;
   }
   
   localStorage.setItem("highScoresE",temp);
   num+=1;
   localStorage.CountE=num;
 }
}

function moderateScores(scr)                                                //copy of highScores() with M in it.
{
    var num = Number(localStorage.CountM);
 var scores = [];
 var temp="";
 
 if(num==1)
 { 
   localStorage.setItem("highScoresM",scr);    
   num+=1;
   localStorage.CountM=num;    
 }
 else
 {
   temp = localStorage.getItem("highScoresM");
   temp = temp + ";" + scr;
   scores=temp.split(";");
   for(x=0;x<scores.length;x++)
   {
     scores[x]=Number(scores[x]);
   }
   scores.sort(function(a,b){return a-b;});
   temp=String(scores[0]);

   if(num==6)
   {
    num=5;
    localStorage.CountM=num;
   }

   for(x=1;x<num;x++)
   {
     temp = temp + ";" + String(scores[x]) ;
   }
   
   localStorage.setItem("highScoresM",temp);
   num+=1;
   localStorage.CountM=num;
   
 }
}

function difficultScores(scr)                                                  //copy of highScores() with D in it.
{
 var num = Number(localStorage.CountD);
 var scores = [];
 var temp="";
 
 if(num==1)
 { 
   localStorage.setItem("highScoresD",scr);    
   num+=1;
   localStorage.CountD=num;    
 }
 else
 {
   temp = localStorage.getItem("highScoresD");
   temp = temp + ";" + scr;
   scores=temp.split(";");
   for(x=0;x<scores.length;x++)
   {
     scores[x]=Number(scores[x]);
   }
   scores.sort(function(a,b){return a-b;});
   temp=String(scores[0]);

   if(num==6)
   {
    num=5;
    localStorage.CountD=num;
   }

   for(x=1;x<num;x++)
   {
     temp = temp + ";" + String(scores[x]) ;
   }
   
   localStorage.setItem("highScoresD",temp);
   num+=1;
   localStorage.CountD=num;
   
 }
}

function resetTimer()
{
  clearInterval(dummy);
  s=0;ms=0;
  document.getElementById("Timer").innerHTML= ((s<10)?"0"+s:s) + "." + ((ms<10)?"0"+ms:ms) ;
  document.getElementById("scores").innerHTML = "";                                                    //resets score
  
}

function startTime()
{
ms+=1;
if(ms==100)
{s+=1;
 ms=0;
}
document.getElementById("Timer").innerHTML= ((s<10)?"0"+s:s) + "." + ((ms<10)?"0"+ms:ms) ;
}

function LoadNum(nogf=40)  //nog-number of grids
{ 
cnt=[];
b2=[];
refArr=[];
flg=1;
Clicks=0;
resetTimer();

var txt="";
var b1=[];
hnog=nogf/2;
nog=hnog*2;
for(x=0;x<hnog;++x)
{b1[x]=x+1;
 b2[x]=x+hnog+1;
 
 if((x+1)%5!=0)
 {
   txt+='<button class="gridele" onclick="Myfunc(Number(' + x + '),Number(this.innerHTML))"></button>';
 }
 else
 {
 txt+='<button class="gridele" onclick="Myfunc(Number(' + x +  '),Number(this.innerHTML))"></button><br>';
 }
}
document.getElementById("master").innerHTML=txt; 

b1.sort(function(a, b){return 0.5 - Math.random()});
b2.sort(function(a, b){return 0.5 - Math.random()});


for(x=0;x<hnog;++x)                                         //1st shuffle to store in grids and provide color
{
 buttons[x].innerHTML=b1[x];
 buttons[x].style.backgroundColor="rgba(0,0,0," + (b1[x]*(1/nog)) + ")"; 
}                         

for(x=1;x<=nog;x++)                                    //ref array to check ele
 {refArr[x-1]=x;}

 for(x=0;x<hnog;x++)                                     //cnt array initialised to check how many times a button has been pressed.
{cnt[x]=0;}

}
