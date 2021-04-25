function LoginUI(){
    this.IsIE = true;
    this.IE = 6;
}
LoginUI.prototype = {
    brower : function(){
        try{
            if(window.navigator.userAgent.indexOf("MSIE") == -1){
                this.IsIE = false;                
            }else{
                if(window.navigator.userAgent.indexOf("MSIE 6")!=-1)
                    this.IE=6;
                else if(window.navigator.userAgent.indexOf("MSIE 7")!=-1)
                    this.IE=7;
                else if(window.navigator.userAgent.indexOf("MSIE 8")!=-1)
                    this.IE=8;
                else if(window.navigator.userAgent.indexOf("MSIE 9")!=-1)
                    this.IE=9;
            }
        }catch(e){}
    },
    getHeight : function(){
        var hei = document.documentElement.clientHeight;
        if(hei < 530)
            hei = 530;
        return hei;
    },
    getIntHei : function(hei){
        var inte = hei - document.documentElement.clientHeight;
        if(inte>70)
            inte = 70;
        return inte;
    },
    isLowHei : function(hei){
        var rtn = false;
        if(hei > document.documentElement.clientHeight)
            rtn = true;
        return rtn;
    },
    isDisp : function(hei){
        var rtn = false;        
        if(hei - document.documentElement.clientHeight > 90)
            rtn = true;
        return rtn;
    },
    kdInit : function(){
        var height = this.getHeight();
        document.body.style.height = height + 'px';
        document.getElementById('LoginBI').style.height = height + 'px';
        document.getElementById('LoginBIImg').style.height = (height-43) + 'px';
        document.getElementById('LoginMain').style.height = height + 'px';
        document.getElementById('LoginBox').style.marginTop = (height/2 - 170) + 'px';            
        document.getElementById('LoginWebDiv').style.marginTop = (height/2 - 200) + 'px';   
        document.getElementById('TipBoxInfo').style.marginTop = (height/2+155)+'px';
        this.SetLan();
    },
    kdresize : function(){
        var height = this.getHeight();
        document.body.style.height = height + 'px';
        document.getElementById('LoginBI').style.height = height + 'px';
        if(this.isLowHei(height))
            document.getElementById('LoginBIImg').style.height = (height-43-this.getIntHei(height)) + 'px';
        else
            document.getElementById('LoginBIImg').style.height = (height-43) + 'px';
        document.getElementById('LoginMain').style.height = height + 'px';
        document.getElementById('LoginBox').style.marginTop = (height/2 - 170) + 'px';            
        document.getElementById('LoginWebDiv').style.marginTop = (height/2 - 200) + 'px';   
        document.getElementById('TipBoxInfo').style.marginTop = (height/2+155)+'px';
        if(this.isDisp(height))
            document.getElementById('BottomTipBox').style.display = 'none';
        else
            document.getElementById('BottomTipBox').style.display = 'block';
    },
    resize : function(){    
        this.brower();
        var height = this.getHeight();
        document.body.style.height = height + 'px';
        document.getElementById('LoginBI').style.height = height + 'px';
        if(this.isLowHei(height))
            document.getElementById('LoginBIImg').style.height = (height-43-this.getIntHei(height)) + 'px';
        else
            document.getElementById('LoginBIImg').style.height = (height-43) + 'px';
        document.getElementById('LoginMain').style.height = height + 'px';
        document.getElementById('LoginBox').style.marginTop = (height/2 - 170) + 'px';
        if(loginSystem == 'LoginHR')
            document.getElementById('LoginWebDiv').style.display = 'none';
        else
            document.getElementById('LoginWebDiv').style.marginTop = (height/2 - 200) + 'px';   
        document.getElementById('TipBoxInfo').style.marginTop = (height/2+167)+'px';
        if(this.isDisp(height))
            document.getElementById('BottomTipBox').style.display = 'none';
        else
            document.getElementById('BottomTipBox').style.display = 'block';
    },
    init : function(){
        this.brower();        
        var height = this.getHeight();
        document.body.style.height = height + 'px';
        document.getElementById('LoginBI').style.height = height + 'px';
        if(this.isLowHei(height))
            document.getElementById('LoginBIImg').style.height = (height-43-this.getIntHei(height)) + 'px';
        else
            document.getElementById('LoginBIImg').style.height = (height-43) + 'px';
        document.getElementById('LoginMain').style.height = height + 'px';
        document.getElementById('LoginBox').style.marginTop = (height/2 - 170) + 'px';
        if(loginSystem == 'LoginHR')
            document.getElementById('LoginWebDiv').style.display = 'none';
        else
            document.getElementById('LoginWebDiv').style.marginTop = (height/2 - 200) + 'px';   
        document.getElementById('TipBoxInfo').style.marginTop = (height/2+167)+'px';
        if(this.isDisp(height))
            document.getElementById('BottomTipBox').style.display = 'none';
        else
            document.getElementById('BottomTipBox').style.display = 'block';
        //datasource        
        var k3ds = GetCookie('hrdbid2');
        var database = document.getElementById('ddlDatabases');
        if(k3ds == null && database.options.length>0){
            database.options[0].selected = true;
        }else{
            var isSele = false;
            for(var i=0;i<database.options.length;i++){
                if(database.options[i].value == k3ds){
                    database.options[i].selected = true;
                    isSele = true;
                    break;
                }
            }
            if(!isSele && database.options.length > 0)
                database.options[0].selected = true;            
        }
        if(loginSystem != 'LoginHR'){
            //systems
            var k3sys = GetCookie('K3WebSystem');
            var system = document.getElementById('ddlSystems');
            if(g_guisys != ''){
                system.disabled = true;
            }
            else{
                 if(k3sys == null && system.options.length>0){
                    system.options[0].selected = true;
                }else{
                    var isSele = false;
                    for(var i=0;i<system.options.length;i++){
                        if(system.options[i].value == k3sys){
                            system.options[i].selected = true;
                            isSele = true;
                            break;
                        }
                    }
                    if(!isSele && system.options.length > 0)
                        system.options[0].selected = true;         
                }
            }
        }        
        //loginmode
       var lMode = GetCookie(LoginMode);
       if(lMode == null){
            document.getElementsByName('rbLoginMode')[0].checked = true;
       }else{
            document.getElementById(lMode).checked = true;
       }
       ChangeColor(lMode);
       if(lMode != LoginFromRegion){
            //username            
            var userAcc = GetCookie('UserAccount');
            if(userAcc != null && userAcc != 'null')
                document.getElementById('txtUserName').value = userAcc;   
       }
      this.SetLan();
    },
    save : function(){
        var nd= new Date();
	    nd.setTime (nd.getTime()+(365*24*60*60*1000));
        var database = document.getElementById('ddlDatabases');
        var k3ds = database.options[database.selectedIndex].value;
        SetCookie('hrdbid2', k3ds, nd, null, null);
        if(loginSystem != 'LoginHR'){
            var system = document.getElementById('ddlSystems');            
            if(system.options.length > 0 && system.selectedIndex>=0 && system.options[system.selectedIndex]){
                var k3sys = system.options[system.selectedIndex].value;
                SetCookie('K3WebSystem', k3sys, nd, null, null);   
            }
        } 
        var lMode = GetCookie(LoginMode);     
        if(lMode != LoginFromRegion){
            var userAcc = document.getElementById('txtUserName').value;
            SetCookie('UserAccount', userAcc, nd, null, null);
        }
        var languagetype = document.getElementById('hdLanguageType').value;
        SetCookie('languagetype', languagetype, nd, null, null);
        
    },
    saveMode : function (eve){
        var nd= new Date();
	    nd.setTime (nd.getTime()+(365*24*60*60*1000));
	    SetCookie(LoginMode, eve.id, nd, null, null);
	    ChangeColor(eve.id);
    },
    changeLan : function(eve){
        var id = eve.id;
        
    },
    loginPwd : function(type){
        if(type == 1){
            document.getElementById('loginEnd').style.display = 'none';
            document.getElementById('Password').style.display = 'none';
            if(document.getElementById('Code'))
                document.getElementById('Code').style.display = 'none';
            document.getElementById('pwdEnd').style.display = '';
            document.getElementById('Email').style.display = '';
            document.getElementById('Flag').style.display = '';
        }else if(type == 2){
            document.getElementById('loginEnd').style.display = '';
            document.getElementById('Password').style.display = '';
            if(document.getElementById('Code'))
                document.getElementById('Code').style.display = '';
            document.getElementById('pwdEnd').style.display = 'none';
            document.getElementById('Email').style.display = 'none';
            document.getElementById('Flag').style.display = 'none';
        }
    },
    SetLan : function(){
        //lan
        var lang = GetCookie('languagetype');
        var domImg = document.getElementById('LoginLogoImg');
        if(urlLang != '')
            lang = urlLang;
        if(lang == 'zh-chs' || lang == null){
            document.getElementById('aChs').src = 'images/new_chs_c.png';
            if(loginSystem != 'LoginHR')
                domImg.src = 'images/new_k3wise_chs_11.png';
            else
                domImg.src = 'images/new_kdhrms_chs_11.png';
        }else if(lang == 'zh-cht'){
            document.getElementById('aCht').src = 'images/new_cht_c.png';
            if(loginSystem != 'LoginHR')
                domImg.src = 'images/new_k3wise_cht_11.png';
            else
                domImg.src = 'images/new_kdhrms_cht_11.png';
        }else if(lang == 'en'){
            document.getElementById('aEn').src = 'images/new_en_c.png';
            if(loginSystem != 'LoginHR')
                domImg.src = 'images/new_k3wise_en_11.png';
            else
                domImg.src = 'images/new_kdhrms_en_11.png';
        }
    }
}

function SetCookie (name, value) 
{
    var argv = SetCookie.arguments;
    var argc = SetCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 4) ? argv[5] : false;
    document.cookie = name + "=" + escape (value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain));
}
function GetCookie(sName)
{
    var value = null;
    var aCookie = document.cookie.split("; ");
    for (var i=0; i < aCookie.length; i++)
    {
	    var aCrumb = aCookie[i].split("=");
	    if (sName == aCrumb[0]){ 
            value = unescape(aCrumb[1]);
            break;
        }
    }
    if(value == undefined || value == 'undefined')
        value = null;        
    return value;
}