function Page1_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Application.exit();
    }
}
function Page1_Self_OnShow() {
    //Uncomment following block for navigationbar/actionbar sample
    /*
    //Copy this code block to every page onShow
    header.init(this);
    header.setTitle("Page1");
    header.setRightItem("Click");
    header.setLeftItem();
    /**/
    //header.init(this);
    //header.setTitle("Main");
    //navActHeight = Device.screenHeight - Pages.Page1.Container1.height;
    if (Device.brandModel == "iPhone 5" || Device.brandModel == "iPhone 5S" || Device.brandModel == "iPhone 6") {
        navActHeight = 88;
    } else {
        navActHeight = 44;
    }
}
function Page1_TextButton1_OnPressed(e) {
    openCameraAndResize();
}