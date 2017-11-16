var cont;
var setup = function(){
    var next = document.getElementById('next');
    var prev = document.getElementById('prev');
    var l = document.getElementsByClassName('left')[0], r = document.getElementsByClassName('right')[0];
    var i = storage.start;
    cont = document.getElementById('container');
    var update = function(){
        console.log(i != 0 && i != 68);
        if(i == 0){
            l.classList.add('hid');
        }
        else if(i == 68){
            r.classList.add('hid');
        }
        else{
            l.classList.remove('hid');
            r.classList.remove('hid');
        }
        swap(i);
        storage.update = i;
    }
    next.addEventListener('click', function(){i += (i < 68) ? 1 : 0; update()})
    prev.addEventListener('click', function(){i -= (i > 0) ? 1 : 0; update()})
    document.addEventListener('keydown', function(e){
        if(e.keyCode == 39){i += (i < 68) ? 1 : 0; update()};
        if(e.keyCode == 37){i -= (i > 0) ? 1 : 0; update()};
    })
    update();
}

var swap = function(index){
    var old = document.getElementsByTagName('img')[0], new_img = document.createElement('img');
    var res = pad(index);
    new_img.src = "./content/strip" + res + '.gif';
    if(old){
        cont.removeChild(old);
    }
    cont.classList.add('hid');
    cont.appendChild(new_img);
    setTimeout(function(){cont.classList.remove('hid')}, 200);
}

var  pad = function(number) {
    if (number<=999) { number = ("00"+number).slice(-3); }
    return number;
  }

var storage = {
    get start() {
        return (localStorage.getItem('index')) ? parseInt(localStorage.getItem('index')) : 0;
    },
    set update(i){
        localStorage.setItem('index', i);
    }
}

document.addEventListener("DOMContentLoaded", setup)