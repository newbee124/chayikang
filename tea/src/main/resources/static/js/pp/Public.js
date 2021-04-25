/*Selected Row*/
function pointTo() 
{ 
	var src = event.srcElement.parentElement; 
	if (src && src.tagName =='TR') 
		{ 
			ClearSel(); 
			src.className="SelectedColor";
		} 
} 
//由于开发环境一般使用的是w2k.ie6.0
//输入在w2k.ie6.0调试好的高度，通过浏览器自动调整。
function AdjustIEDialogHeight(height)
{
  var ua = navigator.userAgent;
  var ret = height;
  if(ua.lastIndexOf("MSIE 6.0") != -1)
  {
	  if(ua.lastIndexOf("Windows NT 5.1") != -1)
	  {
	    //alert("xp.ie6.0");
	    ret = height+10;
	  }
	  else if(ua.lastIndexOf("Windows NT 5.0") != -1)
	  {
	    //alert("w2k.ie6.0");
	    ret = height;
	  }
  }
  else
  {
  	  //alert("ie7.0");
  	  ret = height-27;
  }
  return ret +"px";
}
/*Clear Row BackGroundColor*/					
function ClearSel()    
{
	var objTr=document.all.tags('Tr'); 
	for (var i=1;i<objTr.length;i++) 
	{ 
		if (objTr[i].id != "")
		{
			if ( i%2!=0 ) 
			{ 
				//objTr[i].className="unselectedColor"; 
				objTr[i].className="altercolor";
			} 
			else 
			{
				//objTr[i].className="altercolor";
				objTr[i].className="unselectedColor"; 
			}
		}
	} 
} 

function GetHelpCookie(name)
{
	var cookies = window.document.cookie.split("; ");
	for (var i=0; i < cookies.length; i++)
	{
		var single = cookies[i].split("=");
		if (name == single[0]) 
		{
		    return unescape(single[1]);
		}
	}
	
	return "";
}

window.onhelp = function()
{
    showHRHelp();
    return false;
}

function SetHelpCookie(name,value) 
{
    document.cookie = name + "=" + escape(value);
}

function showCRMHelp()
{
    var menuID = GetHelpCookie("CRMHelp");
    var helpUrl = "source/index.htm";
    var url = "../BOS/ClientGetData.aspx?Source=GetHelpMenuID&menuID=" + menuID; 
    var ret = PostDataText(url,""); 
    
    var arrayUrl = ret.split("#|#");
    if(arrayUrl.length == 2)
    {
        if(arrayUrl[0] != null && arrayUrl[0] != "")
        {
            helpUrl = "source/" + arrayUrl[0];
        }
        if(arrayUrl[1].length > 0)
        {        
            switch(arrayUrl[1].toUpperCase())
            {
                case "OPP.CHM":
                    window.open("../CRM/OPPHelp/Default.asp?helpUrl="+helpUrl,"OPPHelp");
                    break;
                case "SV.CHM":
                    window.open("../CRM/SVHelp/Default.asp?helpUrl="+helpUrl,"SVHelp");
                    break;
            }
        }
    }
    event.cancelBubble =true;
    event.returnValue  =false;
    return false;
}

function showHRHelp()
{
    var languageType="";
	languageType=GetHelpCookie("languagetype");
    var menuID = GetHelpCookie("HRHelp");
    var helpUrl = "source/index.htm";
    var url = "../Public/ClientGetData.aspx?Source=GetHelpMenuID&menuID=" + menuID;
    var convertUrl = "../HRHelp/Default.asp?helpUrl=";
    var tempUrl = "HRHelp/Default.asp?helpUrl=";
    if(languageType.toLowerCase() == "zh-cht")
    {
        convertUrl = "../HRHelp_cht/Default.asp?helpUrl=";
        tempUrl = "HRHelp_cht/Default.asp?helpUrl=";
    }
    else if(languageType.toLowerCase() == "en")
    {
        alert("Online help with this language version temporarily unavailable!");
        return;
    }
    var isLogined = true;
    var logUrl = "../Public/ClientGetData.aspx?Source=ISHRLongin";
    
    if(typeof(window.document.location) != "unknown")
    {
        var currentUrl = window.document.location.href;
        currentUrl = currentUrl.toLowerCase();

        if(currentUrl.toLowerCase().indexOf("modulechart.aspx")!=-1 
            || (currentUrl.indexOf("/default.aspx")!=-1&&currentUrl.indexOf("/sysmanage/")==-1&&currentUrl.indexOf("/workflow/")==-1) 
            || currentUrl.indexOf("navmenusubsys.aspx")!=-1 || currentUrl.indexOf("banner.aspx")!=-1)
        {
            url = "Public/ClientGetData.aspx?Source=GetHelpMenuID&menuID=" + menuID;
            convertUrl = tempUrl;
            logUrl = "Public/ClientGetData.aspx?Source=ISHRLongin";
        }
        else if(currentUrl.indexOf("multiapprove.aspx")!=-1 || currentUrl.indexOf("patypeedit.asp")!=-1 || currentUrl.indexOf("ldg5iepagesetup.aspx")!=-1) //审批类别|工资类别编辑|报表中的页面设置
        {
            url = "../../Public/ClientGetData.aspx?Source=GetHelpMenuID&menuID=" + menuID;
            convertUrl = "../../" + tempUrl;
            logUrl = "../../Public/ClientGetData.aspx?Source=ISHRLongin";
        }
        else if(currentUrl.indexOf("login.aspx")!=-1)
        {
            isLogined = false;
            url = "Public/ClientGetData.aspx?Source=GetHelpMenuID&menuID=" + menuID;
            convertUrl = tempUrl;
            logUrl = "Public/ClientGetData.aspx?Source=ISHRLongin";
        }
    }
 
    if(isLogined)
    {
        var retValue = PostDataText(logUrl,""); 
        if(retValue != null && retValue == "false")
        {
            return;
        }
        var ret = PostDataText(url,""); 
        if(ret != null && ret != "")
        {
            helpUrl = "source/" + ret;
        }
    }
    else
    {
        return;
    }

    window.showHelp(convertUrl + helpUrl,"HRHelp");
}

