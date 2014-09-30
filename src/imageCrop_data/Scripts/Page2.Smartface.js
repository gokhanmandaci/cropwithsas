function Page2_Canvas1_OnTouchMove(e) {
    if ((e.y > (Pages.Page2.Container1.ImageToCrop.top + 10)) && (e.y < (Pages.Page2.Container1.ImageToCrop.top + Pages.Page2.Container1.ImageToCrop.height + 25)) && (e.x > Pages.Page2.Container1.ImageToCrop.left) && (e.x < (Pages.Page2.Container1.ImageToCrop.left + Pages.Page2.Container1.ImageToCrop.width))) {
        if (((e.x >= Pages.Page2.Container1.Image1.left - 30) && (e.x <= (Pages.Page2.Container1.Image1.left + 60))) && ((e.y >= Pages.Page2.Container1.Image1.top - 30) && (e.y <= (Pages.Page2.Container1.Image1.top + 60)))) {
            Pages.Page2.Container1.Image1.image = "sag-alt2.png";
            Pages.Page2.Container1.Image2.image = "sol-ust.png";
            Pages.Page2.Container1.Image3.image = "sag-ust.png";
            Pages.Page2.Container1.Image4.image = "sol-alt.png";
            if ((cnvsX1 + 30) < (e.x) && (cnvsY1 + 30) < (e.y)) { // sınır kontrölü
                Pages.Page2.Container1.Image1.left = e.x;
                Pages.Page2.Container1.Image1.top = e.y - 15;
                cnvsX2 = e.x;
                cnvsY2 = e.y - 15;
                cropX2 = e.x - 15;
                cropY2 = e.y - 15 - diff;
            }
        } else if (((e.x >= Pages.Page2.Container1.Image2.left - 30) && (e.x <= (Pages.Page2.Container1.Image2.left + 60))) && ((e.y >= Pages.Page2.Container1.Image2.top - 30) && (e.y <= (Pages.Page2.Container1.Image2.top + 90)))) {
            Pages.Page2.Container1.Image1.image = "sag-alt.png";
            Pages.Page2.Container1.Image2.image = "sol-ust2.png";
            Pages.Page2.Container1.Image3.image = "sag-ust.png";
            Pages.Page2.Container1.Image4.image = "sol-alt.png";
            if (cnvsX2 > e.x && (e.y) < cnvsY2) { // sınır kontrölü
                Pages.Page2.Container1.Image2.left = e.x - 15;
                Pages.Page2.Container1.Image2.top = e.y - 15;
                cnvsX1 = e.x;
                cnvsY1 = e.y - 15;
                cropX1 = e.x;
                cropY1 = e.y - 15 - diff;
            }
        } else if (((e.x >= Pages.Page2.Container1.Image3.left - 30) && (e.x <= (Pages.Page2.Container1.Image3.left + 60))) && ((e.y >= Pages.Page2.Container1.Image3.top - 30) && (e.y <= (Pages.Page2.Container1.Image3.top + 90)))) {
            Pages.Page2.Container1.Image1.image = "sag-alt.png";
            Pages.Page2.Container1.Image2.image = "sol-ust.png";
            Pages.Page2.Container1.Image3.image = "sag-ust2.png";
            Pages.Page2.Container1.Image4.image = "sol-alt.png";
            if ((cnvsX1 + 30) < (e.x) && cnvsY2 > (e.y)) {
                Pages.Page2.Container1.Image3.left = e.x;
                Pages.Page2.Container1.Image3.top = e.y - 30;
                cnvsX2 = e.x;
                cnvsY1 = e.y - 15;
                cropX2 = e.x - 15;
                cropY1 = e.y - 15 - diff;
            }
        } else if (((e.x >= Pages.Page2.Container1.Image4.left - 30) && (e.x <= (Pages.Page2.Container1.Image4.left + 60))) && ((e.y >= Pages.Page2.Container1.Image4.top - 30) && (e.y <= (Pages.Page2.Container1.Image4.top + 60)))) {
            Pages.Page2.Container1.Image1.image = "sag-alt.png";
            Pages.Page2.Container1.Image2.image = "sol-ust.png";
            Pages.Page2.Container1.Image3.image = "sag-ust.png";
            Pages.Page2.Container1.Image4.image = "sol-alt2.png";
            if (cnvsX2 > e.x && (cnvsY1 + 30) < e.y) {
                Pages.Page2.Container1.Image4.left = e.x - 15;
                Pages.Page2.Container1.Image4.top = e.y - 15;
                cnvsX1 = e.x;
                cnvsY2 = e.y - 15;
                cropX1 = e.x;
                cropY2 = e.y - 15 - diff;
            }
        }
    }
    // cropRectangleSetting
    cropRectangleSetting();
}
function Page2_Self_OnShow(e) {
    /*header.init(this);
    header.setTitle("Düzenle");
    header.setLeftItem(backFunction);
    if (Device.deviceOS == "Android") {
    header.setRightItem("retakeact.png", cropFunction);
    } else {
    header.setRightItem("retakenav.png", cropFunction);
    }*/
    // cropRectangleSetting
    if (Device.deviceOS == "Android") {
        cnvsX1 = 120 * Device.screenWidth / 640;
        cnvsX2 = Device.screenWidth - cnvsX1;
        cnvsY1 = 250 * Device.screenHeight / 1046;
        cnvsY2 = Device.screenHeight - cnvsY1;
    } else {
        cnvsX1 = 120;
        cnvsX2 = 250;
        cnvsY1 = 250;
        cnvsY2 = 300;
    }
    cropX1 = cnvsX1;
    cropX2 = cnvsX2;
    cropY1 = cnvsY1;
    cropY2 = cnvsY2;
    // alert("cnvsX1 :" + cnvsX1 + "cnvsX2 :" + cnvsX2 + "cnvsY1 :" + cnvsY1 + "cnvsY2 :" + cnvsY2);
    cropRectangleSetting();
}
function cropFunction() {
    alert("cropX1 :" + cropX1 + "cropY1 :" + cropY1 + "cropX2 :" + cropX2 + "cropY2 :" + cropY2);
    cropImage(cropX1, cropY1, cropX2, cropY2);
}
function Page2_Self_OnKeyPress(e) {
    if (Device.deviceOS == "Android") {
        if (e.keyCode == 4) {
            Pages.back();
        }
    }
}
function cropRectangleSetting() {
    // Rectangle of Crop
    Pages.Page2.Container1.CropRectangle.left = cnvsX1;
    Pages.Page2.Container1.CropRectangle.top = cnvsY1;
    Pages.Page2.Container1.CropRectangle.height = cnvsY2 - cnvsY1;
    Pages.Page2.Container1.CropRectangle.width = cnvsX2 - cnvsX1;
    //sağ alt köşedeki kare
    Pages.Page2.Container1.Image1.left = cnvsX2;
    Pages.Page2.Container1.Image1.top = cnvsY2;
    //sol üst köşedeki kare
    Pages.Page2.Container1.Image2.left = cnvsX1 - 15;
    Pages.Page2.Container1.Image2.top = cnvsY1 - 15;
    //sağ üst köşedeki kare
    Pages.Page2.Container1.Image3.left = cnvsX2;
    Pages.Page2.Container1.Image3.top = cnvsY1 - 15;
    //sol alt köşedeki kare
    Pages.Page2.Container1.Image4.left = cnvsX1 - 15;
    Pages.Page2.Container1.Image4.top = cnvsY2;
    //üst kısım gölge alanı
    Pages.Page2.Container1.RectangleA.height = cnvsY1;
    //alt kısım gölge alanı
    Pages.Page2.Container1.RectangleB.top = cnvsY2;
    Pages.Page2.Container1.RectangleB.height = Device.screenHeight - cnvsY2;
    //sol kısım gölge alanı
    Pages.Page2.Container1.RectangleC.width = cnvsX1;
    Pages.Page2.Container1.RectangleC.top = cnvsY1;
    Pages.Page2.Container1.RectangleC.height = Device.screenHeight - Pages.Page2.Container1.RectangleB.height - cnvsY1;
    //sağ kısım gölge alanı
    Pages.Page2.Container1.RectangleD.left = cnvsX2;
    Pages.Page2.Container1.RectangleD.top = cnvsY1;
    Pages.Page2.Container1.RectangleD.height = Device.screenHeight - Pages.Page2.Container1.RectangleB.height - cnvsY1;
}
function Page2_TextButton2_OnPressed(e) {
    cropImage(cropX1, cropY1, cropX2, cropY2);
}