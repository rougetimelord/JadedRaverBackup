var setup = () =>{
    var next = document.getElementById('next');
    var prev = document.getElementById('prev');
    var l = document.getElementsByClassName('left')[0], r = document.getElementsByClassName('right')[0];
    var i = storage.start;
    var update = () =>{
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
        xhr(i);
        storage.update = i;
    }
    next.addEventListener('click', () =>{i += (i < 68) ? 1 : 0; update()})
    prev.addEventListener('click', () =>{i -= (i > 0) ? 1 : 0; update()})
    document.addEventListener('keydown', e =>{
        if(e.keyCode == 39){i += (i < 68) ? 1 : 0; update()};
        if(e.keyCode == 37){i -= (i > 0) ? 1 : 0; update()};
    })
    update();
}

var  pad = n =>{
    if (n<=999) { n = ("00"+n).slice(-3); }
    return n;
  }

var storage = {
    get start() {
        return (localStorage.getItem('index')) ? parseInt(localStorage.getItem('index')) : 0;
    },
    set update(i){
        localStorage.setItem('index', i);
    }
}

var xhr = i =>{
    let req = new XMLHttpRequest();
    req.open('GET', './content/strip' + pad(i) + '.gif')
    req.responseType = 'blob';
    req.onload = loaded;
    req.send(null);
}

var loaded = e =>{
    let blob = URL.createObjectURL(e.target.response);
    let img = document.getElementById('img')
    img.src = blob;
}

document.addEventListener("DOMContentLoaded", setup)