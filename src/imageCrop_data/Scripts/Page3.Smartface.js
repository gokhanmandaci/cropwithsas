function Page3_Self_OnShow(e){
    /*header.init(this);
    header.setTitle("Kayıt");
    if(Device.deviceOS == "iOS"){
        header.setLeftItem(backFunction);
    }*/
}
function Page3_Self_OnKeyPress(e){
    if(Device.deviceOS == "Android"){
        if(e.keyCode == 4){
            Pages.back();
        }
    }
}