//srm帮助
function showSRMHelp()
{
    var menuID = GetHelpCookie("SRMHelp");
    var helpUrl = "source/index.htm";
    var url = "../BOS/ClientGetData.aspx?Source=GetHelpMenuID&menuID=" + menuID; 
    var ret = PostDataText(url,""); 
    var convertUrl = "../SRM/SRMHelp/Default.asp?helpUrl=";
    var languageType="";
	languageType=GetHelpCookie("languagetype");  

    if(languageType.toLowerCase() == "zh-cht")
    {
        convertUrl = "../SRM/SRMHelp_cht/Default.asp?helpUrl=";
       
    }
    else if(languageType.toLowerCase() == "en")
    {
        alert("Online help with this language version temporarily unavailable!");
        return;
    }
    var arrayUrl = ret.split("#|#");
    if(arrayUrl.length == 2)
    {
        if(arrayUrl[0] != null && arrayUrl[0] != "")
        {
            helpUrl = "source/" + arrayUrl[0];
        }
        if(arrayUrl[1].length > 0)
        {        
            switch(arrayUrl[1].toUpperCase())
            {
                 case "K3SRM.CHM":
                     window.open(convertUrl+helpUrl,"SRMHelp"); //调用协同帮助系统
                     break; 
                
            }
        }
    }
    event.cancelBubble =true;
    event.returnValue  =false;
    return false;
}

/*Data Pickup Window*/
function DataSelectWindow(url)
{
		var sFeature="dialogWidth:300px;dialogHeight:320px;center:yes;help:no;resizable:yes;status:no;";
		var sItemID="";
		var sUrl=url;

		var retObj=window.showModalDialog(sUrl,"",sFeature);
		if (retObj!=null && retObj.id!="*")
		{
			//get your data here,such as 
			//element.itemid=retObj.id;
		}
}	

/*Tree Select Window*/
function TreeSelectWindowForMultTree(url)
{
	var vv=new Object();
	title=encodeURI('查找');
	window_style="dialogWidth:280px;dialogHeight:400px;status:no;resizable: yes;scroll:no";
	vv=window.showModalDialog(url,'',window_style);		
	if(vv!=null)
	return vv;

	//get your data here;		
	
}

/*Tree Select Window*/
function TreeSelectWindow(url)
{
	var vv=new Object();
	window_style="dialogWidth:274px;dialogHeight:385px;status:no;resizable:no;scroll:no";
	vv=window.showModalDialog(url,"",window_style);		
	if(vv != null)
	return vv;	
}

/*Tree Select Window*/
function TreeSelectPromptWindow(url)
{
	var result = new Object();
	var window_style="dialogWidth:258px;dialogHeight:385px;status:no;resizable:yes;scroll:no";
	result = window.showModalDialog(url,"",window_style);		
	if( result == null)
		return null;
	else
		return result;	
}



/*Switch Bar Control*/
function switchSysBar(stype)
{
	if (stype==7){
		document.all("frmTitle").style.display="none";
		document.all("switchPoint").style.visibility="";
		document.all("open_btn").style.width=18;		
	}
	else{
		document.all("frmTitle").style.display="";
		document.all("switchPoint").style.visibility="hidden";
		document.all("open_btn").style.width=6;
	}
}

/*Switch Bar Control*/
function switchSysBarInContainer(stype)
{
	if (stype==7){
		document.all("frmTitle").style.display="none";
		document.all("frminterval").style.display="";		
		document.all("switchPoint").style.visibility="";
		document.all("open_btn").style.width=18;		
		
		var workLeftTd = document.all("workLeft");
		workLeftTd.style.width = "18px";
		workLeftTd.children[0].style.width="18px";
	}
	else{
		document.all("frmTitle").style.display="";
		document.all("frminterval").style.display="none";
		document.all("switchPoint").style.visibility="hidden";
		document.all("open_btn").style.width=6;
		
		var workLeftTd = document.all("workLeft");
		workLeftTd.style.width = "160px";
		workLeftTd.children[0].style.width="160px";
	}
}

/*Item Select Init*/
function initIt()
{
        divColl = document.all.tags("DIV");
        for (i=0; i<divColl.length; i++) {
            whichEl = divColl(i);
            if (whichEl.className == "child") whichEl.style.display = "none";
        }
}

/*Item Expand*/
function expandIt(el,picname) 
{
        whichEl = eval(el + "Child");
        img=eval(picname);
        if (whichEl.style.display == "none") {
            whichEl.style.display = "block";
            img.src="images/TRUE.GIF" 
        }
        else {
            whichEl.style.display = "none";
            img.src="images/FALSE.GIF"
        }
}

/*Message Window*/
function MsgWindow(url,title)
{
	//var sFeature="dialogWidth:410px;dialogHeight:106px;center:yes;help:no;resizable:yes;status:no;scroll:no";	
	//var sFeature="dialogWidth:425px;dialogHeight:100px;center:yes;help:no;resizable:yes;status:no;scroll:no"; //baty changed
	if(navigator.appVersion.search("MSIE 7.0") > 0  || navigator.appVersion.search("MSIE 8.0") > 0)
	{
		sFeature = "dialogWidth:425px;dialogHeight:100px; center:yes;help:no;resizable:yes;status:no;scroll:no";
	}
	else
	{
		sFeature = "dialogWidth:425px;dialogHeight:127px; center:yes;help:no;resizable:yes;status:no;scroll:no";
	}
	var sItemID="";
	var sUrl=url;

	var retObj=window.showModalDialog(sUrl,title,sFeature);
	return(retObj);
}

/*此函数用来打开高级对话框，此函数兼容E7与以前的版本*/
function advancedMsgDialogBox(dialogboxUrl, url, title, argument)	
{
	var argObject = new Object();
	if(navigator.appVersion.search("MSIE 7.0") > 0 || navigator.appVersion.search("MSIE 8.0") > 0)
	{
		feature = "dialogWidth:425px;dialogHeight:100px; center:yes;help:no;resizable:yes;status:no;scroll:no";
	}
	else
	{
		feature = "dialogWidth:425px;dialogHeight:127px; center:yes;help:no;resizable:yes;status:no;scroll:no";
	}
	
	url = encodeURIComponent(url);

	dialogboxUrl = dialogboxUrl + "?DialogURL=" + url;
	
	argObject.title = title;
	argObject.argument = argument;
	
	return window.showModalDialog(dialogboxUrl, argObject, feature);

}

/*当点击高级对话框中高级按钮时，折叠或展开高级对话框*/
function expandAdvancedBox()
{
	if(window.dialogHeight!=AdjustIEDialogHeight(248))
	{
		window.dialogHeight=AdjustIEDialogHeight(248);
	}
	else
	{
		window.dialogHeight=AdjustIEDialogHeight(127);  
	}
}

