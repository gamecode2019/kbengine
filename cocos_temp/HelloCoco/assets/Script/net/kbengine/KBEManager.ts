import { KBEngine } from "../../mylibs/libcode";

//数据上报
export class KBEManager {
    private static instance: KBEManager;
    public static get Instance(): KBEManager {
        if (this.instance == null) {
            this.instance = new KBEManager();
        }
        return this.instance;
    }

    constructor() {

    }

    init() {
        this.initKbengine();
    }

    private initKbengine() {
        console.info('::', KBEngine);
        var args = new KBEngine.KBEngineArgs();

        args.ip = "192.168.3.112";
        args.port = "20013";
        args.isWss = false;              //是否用wss协议， true:wss  false:ws
        args.isByIP = true;             //用ip还是用域名登录服务器   有修改官方的kbengine.js
        args.serverURL = "smtd.com";
        KBEngine.create(args);
    }

    registerEvents() {
        KBEngine.Event.register("onConnectionState", this, "onConnectionState");
        KBEngine.Event.register("onLoginFailed", this, "onLoginFailed");
        KBEngine.Event.register("onLoginBaseappFailed", this, "onLoginBaseappFailed");
        KBEngine.Event.register("onReloginBaseappFailed", this, "onReloginBaseappFailed");
        KBEngine.Event.register("onReloginBaseappSuccessfully", this, "onReloginBaseappSuccessfully");
        KBEngine.Event.register("onLoginBaseapp", this, "onLoginBaseapp");
        KBEngine.Event.register("onEnterScene", this, "onEnterScene");
        //
    }

    unRegisterEvents() {
        KBEngine.Event.deregister("onConnectionState", this, "onConnectionState");
        KBEngine.Event.deregister("onLoginFailed", this, "onLoginFailed");
        KBEngine.Event.deregister("onLoginBaseappFailed", this, "onLoginBaseappFailed");
        KBEngine.Event.deregister("onReloginBaseappFailed", this, "onReloginBaseappFailed");
        KBEngine.Event.deregister("onReloginBaseappSuccessfully", this, "onReloginBaseappSuccessfully");
        KBEngine.Event.deregister("onLoginBaseapp", this, "onLoginBaseapp");
        KBEngine.Event.deregister("onEnterScene", this, "onEnterScene");
        //
    }
    onConnectionState(success) {
        var logStr = "";
        if (!success) {
            logStr = " Connect(" + KBEngine.app.ip + ":" + KBEngine.app.port + ") is error! (连接错误)";
        }
        else {
            logStr = "Connect successfully, please wait...(连接成功，请等候...)";
        }
        KBEngine.INFO_MSG(logStr);
    }

    onLoginFailed(failedcode) {
        var logStr = '';
        if (failedcode == 20) {
            logStr = "Login is failed(登陆失败), err=" + KBEngine.app.serverErr(failedcode) + ", " + KBEngine.app.serverdatas;
        }
        else {
            logStr = "Login is failed(登陆失败), err=" + KBEngine.app.serverErr(failedcode);
        }
        KBEngine.INFO_MSG(logStr);
    }

    onLoginBaseappFailed(failedcode) {
        KBEngine.INFO_MSG("LoginBaseapp is failed(登陆网关失败), err=" + KBEngine.app.serverErr(failedcode));
    }

    onReloginBaseappFailed(failedcode) {
        KBEngine.INFO_MSG("reogin is failed(断线重连失败), err=" + KBEngine.app.serverErr(failedcode))
    }

    onReloginBaseappSuccessfully() {
        KBEngine.INFO_MSG("reogin is successfully!(断线重连成功!)")
    }

    onLoginBaseapp() {
        cc.log("Connect to loginBaseapp, please wait...(连接到网关， 请稍后...)");
    }

    onEnterScene(){
        KBEngine.INFO_MSG("Login is successfully!(登陆成功!)");
    }


    sendLogin() {
        // if(KBEngine.FirstEntity.isPlayer()) {
        //     if(window['wx'] != undefined){
        //         // this.decodeEncryptedData();
        //     }
        //     return;
        // }
        var randomstring = function(L){
            var s= '';
            var randomchar=function(){
             var n= Math.floor(Math.random()*62);
             if(n<10) return n; //0-9
             if(n<36) return String.fromCharCode(n+55); //A-Z
             return String.fromCharCode(n+61); //a-z
            }
            while(s.length< L) s+= randomchar();
            return s;
        }
        var userName = randomstring(4);
        var datas = `{'platform':${cc.sys.platform}}`;
        KBEngine.INFO_MSG("login name=" + userName);
        // KBEngine.Event.fire("login", userName, "123456",KBEngine.stringToUTF8Bytes(datas));
        KBEngine.Event.fire("login", userName, "123456", datas);
    }

}
