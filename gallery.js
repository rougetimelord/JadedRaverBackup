var setup = () =>{
    let blobs = {};
    let next = document.getElementById('next'), prev = document.getElementById('prev'), img = document.getElementById('img');
    let i = storage.start;
    let pad = n =>{
        return (n <= 999) ? ('00'+n).slice(-3) : n.toString();
    };
    let loaded = e =>{
        let blob = URL.createObjectURL(e.target.response);
        blobs[i] = blob;
        img.src = blob;
    };
    let xhr = i =>{
        let req = new XMLHttpRequest();
        req.open('GET', './content/strip' + pad(i) + '.gif');
        req.responseType = 'blob';
        req.onload = loaded;
        req.send(null);
    };
    let update = () =>{
        if(i == 0){
            prev.classList.add('hid');
        }
        else if(i == 68){
            next.classList.add('hid');
        }
        else{
            prev.classList.remove('hid');
            next.classList.remove('hid');
        }
        (blobs[i]) ? img.src = blobs[i] : xhr(i);
        storage.update = i;
    };
    next.addEventListener('click', () =>{i += (i < 68) ? 1 : 0; update();});
    prev.addEventListener('click', () =>{i -= (i > 0) ? 1 : 0; update();});
    document.addEventListener('keydown', e =>{
        if(e.keyCode == 39){i += (i < 68) ? 1 : 0; update();}
        if(e.keyCode == 37){i -= (i > 0) ? 1 : 0; update();}
    });
    if(window.TouchEvent){
        let touch = e => {
            i += (i < 68) ? 1 : 0;
            update();
        };
        img.addEventListener('touchstart', touch, {capture: false, passive: true});
    }
    update();
};

var storage = {
    get start() {
        return (localStorage.getItem('index')) ? parseInt(localStorage.getItem('index')) : 0;
    },
    set update(i){
        localStorage.setItem('index', i);
    }
};

document.addEventListener('DOMContentLoaded', setup);