/*KeyWord search*/
function KeyWordSearch()
{	
	var DialogStyle = "dialogWidth:300px;dialogHeight:50px;status:no;resizable:no";
			
	var result = window.showModalDialog("../HumanManage/SimpleSelectPrompt.htm","关键字查询",DialogStyle);
	if(result!="" && result!=null)
	{
		return result;		
	}
	else
	{	return "";	
	}
}
/*Generel search add by mmf */
/***********************************************
function	:	GeneralSearch
purpose		:	调用F7页面
parameters	:	type:	            多种类型，例如:"employee","orgunit","position","search","planposition"
				allowmultiselect:   是否允许多选 "false","true"
				CustomRootItemData: 权限字符串			
				displayField:       要显示的字段对应的物理名称
				inParam:  传入参数	
				
return value:	两种：单选时：对象，ret.id, ret.name
					  多选时：数组对象 ret[i].id, ret[i].name
************************************************/
function GeneralSearch(type,allowmultiselect,showlevel,CustomRootItemData,inParam,displayField)
{	
	var DialogStyle = "";
	switch(type)
	{
		case "unitobjective":
		case "employeeobjective":
			DialogStyle = "dialogWidth:900px;dialogHeight:550px;status:no;resizable:yes";
			break;
		case "position":
			DialogStyle = "dialogWidth:910px;dialogHeight:550px;status:no;resizable:yes";
			break;
		default:
			DialogStyle = "dialogWidth:798px;dialogHeight:550px;status:no;resizable:yes";
			break;	
	}
	
	var sUrl="../Public/DialogPost.aspx?type="+type+"&param="+inParam;	
	var xmlPath = "";
	switch (type)
	{
		case "employee":
			xmlPath= "../XMLF7/F7EmployeeXML.xml";
			break;
		case "orgunit":
			xmlPath= "../XMLF7/F7OrgUnitXML.xml";
			break;
		case "position":
			xmlPath= "../XMLF7/F7PositionXML.xml";
			break;
	    case "planposition":
			xmlPath= "../XMLF7/F7PlanPositionXML.xml";
			break;
		case "job":
			xmlPath= "../XMLF7/F7JobXML.xml";
			break;
		case "jobcategory":
			xmlPath= "../XMLF7/F7JobCategoryXML.xml";
			break;
		case "grade":
			xmlPath= "../XMLF7/F7JobGradeXML.xml";
			break;
		case "speciality":
			xmlPath= "../XMLF7/F7PositionTitleXML.xml";
			break;
		case "emptype":
			xmlPath= "../XMLF7/F7EmployeeTypeXML.xml";
			break;
		case "specialitycategory":
			xmlPath= "../XMLF7/F7PositionTitleCategoryXML.xml";
			break;
		case "specialitylevel":
			xmlPath= "../XMLF7/F7PositionTitleLevelXML.xml";
			break;
		case "dimissionreason":
			xmlPath= "../XMLF7/F7DimissionReasonXML.xml";
			break;
		case "dimissiontype":
			xmlPath = "../XMLF7/F7DimissionTypeXML.xml";
			break;
		case "retiretype":
			xmlPath = "../XMLF7/F7RetireReasonXML.xml";
			break;
		case "retirereason":
			xmlPath ="../XMLF7/F7RetireTypeXML.xml";
			break;
		case "outofposreason":
			xmlPath = "../XMLF7/F7InUnactivatedServiceReasonXML.xml";
			break;
		case "outofpostype":
			xmlPath = "../XMLF7/F7InUnactivatedServiceTypeXML.xml";
			break;
		case "unitobjective"://上级组织的考核目标.added by robin.04.11.09
			xmlPath = "../XMLF7/F7UnitObjectiveXML.xml";
			break;
		case "employeeobjective"://个人目标
			xmlPath = "../XMLF7/F7EmployeeObjectiveXML.xml";
			break;
		case "salary_item"://薪酬项目.added by 梁宇然 04.11.10
			xmlPath = "../XMLF7/F7Salary_ItemXML.xml";
			break;	
		case "salary_dot_data"://薪点项目数据表.added by 梁宇然 04.11.15
			xmlPath = "../XMLF7/F7Salary_Dot_DataXML.xml";
			break;	
		case "gz_salary_item"://工资项目表.added by 梁宇然 04.11.16
			xmlPath = "../XMLF7/F7Gz_Salary_ItemXML.xml";
			break;	
		case "salary_point_item"://薪点项目表.added by 梁宇然 04.11.16
			xmlPath = "../XMLF7/F7Salary_Point_ItemXML.xml";
			break;		
		case "hrbaseitem"://公共类别树
			xmlPath = "../XMLF7/F7HRBaseItemXML.xml";
			break;
		case "pubcode"://公共代码树
			xmlPath = "../XMLF7/F7PublicCodeXML.xml";
			break;
		case "outofposition"://
			xmlPath = "../XMLF7/F7OutOfPositionXML.xml";
			break;		
		case "appraisalsolution"://绩效考核方案查询
			xmlPath = "../XMLF7/F7Solution.xml";
			break;	
		case "gatherperiod"://绩效统一考核周期查询
			xmlPath = "../XMLF7/F7GatherPeriodXML.xml";
			break;
		case "trainactivityclass"://培训活动课程查询
			xmlPath = "../XMLF7/F7TrainActivityClassXML.xml";
			break;
		case "table":     //数据字典表
		    xmlPath = "../XMLF7/F7TableXML.xml";
			break;	
		case "reengage":
		    xmlPath = "../XMLF7/F7ReEngageXML.xml";
		    break;
		case "myplanperiod"://我的计划期间
			xmlPath = "../XMLF7/F7MyPlanPeriodXML.xml";
		    break;
		case "classtype"://课程性质
			xmlPath = "../XMLF7/F7ClassTypeXML.xml";
		    break;
		case "traintype"://培训类别
			xmlPath = "../XMLF7/F7TrainTypeXML.xml";
		    break;
		case "teacherlevel"://培训类别
			xmlPath = "../XMLF7/F7TeacherLevelXML.xml";
		    break;
		case "customprevisetype"://自定预警类别
			xmlPath = "../XMLF7/F7CustomPreviseTypeItemXML.xml";
		    break;
		case "appraisalhistorysolution"://绩效结果方案
			xmlPath = "../XMLF7/F7HistorySolutionXML.xml";
			break;
		case "activitysolution"://绩效考核方案
			xmlPath = "../XMLF7/F7ActivitySolutionXML.xml";
		    break;
		case "historyperiodsolution"://绩效历史考核周期_考核方案
			xmlPath = "../XMLF7/F7Period_SolutionXML.xml";
		    break;
		case "notedirectlyperiod"://绩效考核周期_考核方案，适用于直接录入类型的方案
			xmlPath = "../XMLF7/F7NoteDirectlyPeriodXML.xml";
		    break;
		case "workcontract"://合同F7
			xmlPath = "../XMLF7/F7WorkContractXML.xml";
			break;
		case "outerlinkman"://外部联系人
		xmlPath = "../XMLF7/F7OuterLinkmanXML.xml";
	    break;
	}
	var ssUrl= encodeURI("F7Select.aspx?SelectType="+type + "&AllowMultiSelect=" + allowmultiselect 
	                  //                    +"&CustomRootItemData=" + CustomRootItemData
										  +"&InParam=" + inParam
	                                      +"&displayField=" + displayField
	                                      +"&xmlpath=" + xmlPath + "&showlevel="+showlevel);
	var argsObject = new Object();
	argsObject.url = ssUrl;
	argsObject.customRootItemData =  CustomRootItemData;                                                         
	var ret = showModalDialog(sUrl,argsObject, DialogStyle);
	
	return ret;		
}
/*面试安排*/
function ConfirmWindow(url,title)
{
	var sFeature="dialogWidth:350px;dialogHeight:330px;center:yes;help:no;resizable:no;status:no;";
	var sItemID="";
	var sUrl=url;

	var retObj=window.showModalDialog(sUrl,title,sFeature);
	return(retObj);
}

