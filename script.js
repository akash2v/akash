// let a = document.querySelector('#meri_girlfriend_nahi_hai'); // Majaak nahi kar rahaa hoon
// Code review karne walo ise ignore karo
// let music = new Audio("./background2.mp3");
// let music = new Audio("https://aac.saavncdn.com/505/24f26a11cc134dd4f35320223703f1ab_160.mp4");
// let music = new Audio("https://aac.saavncdn.com/173/81e61adbe432cded6134cb22c9cb8d9c_160.mp4");
var span = document.querySelectorAll('.skills span');
// music.loop = true;


window.addEventListener('load', () => {
    if (window.innerWidth <= 500) {
        // a.setAttribute('src', '')
    }
});

// let btn = document.querySelector('#player_control');
// btn.addEventListener('click', () => {
//     // a.muted = false;
//     switch (music.paused) {

//         case true:
//             // a.muted=false;
//             music.play()
//             btn.classList.remove('fa-volume-mute');
//             btn.classList.add('fa-volume-up');
//             btn.style.color = "red";
//             shake(true);
//             // btn.classList.add('fa-spin');
//             spin();

//             break;

//         default:
//             spin();
//             // a.muted = true;
//             music.pause();
//             btn.classList.remove('fa-volume-up');
//             btn.style.color = "#000";
//             // btn.classList.remove('fa-spin');
//             btn.classList.add('fa-volume-mute');
//             shake(false);
//             break;
//     }

// });

// let dsa = document.getElementById('dsa');
// dsa.addEventListener('mouseover',()=>{
//     dsa.innerText='Developer Shivani Algorithms';
//     dsa.style.backgroundColor='red';
//     dsa.style.color='#fff';
// });
// dsa.addEventListener('mouseout',()=>{
//     dsa.innerText='DSA Sikh Raha hoon';
//     dsa.style.backgroundColor='#fff';
//     dsa.style.color='blue';
// });
function spin() {
    let a = document.querySelectorAll('i');
    for (let i = 0; i < a.length; i++) {
        if (a[i].classList.contains('fa-spin')) {
            a[i].classList.remove('fa-spin');
        } else {
            a[i].classList.add('fa-spin');
        }
    }
}
function shake(anm = false) {
    for (let i = 0; i < span.length; i++) {
        if (anm == true) {
            span[i].classList.add('shake');
        } else {
            span[i].classList.remove('shake');
        }
    }
}