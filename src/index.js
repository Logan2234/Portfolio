// When the user scrolls the page, execute scrollFunc
window.addEventListener("scroll", scrollFunc, false);

function scrollFunc() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;

    if (winScroll > 200){
        document.getElementsByTagName("header")[0].classList.add("scrolled");
    } else {
        document.getElementsByTagName("header")[0].classList.remove("scrolled");
    }
    // document.getElementsByTagName("header").style.width = scrolled + "%";
}