/*招聘信息确认窗口*/
function ConfirmWindow2(url,title)
{
	var sFeature="dialogWidth:300px;dialogHeight:185px;center:yes;help:no;resizable:no;status:no;";
	var sItemID="";
	var sUrl=url;

	var retObj=window.showModalDialog(sUrl,title,sFeature);
	return(retObj);
}

/*去除字符串两边的空格*/
function Jtrim(str){
    return (str || "").replace(/^\s+|\s+$/g, "");
}

//清除toolbar元素 

function ClearToolbar(toolbar)
{ 
	toolbar.clear(); 
} 

//创建按钮 itemid按钮ID, itemtitle按钮名称, itemimageurl按钮使用的图片, textstatus文本所处的位置：right,none,bottom

function CreateButton(toolbar,itemid,itemtitle,itemimageurl,textstatus) 
{ 
	var num; 
	num = toolbar.numItems; 
	if(textstatus == null)
	{
		toolbar.createButtonAt(num,"<TBNS:ToolbarButton ID=\"" + itemid + "\" title=\"" + itemtitle + "\" imageUrl=\"" + itemimageurl + "\">" + itemtitle + "</TBNS:ToolbarButton>");
	}
	else
	{
		if(textstatus.toLowerCase() == "bottom")
		{
			toolbar.createButtonAt(num,"<TBNS:ToolbarButton ID=\"" + itemid + "\" title=\"" + itemtitle + "\" text=\"<br>" + itemtitle + "\" imageUrl=\"" + itemimageurl + "\" defaultstyle=\"text-align:center\"></TBNS:ToolbarButton>");
		}
	}
} 

//创建按钮 itemid按钮ID,itemtext按钮显示文字，itemtitle按钮提示文字, itemimageurl按钮使用的图片, textstatus文本所处的位置：right,none,bottom
function CreateButtonDetail(toolbar,itemid,itemtext,itemtitle,itemimageurl,textstatus) 
{ 
	var num; 
	num = toolbar.numItems; 
	if(textstatus == null)
	{
		toolbar.createButtonAt(num,"<TBNS:ToolbarButton ID=\"" + itemid + "\" title=\"" + itemtitle + "\" text=\"" + itemtext + "\" imageUrl=\"" + itemimageurl + "\">" + itemtext + "</TBNS:ToolbarButton>");
	}
	else
	{
		if(textstatus.toLowerCase() == "bottom")
		{
			toolbar.createButtonAt(num,"<TBNS:ToolbarButton ID=\"" + itemid + "\" title=\"" + itemtitle + "\" text=\"<br>" + itemtext + "\" imageUrl=\"" + itemimageurl + "\" defaultstyle=\"text-align:center\"></TBNS:ToolbarButton>");
		}
	}
}

//创建最左边的LABEL 
function CreateLabelLeft(toolbar) 
{ 
	var num; 
	num = toolbar.numItems; 
	toolbar.createLabelAt(num,"<TBNS:ToolbarLabel imageUrl=\"../images/Toolbar_left_1.gif\"></TBNS:ToolbarLabel>");
} 

//创建分割按钮的LABEL 
function CreateLabelGroup(toolbar) 
{ 
	var num; 
	num = toolbar.numItems; 
	toolbar.createLabelAt(num,"<TBNS:ToolbarLabel imageUrl=\"../images/Toolbar_group_1.gif\"></TBNS:ToolbarLabel>");
} 

/*--------------------------------------Begin 创建下拉菜单式分组按钮  2005-01-21 add by arthur-----------------------------------------------------------------------*/
//创建下拉菜单分组按钮的开始部分
function CreateGroupDropButtonBegin(itemid,itemtitle,itemimageurl)
{
	return "<TBNS:toolbarbutton ID=\"" + itemid + "\" title=\"" + itemtitle + "\" imageUrl=\"" + itemimageurl + "\">";
} 
//分组按钮的下拉菜单项目
function CreateSubItemButton(itemid,itemtitle,itemimageurl,groupObject) 
{
	groupObject +="<TBNS:toolbarbutton ID=\"" + itemid + "\" title=\"" + itemtitle + "\" text=\"" + itemtitle +  "\" imageUrl=\"" + itemimageurl+ "\">" + itemtitle + "</TBNS:toolbarbutton>";
	return groupObject;
	
}
//分组按钮的分割按钮LABEL 
function CreateSubLabelGroupButton(groupObject) 
{ 
	groupObject+="<TBNS:toolbarlabel imageUrl=\"../images/Toolbar_group_1.gif\"></TBNS:toolbarlabel>";
	return groupObject;
} 
//创建下拉菜单分组按钮的结束部分（该方法才是实际把按钮创建到Toolbar上去的方法，前面部分只是在做字符串的拼装）
function CreateGroupDropButtonEnd(toolbar,groupObject) 
{ 	
	var num; 
	num = toolbar.numItems; 
	groupObject += "</TBNS:toolbarbutton>";	
	toolbar.createButtonAt(num,groupObject);	
} 
/*--------------------------------------End 创建下拉菜单式分组按钮  2005-01-21 add by arthur-----------------------------------------------------------------------*/



