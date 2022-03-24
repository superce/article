function getRem(design_w, unit) {
    var html = document.getElementsByTagName("html")[0];
    var real_w = document.documentElement.clientWidth;
    (real_w > design_w) && (real_w = design_w);
    html.style.fontSize = real_w / design_w * unit + "px";
}
getRem(780, 100);
//window.addEventListener("resize",getRem);
window.onresize = function () {
    getRem(780, 100)
};