var cont,setup=function(){var a=document.getElementById("next"),d=document.getElementById("prev"),c=document.getElementsByClassName("left")[0],f=document.getElementsByClassName("right")[0],b=storage.start;cont=document.getElementById("container");var e=function(){console.log(0!=b&&68!=b);0==b?c.classList.add("hid"):68==b?f.classList.add("hid"):(c.classList.remove("hid"),f.classList.remove("hid"));swap(b);storage.update=b};a.addEventListener("click",function(){b+=68>b?1:0;e()});d.addEventListener("click",
function(){b-=0<b?1:0;e()});e()},swap=function(a){var d=document.getElementsByTagName("img")[0],c=document.createElement("img");a=pad(a);c.src="./content/strip"+a+".gif";d&&cont.removeChild(d);cont.classList.add("hid");cont.appendChild(c);setTimeout(function(){cont.classList.remove("hid")},200)},pad=function(a){999>=a&&(a=("00"+a).slice(-3));return a},storage={get start(){return localStorage.getItem("index")?parseInt(localStorage.getItem("index")):0},set update(a){localStorage.setItem("index",a)}};
document.addEventListener("DOMContentLoaded",setup);