//修改按钮状态――使按钮处于有效或者无效状态//num，按钮按照从左到右所处位置的索引，从0开始//value ＝ true，则按钮处于无效状态//value ＝ false，则按钮处于有效状态
function DisableToolbar(toolbar,num,value) 
{
	var toolItem = toolbar.getItem(num); 
	toolItem.setAttribute("disabled", value); 
}

//修改按钮状态――使按钮处于有效或者无效状态(批量修改)
//startnum，按钮按照从左到右所处位置的索引
//length，批量修改按钮的数量
//value ＝ true，则按钮处于无效状态//value ＝ false，则按钮处于有效状态
function DisableToolbarGroup(toolbar,startnum,length,value) 
{
	for(var i=startnum; i< startnum + length; i++)
	{
		var toolItem = toolbar.getItem(i); 
		if(toolItem == null)
		{
			continue;
		}
		toolItem.setAttribute("disabled", value); 
	}
}

//弹出对话框,返回值由rtnValue组成。 

function showDialogBox(dialogboxUrl, url, title, feature, argument)
{
	var arg;
	var argObject = new Object();
	if(dialogboxUrl == null)
	{
		alert("Argument dialogboxUrl is null. ");
	}
	
	if(url == null)
	{
		alert("Argument url is null. ");
	}
	
	url = encodeURIComponent(url);

	dialogboxUrl = dialogboxUrl + "?DialogURL=" + url;
	
	argObject.title = title;
	argObject.argument = argument;
	
	if(feature == null)
	{
		feature = "scroll: no; status: no; unadorned : no; help : no;";
	}
	
	var rtnValue = window.showModalDialog(dialogboxUrl, argObject, feature);	
	return rtnValue;
}

//弹出对话框,返回值是argument。 

function showDialogBoxReturnArg(dialogboxUrl, url, title, feature, argument)
{
	var arg;
	var argObject = new Object();
	if(dialogboxUrl == null)
	{
		alert("Argument dialogboxUrl is null. ");
	}
	
	if(url == null)
	{
		alert("Argument url is null. ");
	}
	
	url = encodeURIComponent(url);

	dialogboxUrl = dialogboxUrl + "?DialogURL=" + url;
	
	argObject.title = title;
	argObject.argument = argument;
	
	if(feature == null)
	{
		feature = "scroll: no; status: no; unadorned : no; help : no;";
	}
	
	var rtnArg ;
	window.showModalDialog(dialogboxUrl, argObject, feature);
	rtnArg = argObject.argument;
	return rtnArg;
}


//弹出Modeless对话框
function showModelessDialogBox(dialogboxUrl, url, title, feature)
{
	var arg;
	if(dialogboxUrl == null)
	{
		alert("Argument dialogboxUrl is null. ");
	}
	
	if(url == null)
	{
		alert("Argument url is null. ");
	}
	
	url = encodeURIComponent(url);
	//title = encodeURIComponent(title);
	
	dialogboxUrl = dialogboxUrl + "?DialogURL=" + url;
	
	if(arg == null)
	{
		arg = "";
	}
	
	if(feature == null)
	{
		feature = "scroll: no; status: no; unadorned : no; help : no;";
	}
	
	return window.showModelessDialog(dialogboxUrl, arg, feature);
}

//弹出Modeless对话框,返回值是argument两部分组成。 

function showModelessDialogBoxReturnArg(dialogboxUrl, url, title, feature, argument)
{
	var arg = new Object();
	arg.argument = argument;
	if(dialogboxUrl == null)
	{
		alert("Argument dialogboxUrl is null. ");
	}
	
	if(url == null)
	{
		alert("Argument url is null. ");
	}
	
	url = encodeURIComponent(url);
	//title = encodeURIComponent(title);
	
	dialogboxUrl = dialogboxUrl + "?DialogURL=" + url;
	
	if(arg == null)
	{
		arg = "";
	}
	
	if(feature == null)
	{
		feature = "scroll: no; status: no; unadorned : no; help : no;";
	}
		
	var dialogReturnValue;
	window.showModelessDialog(dialogboxUrl, arg, feature);
	dialogReturnValue = arg.argument;
	return dialogReturnValue;
}

/***********显示QuickTree（组织单元、职位、员工树）*********************/
//selectType，选择类型，分为三类：OrgUnit、Position、Employee
//showType，显示类型，分为五类：OrgUnit、 OrgUnit,Position、OrgUnit,Employee、OrgUnit,Position,Employee、OrgUnit1,OrgUnit2
//allowMultiSelect，是否允许多选//CustomRootItemData，权限字符串
//ShowLevel,显示的层数,默认3
/***********************************************************************/

function showQuickTree(selectType,showType,allowMultiSelect,CustomRootItemData,showLevel)
{
	var dialogboxUrl,url, title, feature,rtnValue;

	//检查参数的准确性	
	if(selectType.toLowerCase() != "orgunit" 
		&& selectType.toLowerCase() != "position" 
		&& selectType.toLowerCase() != "employee"
		&& selectType.toLowerCase() != "orgunit4")
	{
		alert("第一个参数selectType不正确，应该为下面三种之一：OrgUnit、OrgUnit4、Position、Employee");
		return null;
	}	

	switch(showType.toLowerCase())
	{
	case "orgunit" :
		showType = "OrgUnit";
		title = GetResourseForMultiLang("10000");
		break;
	case "orgunit,position":
		showType = "OrgUnit,Position";
		title = GetResourseForMultiLang("10001");
		break;
	case "orgunit,employee":
		showType = "OrgUnit,Employee";
		title = GetResourseForMultiLang("10002");
		break;
	case "orgunit,position,employee":
		showType = "OrgUnit,Employee,Position";
		title = GetResourseForMultiLang("10003");
		break;
	case "orgunit1,orgunit2":
		showType = "OrgUnit1,OrgUnit2";
		title = GetResourseForMultiLang("10004");
		break;
	default:
		alert("第二个参数showType不正确，应该为下面四种之一：OrgUnit、 OrgUnit,Position、OrgUnit,Employee、OrgUnit,Position,Employee");
		return null;
		break;
	}
	
	dialogboxUrl = "../Public/DialogPost.aspx";	
	
	feature = "dialogWidth:300px;dialogHeight:385px;center:yes;help:no;resizable:yes;status:no;scroll:no";
	
	var tempShowLevel = 3; //默认3层	
	if(showLevel != null)
	{
		tempShowLevel = showLevel;
	}	
	
	url = "../Trees/QuickTree.aspx?SelectType="+selectType+"&ShowType="+showType+"&ShowLevel="+tempShowLevel+"&FrameworkId=efd9de08-df92-48c9-9ad4-adfdbf66af2b&CustomRootItem=true&CustomRootItemDataType=Code";
	var argsObject = new Object();
	argsObject.title = title;
	argsObject.customRootItemData = CustomRootItemData;
	
	if(allowMultiSelect == true)
	{
		url += "&AllowMultiSelect=true";
		argsObject.argument = null;
		argsObject.url = url;
		window.showModalDialog(dialogboxUrl,argsObject,feature);
		rtnValue = argsObject.argument;
	}
	else
	{
		argsObject.url = url;
		rtnValue = window.showModalDialog(dialogboxUrl,argsObject,feature);
	}
	
	return rtnValue;
}

