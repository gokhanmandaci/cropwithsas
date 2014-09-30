function Global_Events_OnStart(e) {
    changeLang(Device.language, true);
    //      Uncomment following block for navigationbar/actionbar sample. Read the JS code file for usage.
    //        Also uncomment related block in Page1
    /*
    load("HeaderBar.js");
    header = new HeaderBar();
    /**/
    //      Uncomment following block for menu sample. Read the JS code file for usage.
    /*
    load("Menu.js");
    /**/
}
var cnvsX2 = 200, cnvsY2 = 250, cnvsX1 = 50, cnvsY1 = 150;
var cropX1 = 50, cropX2, cropY1 = 150, cropY2;
var diff;
var navActHeight = 88;
function changeRectPosition() {
    Pages.Page2.Container1.Rectangle1.left = Device.touchX;
    Pages.Page2.Container1.Rectangle1.top = Device.touchY;
    cnvsX2 = Device.touchX;
    cnvsY2 = Device.touchY;
}
function Global_Events_OnError(e) {
    switch (e.type) {
    case "Server Error":
    case "Size Overflow":
        alert(lang.networkError);
        break;
    default:
        SES.Analytics.eventLog("error", JSON.stringify(e));
        alert(lang.applicationError);
        break;
    }
}
var imageURL;
function openCameraAndResize() {
    var format = SMF.ImageFormat;
    var compRate = 1;
    var imWidth;
    var imHeight;
    SMF.Multimedia.startCamera(1, 0, 1,
        function () {},
        function (e) {
        var im = new SMF.Image({
                imageUri : e.photoUri,
                onSuccess : function (e) {
                    //alert(im.width / im.height);
                    imWidth = im.width;
                    imHeight = im.height;
                    var photoRate = imHeight / imWidth;
                    var screenRate = (Device.screenHeight - navActHeight) / Device.screenWidth;
                    var pageImageWitdh,
                    resizedHeight,
                    resizedHeightRounded,
                    firstHeight;
                    if (photoRate < screenRate) {
                        pageImageWitdh = Device.screenWidth * 0.9;
                        resizedHeight = (imHeight / imWidth) * pageImageWitdh;
                        resizedHeightRounded = Math.floor(resizedHeight);
                        firstHeight = Device.screenHeight;
                        Pages.Page2.Container1.ImageToCrop.height = resizedHeightRounded;
                        Pages.Page2.Container1.ImageToCrop.width = pageImageWitdh;
                        //Pages.Page2.Canvas1.height = resizedHeightRounded + 60;
                        Pages.Page2.Container1.ImageToCrop.top = (firstHeight - resizedHeightRounded - navActHeight) / 2;
                        //Pages.Page2.Canvas1.top = (firstHeight - resizedHeightRounded - 66)/2 + 30;
                        diff = (firstHeight - resizedHeightRounded - navActHeight) / 2;
                    } else {
                        resizedHeightRounded = (Device.screenHeight - navActHeight) * 0.9;
                        pageImageWitdh = (imWidth / imHeight) * resizedHeightRounded;
                        pageImageWitdh = Math.floor(pageImageWitdh);
                        firstHeight = Device.screenHeight;
                        Pages.Page2.Container1.ImageToCrop.height = resizedHeightRounded;
                        Pages.Page2.Container1.ImageToCrop.width = pageImageWitdh;
                        //Pages.Page2.Canvas1.height = resizedHeightRounded + 60;
                        Pages.Page2.Container1.ImageToCrop.top = (firstHeight - resizedHeightRounded - navActHeight) / 2;
                        //Pages.Page2.Canvas1.top = (firstHeight - resizedHeightRounded - 66)/2 + 30;
                        diff = (firstHeight - resizedHeightRounded - navActHeight) / 2;
                    }
                    im.resize({
                        width : pageImageWitdh,
                        height : resizedHeightRounded,
                        format : format,
                        compressionRate : compRate,
                        onSuccess : function (e) {
                            //alert(pageImageWitdh / resizedHeightRounded);
                            imageURL = e.image;
                            /*Data.DS_Image.clear();
                            Data.DS_Image.add();
                            Data.DS_Image.data = e.image;
                            Data.DS_Image.commit();
                            Data.DS_Image.refresh();
                            Data.notify("Data.DS_Image");*/
                            /*Pages.Page2.ImageToCrop.image = e.image;
                            Pages.Page2.show();*/
                        },
                        onError : function (e) {
                            alert("Error: " + e.message);
                        }
                    })
                    /*Data.DS_Image.clear();
                    Data.DS_Image.add();
                    Data.DS_Image.data = e.photoUri;
                    Data.DS_Image.commit();
                    Data.DS_Image.refresh();
                    Data.notify("Data.DS_Image");*/
                    Pages.Page2.Container1.ImageToCrop.image = e.photoUri; //Data.DS_Image.data; //im;
                    Pages.Page2.show();
                },
                onError : function (e) {
                    alert("Error: " + e.message);
                }
            });
    },
        function () {},
        function () {});
}
function cropImage(cx1, cy1, cx2, cy2) {
    //var myImageUri = imageURL; //Data.DS_Image.data;
    var format = SMF.ImageFormat;
    var compRate = 1;
    var im = new SMF.Image({
            imageUri : imageURL,
            onSuccess : function (e) {
                im.crop({
                    x1 : cx1,
                    y1 : cy1,
                    x2 : cx2,
                    y2 : cy2,
                    format : format,
                    compressionRate : compRate,
                    onSuccess : function (e) {
                        Pages.Page3.Image1.image = e.image;
                        alert("cX1 : " + cx1 + "cX2 : " + cx2 + "cY1 : " + cy1 + "cY2 : " + cy2);
                        Pages.Page3.show();
                    },
                    onError : function (e) {
                        alert("Error: " + e.message);
                    }
                });
            },
            onError : function (e) {
                alert("Error: " + e.message);
            }
        });
}
/*
function HeaderBar() {
this.navigationItem = null;
this.actionBar = null;
this.isAndroid = Device.deviceOS == "Android" ? true : false; //A control variable to check the environment is Android Operating System
//Initilaizes actionbar / navigation item for the page which is provided with the parameter
this.init = function (page) {
//Sets ActctionBar for Android
if (this.isAndroid == true) {
this.actionBar = page.actionBar;
this.actionBar.visible = true;
//  this.actionBar.backgroundColor = "black";
this.actionBar.backgroundImage = "navbar_bg.png";
} else {
//Sets NavigationITem for iOS
this.navigationItem = page.navigationItem;
SMF.UI.iOS.NavigationBar.backgroundImage = "navbar_bg.png";
//SMF.UI.iOS.NavigationBar.fillColor = SMF.UI.Color.black;
SMF.UI.iOS.NavigationBar.visible = true;
}
}
//Sets the visible Title text in ActibonBar/NavigationItem
this.setTitle = function (title) {
if (this.isAndroid == true) {
this.actionBar.titleView = {
type : SMF.UI.TitleViewType.text,
text : title,
textSize : 20,
left : 0,
textColor : "white",
alignment : SMF.UI.Alignment.center
};
} else {
this.navigationItem.titleView = {
type : SMF.UI.TitleViewType.text,
text : title,
frame : [200, 0, 120, 54],
fontSize : 20,
textColor : "#FFFFFF",
alignment : SMF.UI.Alignment.left
};
}
}
//Sets the button on right side of the title with the provided text
this.setRightItem = function (imageicon, func) {
if (this.isAndroid && this.actionBar) {
var item = new SMF.UI.Android.MenuItem({
id : "itemAbout",
icon : imageicon,
showAsAction : SMF.UI.Android.ShowAsAction.always,
onSelected : func
});
this.actionBar.menuItems = [item];
} else if (!this.isAndroid) {
var item = new SMF.UI.iOS.BarButtonItem({
image : imageicon,
onSelected : func
});
this.navigationItem.rightBarButtonItems = [item];
}
}
// Sets a pressible item to the left of the title
this.setLeftItem = function (func1) {
var key = {
id : 0,
image : "backok.png",
// showAsAction : SMF.UI.Android.ShowAsAction.always, //Always place this item in the Action Bar. Avoid using this unless it's critical that the item always appear in the action bar. Setting multiple items to always appear as action items can result in them overlapping with other UI in the action bar.
onSelected : func1
};
/*var key2 = {
id : 0,
image : "arablogoios.png",
// showAsAction : SMF.UI.Android.ShowAsAction.always, //Always place this item in the Action Bar. Avoid using this unless it's critical that the item always appear in the action bar. Setting multiple items to always appear as action items can result in them overlapping with other UI in the action bar.
//onSelected : func1,
//fontSize : 8
};
if (this.isAndroid == true) {
this.actionBar.icon = "backok.png";
this.actionBar.displayHomeAsUpEnabled = false;
this.actionBar.displayShowHomeEnabled = true;
this.actionBar.onHomeIconItemSelected = func1;
} else {
var leftItem = new SMF.UI.iOS.BarButtonItem(key);
//var leftItem2 = new SMF.UI.iOS.BarButtonItem(key2);
this.navigationItem.leftBarButtonItems = [leftItem];
}
}
}
var header = new HeaderBar();*/
function backFunction() {
    Pages.back();
}