function GetResourseForMultiLang(key)
{
    var res = "";
    var languageType="zh-chs";
	languageType=GetHelpCookie("languagetype");
	switch(languageType.toLowerCase())
	{
	    case "zh-cht":
	        switch(key)
	        {
	            case "10000":
	                res = "組織單元樹";
	                break;
	            case "10001":
	                res = "職位樹";
	                break;
	            case "10002":
	                res = "員工樹";
	                break;
	            case "10003":
	                res = "組織單元、職位、員工樹";
	                break;
	            case "10004":
	                res = "集團、公司樹";
	                break;
	            default:
	                res = "";
	                break;
	        }
	        break;
	    case "en":
	        switch(key)
	        {
	            case "10000":
	                res = "Organization Unit Tree";
	                break;
	            case "10001":
	                res = "Position Tree";
	                break;
	            case "10002":
	                res = "Employee Tree";
	                break;
	            case "10003":
	                res = "Org.-Pos.-Emp. Tree";
	                break;
	            case "10004":
	                res = "Group-Company Tree";
	                break;
	            default:
	                res = "";
	                break;
	        }
	        break;
	    default:
	        switch(key)
	        {
	            case "10000":
	                res = "组织单元树";
	                break;
	            case "10001":
	                res = "职位树";
	                break;
	            case "10002":
	                res = "员工树";
	                break;
	            case "10003":
	                res = "组织单元、职位、员工树";
	                break;
	            case "10004":
	                res = "集团、公司树";
	                break;
	            default:
	                res = "";
	                break;
	        }
	        break;
	}

	return res;
}

/**********************************************
//弹出条件过滤页面的对话框
//dialogboxUrl
//title,弹出页面的名称//xmlpath,条件过滤对应的xml文档路径
//type,条件过滤对应的类型名称//showtabs,（却省）默认显示1,2,3,4页签，用户可以从五个页签中任意组合，中间以逗号分隔，如显示条件和排序页签：1,2
//advance，（却省） 作为动态变化的参数传往高级过滤页面
//argument，系统返回的参数。*************************************************/

function showFilterReturnArg(dialogboxUrl, xmlpath, title, xmltype, showtabs, argument, advance)
{
	var m_href = "Public/ReportFilter.aspx?Type=KHGCKZ&xmlpath=../XML/ProcessControlReport.xml&advance=menu";
	
	var arg;
	var argObject = new Object();
	if(dialogboxUrl == null)	
		alert("Argument dialogboxUrl is null. ");			
	
	if(xmltype == null)	
		alert("Argument xmltype is null. ");	
	
	if(advance == null)	
		advance = "";	
	
	if(showtabs == null)
		showtabs = "1,2,3,4";
		
	
	var url = "Public/ReportFilter.aspx?Type="+xmltype+"&xmlpath="+xmlpath+"&advance="+advance+"&DisplayType=dialogbox&ShowTabs=" + showtabs;

	dialogboxUrl = dialogboxUrl + "?DialogURL=" + encodeURIComponent(url);
	
	argObject.title = title;
	argObject.argument = argument;	
	
	var feature = "dialogWidth:630px;dialogHeight:460px;center:yes;scroll: no; status: no; unadorned : no; help : no;"
		
	var rtnArg ;
	window.showModalDialog(dialogboxUrl, argObject, feature);
	rtnArg = argObject.argument;
	
	return rtnArg;		
}

function utfurlcode(src)
{
	//编码
	var strRet, I, innerCode, H4, M6, L6;
	strRet = "";
	for(I = 0; I < src.length; I++)
	{
		innerCode = src.charCodeAt(I);
		if(innerCode < 0)
		{
			innerCode += 0x10000;
		}
		if(innerCode < 0xff)
		{
			strRet += src.charAt(I);
		}
		else
		{
			H4 = 0xe0 + ((innerCode & 0xf000) >> 12);
			M6 = 0x80 + ((innerCode & 0xfc0) >> 6);
			L6 = 0x80 + (innerCode & 0x3f);
			strRet += "%" + H4.toString(16) + "%" + M6.toString(16) + "%" + L6.toString(16);
		}
	}
	return strRet;
}
/***********************************************
function	:	KDMsgBox
purpose		:	显示不同类型的模式对话框
parameters	:	path:	窗体所在路径，如'../pub/'
				type:	"question","advance" 2种类型				info:	一个包含要显示信息的对象				info.msg:       
				info.advanced:  显示在高级中
				info.retvalue:  附带返回值				info.title:     对话框的标题，若只需显示默认的标题则传入 info.title = "";
return value:	ok!retvalue / cancel!retvalue 
                -1: 直接点击窗口关闭按钮
                
************************************************/

function KDMsgBox(path,type,info)
{
	var sUrl = utfurlcode(path+"DialogInfo.aspx?type="+type+"&title="+info.title);
	if(navigator.appVersion.search("MSIE 7.0") > 0 || navigator.appVersion.search("MSIE 8.0") > 0)
	{
		sFeature = "dialogWidth:488px;dialogHeight:100px; center:yes;help:no;resizable:yes;status:no;scroll:no";
	}
	else
	{
		sFeature = "dialogWidth:488px;dialogHeight:127px; center:yes;help:no;resizable:yes;status:no;scroll:no";
	}
	info.type = type;
	var retObj=window.showModalDialog(sUrl,info,sFeature);
	
	return retObj;
}
/************************************************
function	:	PostDataXML(url,data)
purpose		:	与服务端进行数据交换
parameters	:	url	进行数据交换的服务端页面
			data	客户端传给服务端的数据return value:	服务端返回的Dom对象
*************************************************/

function PostDataXML(url, data)
{
	var xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); //创建XMLHTTP对象
	
	xmlhttp.Open("POST", url, false); 
	xmlhttp.Send(data); //发出指令
	
	return xmlhttp.responseXML;
}

/************************************************
function	:	PostDataText(url,data)
purpose		:	与服务端进行数据交换
parameters	:	url		进行数据交换的服务端页面
				data	客户端传给服务端的数据return value:	服务端返回的字串
*************************************************/

function PostDataText(url,data)
{

	var xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); //创建XMLHTTP对象

	xmlhttp.Open("POST",url, false); 
	xmlhttp.Send(data); //发出指令

	return xmlhttp.responseText;
}


/***********************************************
*	响应用户的按钮ESC键，然后关闭弹出窗口
************************************************/
function ESC_Onclick()
{
	if(event.keyCode == 27)
	{
		window.close();
	}
}

/**********************************************
* function:	Show The Selected List 
* authur:	Paul
* date:		2003-11-07
**********************************************/
function GetSelectedList(title,url,listType,argStr,MultiSel,reserve) 
{
	var ret;
	var DialogStyle = "dialogWidth:700px;dialogHeight:500px;status:no;resizable:yes";
	var obj = new Object();
	obj.title = title; 
	obj.listType = listType; 
	obj.argStr = argStr; 
	obj.multiSel = MultiSel;
	obj.reserve = reserve;
	
	var ret = showModalDialog(url,obj, DialogStyle);
	return ret;		
}

/**********************************************
* function:	响应点击多行表显示控件上的下载图标时的事件
* authur:	Arthur
* date:		2003-12-30
***********************************************/
function hrefclick(id,connectStr)
{
	var url = encodeURI("../HumanManage/AsscessoryDownload.aspx?AccessoryID="+id+"&ConnectStr=" + connectStr);
	var a = window.open(url);
}

/**********************************************
* function:	取得工资系统的期间信息。* authur:	姚俊松
* date:		2004-12-24
***********************************************/
function getPaPeriodInfo() //(PaPoint,SalaryPayMenu)
{		  
	var m_href = "";
	var retStr = PostDataText("../ukdweb/main/HRPamnuI.asp?Type=GetPeriodInfo",""); 
	var ar = retStr.split("\n");
	var ret = new Object();
	ret.ClsID = ar[1];
	ret.UserID = ar[2];
	ret.IsMulti	 = ar[3];	//alert(ar[3]);
	var ar = ar[0].split(";");
	for(var i=0;i<ar.length;i++)
	{
		var ar1 = ar[i].split("=");
		if (ar1[0]=="UserID")
		{
			ret.UserID = ar1[1];
			break;
		}
	}
	return ret;
}
/**********************************************
* function:	根据IFrame名称取得页面中IFrame的内容Document对象。* authur:	姚俊松
* date:		2005-01-05
***********************************************/
function getIFrameDocument(iframeID)
{
	return document.all(iframeID).contentWindow.document;
}
/**********************************************
* function:	注册Document对象的方法。* authur:	姚俊松
* date:		2005-01-11
* eg. regMethod('F1','val1,val2','f_do(val1,val2)');
***********************************************/
function regMethod(methodName,parameters,entryPoint)
{
	eval('document.' + methodName + ' = function(' + parameters + '){' + entryPoint + ';};');
}

/**********************************************
* function:	判断在界面中输入的日期是否符合规范。
* authur:	彭寿华
* date:		2008-10-16
***********************************************/
function CheckValidDate(dateStr) 
{
  var datePat = /^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})$/; 
  var matchArray = dateStr.match(datePat); 
  if (matchArray == null) 
  { 
  	return false; 
  } 
  
  month = matchArray[3];
  day = matchArray[4]; 
  year = matchArray[1]; 
    
  if (month < 1 || month > 12) 
  { 
  	return false; 
  } 
  if (day < 1 || day > 31) 
  { 
 		return false;
  }
  if ((month==4 || month==6 || month==9 || month==11) && day==31) 
  { 
  	return false;
  } 
 
  if (month == 2) 
  { 
  	var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)); 
  	if (day>29 || (day==29 && !isleap)) 
  	{ 
  		return false;
  	}
  }

  var dateStr = dateStr.replace(datePat,"$3/$4/$1");
  var dtDate = Date.parse(dateStr);
  if(isNaN(dtDate))
  {
	 return false;
  }
  return true;
}

/**********************************************
* function:	解析字符串得到Date对象。字符串必须以年月日的顺序排列且有分隔符号。如：2008-09-22，2008.09.22等
* authur:	吕泽财
* date:		2008-09-22
***********************************************/
function ParseDate(dateString)
{
	var dateStr = dateString.replace(/(\d+)\D+(\d+)\D+(\d+)\D*/g, "$2/$3/$1");
	var d = new Date();
	d.setTime(Date.parse(dateStr));
	return d;
}
/**********************************************
* function:	比较日期大小的方法* authur:	邓昊罡* eg. DateCompare('1901/01/01','2002-02-02') 返回值为 0
*     DateCompare('1998-01-01','1998-01-01') 返回值为 1
*     DateCompare('1991/01/01','1980-02-02') 返回值为 2
* date:		2005-01-12
***********************************************/
function DateCompare(dateString1,dateString2)
{
	var re = /(\S+)(\/)(\S+)(\/)(\S+)/g;
	
	if(dateString1.indexOf('-') >= 0)
		dateString1 = dateString1.replace("-","/");			
	if(dateString1.indexOf('-') >= 0)
		dateString1 = dateString1.replace("-","/");
		
	if(dateString2.indexOf('-') >= 0)
		dateString2 = dateString2.replace("-","/");			
	if(dateString2.indexOf('-') >= 0)
		dateString2 = dateString2.replace("-","/");
		
	var date1 = dateString1.replace(re, "$3$2$5$4$1");
	var dateObject1 = Date.parse(date1);
	
	var date2 = dateString2.replace(re, "$3$2$5$4$1");
	var dateObject2 = Date.parse(date2);
	
	if(dateObject1<dateObject2)
		return 0;
	if(dateObject1==dateObject2)
		return 1;
	if(dateObject1>dateObject2)
		return 2;	
}

/************************************************************
*summary:此方法用来通过Post方式向一个frame或iframe中加载一个页面，
*		 当要使用Post传参数时可以用此方法;
* 参数描述：win :frame或iframe标签所在的页面窗口（window);
*			frameId:frame获取iframe的ID(最好name与ID相同);
*			url:要打开页面的路径;
*			param:要通过Post方式传的参数
* 作者：董怀信
*创建时间：2007-1-5
*************************************************************/
function openPageInPost(win,frameId,url,param)
{
	
	win.document.getElementById(frameId).setAttribute("targetUrl",url);
	win.document.getElementById(frameId).setAttribute("targetArgs",param);
	win.frames(frameId).location.href = "../Public/PostForm.aspx?target="+frameId;
	
}

/************************************************************
*summary:获取软加密License信息对象的方法
*
*创建时间：2007-9-14
*************************************************************/
function getLicense(licenseInfo)
{
    var licenseInfoObject = new Object();
    licenseInfoObject.company = "";
    licenseInfoObject.serialNumber = "";
    licenseInfoObject.validCode = "";
    licenseInfoObject.softwareCode = "";
    licenseInfoObject.expireDate = "";
    licenseInfoObject.lichttp = "";
    licenseInfoObject.regDate = "";
    var strKeyFlag = "~$^";
    var strDataFlag = "~|^";
	var licenseInfoArray = licenseInfo.split(strDataFlag);
	for(var i=0;i<licenseInfoArray.length;i++) 
	{
	    var infoArray = licenseInfoArray[i].split(strKeyFlag);
	    if(infoArray.length < 2)
	    {
	        continue;
	    }
	    switch(infoArray[0].toLowerCase())
	    {
	        case "licensetype":
                licenseInfoObject.company = infoArray[1];
                break;
            case "productversion":
                licenseInfoObject.productVersion = infoArray[1];
                break;
            case "serialno":
                licenseInfoObject.serialNO = infoArray[1];
                break;
            case "username":
                licenseInfoObject.serialNumber = infoArray[1];
                break;
            case "checksoftwarecode":
                licenseInfoObject.validCode = infoArray[1];
                break;
            case "softwarecode":
                licenseInfoObject.softwareCode = infoArray[1];
                break;
            case "expiredate":
                licenseInfoObject.expireDate = infoArray[1];
                break;
            case "lichttp":
                licenseInfoObject.lichttp = infoArray[1];
                break;
            case "regdate":
                licenseInfoObject.regDate = infoArray[1];
                break;
	    }
	}
	
	return licenseInfoObject;
}

/***********************************************************
*summary:此方法已Post传递参数的方式打开一个对话框的;在对话框页面
		的服务端代码中通过Request.Form["hdParam"]来获取传递的参数；
		此方法一般用来向对话框的服务器端传递大数据量的参数；
*参数描述：url:由于此中方法是通过Public目录下的DialogPost.aspx和
               PostForm.aspx封装过，所以传递的url路径一定是基于Public
               文件夹的。
*作者：董怀信
*创建时间：2007年12月14日
************************************************************/
function openDialogWindowWithPostData(url,title,feature,argument,dialogboxUrl)
{
	if(dialogboxUrl == null || dialogboxUrl == "undefined")
	{
		dialogboxUrl = "../Public/DialogPost.aspx";
	}
	var argsObject = new Object();
	argsObject.title = title;
	argsObject.customRootItemData = argument;
	argsObject.url = url;
	rtnValue = window.showModalDialog(dialogboxUrl,argsObject,feature);
	
	return rtnValue;
}

/************************************************************
*summary:根据选择下一处理节点或选择下一处理人的页面返回的xmlDocument，的
*获取里面的下一个处理节点和处理人
*aaron
*创建时间：2008-7-25
*************************************************************/
function f_getNextActivityInfo(xmlDoc)
{
    var retObject = new Object();
    retObject.nextActivity = "";
    retObject.nextActivityParticipant = "";
    if(xmlDoc == null)
    {
        return retObject;
    }
    var parentNode = xmlDoc.selectSingleNode("/Root/Approves");
    var node;
    for (i = 0;i < parentNode.childNodes.length;i++)
    {
        node = parentNode.childNodes.item(i).selectSingleNode("NextActivityId");
        if(node == null)
        {
            continue;
        }
        retObject.nextActivity = node.text;
        
        node = parentNode.childNodes.item(i).selectSingleNode("ParticipantId");
        if(node == null)
        {
            continue;
        }
        retObject.nextActivityParticipant = node.text;
    }
    return retObject;
}

/************************************************************
*summary:文件上传控件通用客户端检查方法
参数1：fileUpdateControl,文件上传控件
参数2：maxFileSize,文件大小限制
返回0标识验证通过
返回1标识找不到文件
返回2表示文件大小超过限制
返回3标识未设置信任站点
*lifei
*创建时间：2008-10-24
需要设置信任站点
*************************************************************/
function CheckFile(fileUpdateControl, maxFileSize)
{
    if (fileUpdateControl.value != "")
    {
        var filePath = fileUpdateControl.value;
        //会有权限问题
        try
        {
            var fso = new ActiveXObject("Scripting.FileSystemObject");
        }
        catch (e)
        {
            return 3; //未设置信任站点
        }
        //检查文件是否存在
        if (!fso.FileExists(filePath))
        {
            return 1;
        }
        var f = fso.getFile(filePath);
        //检查文件大小是否符合要求
        if (f.size > maxFileSize * 1024 * 1024)
        {
            return 2;
        }
        return 0;
    }
    return 1;
}

/************************************************************
*summary:客户端操作Cookie。
*zecai_lv
*创建时间：2009-06-09
*************************************************************/
function createCookie(name,value,days)
{
	var expires = "";
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires = "; expires="+date.toGMTString();
	}
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ')
		{
			c = c.substring(1,c.length);
		}
		if (c.indexOf(nameEQ) == 0)
		{
			return c.substring(nameEQ.length,c.length);
		}
	}
	return null;
}

function eraseCookie(name)
{
	createCookie(name,"",-1);
}

String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {   
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {   
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);   
    } else {   
        return this.replace(reallyDo, replaceWith);   
    }   
}   


