/*!
 * github_repository.js v0.1.0
 *
 * Copyright 2015 shkwak
 * Licensed under the BSD license
 */

/*=================================*/
/*== GitHub Repository 공용 변수 ==*/
/*== 2015-06-03(Wed)_shkwak		 ==*/
/*---------------------------------*/
var SelectedServiceE_JSON = new Array(); //2015-06-03(Wed), 선택된 service 정보와 override항목 정보 등..
var GitHub_resource_name = new Array(); //2015-06-03(Wed), service의 resource name을 저장
var GitHub_ros_package_name = new Array(); //2015-06-09(Tue), for package.xml <run_depend> 항목 처리
var serviceContent = "", launchContent = ""; //Init!, 구성 결과 저장! 2015-06-03
var packageContent = "", cmakelistsContent = ""; //2015-06-04
var serviceContent_created = false, launchContent_created = false; //2015-06-09(Tue), 구성 content 생성 여부 판단
var packageContent_created = false, cmakelistsContent_created = false;
/*=================================*/

//**** edit_sectionE : Solution Configurator - Service Repository (GitHub) ****//
function editViewE(sNum) //id -> sNum
{	//추가한 Service의 요소값을 수정하기 위한 영역을 보이게 한다.	
	//var sID = id.split('_'); //console.log(id); //editBtn_1 ; OK	
	console.log('sNum : ' + sNum);
	var eID = 'git-edit' + sNum; //console.log(sID[1]); //1 ; OK
	var aID = 'git-advanced' + sNum;

	if (document.getElementById(eID).style.display == 'none'){
		document.getElementById(eID).style.display = 'block';
		console.log(eID + ' - block'); //git-edit0 ; OK
	}else{
		document.getElementById(eID).style.display = 'none';
		console.log(eID + ' - none'); //git-edit0 ; OK
		document.getElementById(aID).style.display = 'none';
		console.log(aID + ' - none'); //git-edit0 ; OK
	}									
}

function advancedViewE(sNum)
{	//Service contents 전체 소스를 보여준다.
	var eID = 'git-advanced' + sNum; //sNum을 바로 받아도 됨!_2015-05-27 -> 2015-06-02
	console.log(eID); //edit1 ; OK
	var aID = 'git-box_advanced' + sNum; 
	console.log(ServiceRepoContent[sNum]);
	if (document.getElementById(eID).style.display == 'none') {
		document.getElementById(eID).style.display = 'block';
		//document.getElementById(aID).value = ServiceRepoContent[sNum]; //==매번 원본 소스로 갱신! -> 소스위치 이동 필요! : contents 로드시 추가!_2015-06-02
	} else {
		document.getElementById(eID).style.display = 'none';
	}
}
	
//***** Element dynamic create/remove *****//
var an = 0;
function addElementE(){ //no use!									  
	var element = "<a href='#' class='list-group-item aE" + an + "' style='height:75px;'><p class='list-group-item-text' style='color:#A8A9AC;'>service name : </p><h3 class='list-group-item-heading' style='color:#59C1E0;' onclick='addServiceE(this.innerHTML, this.style.color);'>Service " + an + "</h3></a>"
	$(element).appendTo("#div_serviceListE");						
	an++;
}								

function delElementE(){	//no use!					  
	//$("a").remove(); //<a> all remove ㄷㄷ!
	//$("a").detach(); //same? remove()
	if (an >= 0)
	{
		var element = ".aE" + an;
		$("a").remove(element); 
		an--;
	}						
}						  
//******************************************//
var anr = 0;
function addServiceE(sName, tColor, sNum) //★★★
{	//Solution에 Service 추가, 2015-05-11(Mon)_RE_shkwak, sNum 추가, 2015-06-02(Tue)	
	console.log('-----------------------------------');
	console.log("addServiceE_anr : " + anr);
	if (SelectedServiceE_JSON[sNum].selected == 'true')
	{	//2015-06-09(Tue)_shkwak, service 중복 추가 이슈 처리!
		SweetAlert_Group('basicA', 'The same service already exists!');
	}
	else
	{
		var description = "";

		//if (tTitle == ""){
			description = 'Robot deliveries what you order through your application. You can choose delivery robots as your needs. e.g.beverage,...';
		//}else{
		//	description = tTitle;
		//}
		
		var element = "<div class='list-group-item height-75 git-add-service" + sNum + "' style='cursor: pointer;'>"
			+ "<div><p id='git-add-service" + sNum + "' class='list-group-item-text col-xs-9' style='color:" + tColor + "; padding-left:0px;' "
			+ "onclick='delServiceE(this.id, " + sNum + ");'>" + sName + " (<span class='glyphicon glyphicon-minus'></span>)</p></div>"
			+ "<div class='col-xs-9' style='padding:0px;'>"
			+ "<h6 id='git-desc" + sNum + "' style='cursor: default;'>" + description + "</h6></div>"
			+ "<div class='col-xs-3' style='padding:0px; margin-top:-24px;'>"
			+ "<h6 id='h6_nf" + sNum + "' style='color:#FCB040; float:right; margin:8px 0px 0px 0px;' onclick='classChangeE(this.id, " + sNum + ");'>Auto enabled service "
			+ "<span id='git-check_h6_nf" + sNum + "' class='glyphicon glyphicon-unchecked'></span></h6>"
			+ "<div><span style='float:right; padding-right:63px; color:#ccc; font-size:12px; cursor: default;'>overrided "
			+ "<span id='git-check_override" + sNum + "' class='glyphicon glyphicon-remove'></span></span></div>"
			+ "<strong><div id='git-editBtn_" + sNum + "' style='float:right; padding-right:108px; color:; font-size:12px;' onclick='editViewE(" + sNum + ");'>edit</div></strong></div></div>"
			
			//+ "<div class='list-group-item height-225 git-add-service" + sNum + "' id='git-edit" + sNum + "' style='display:none; background-color:#FFFFFF;'>"
			//+ "<textarea id='git-textarea" + sNum + "' style='width: 100%; height:82%; border:1px solid #ccc; border-radius:4px; resize:none;' spellcheck='false'></textarea>"
			//+ "<button type='button' id='git-saveBtn_" + sNum + "' class='btn btn-info' style='float: right; right: 25px; height: 30px; font-size: 12px;' onclick='classOverrideChangeE(this.id);editViewE(this.id);'>Save</button></div>"

			+ "<div class='list-group-item height-225 git-add-service" + sNum + "' id='git-edit" + sNum + "' style='display:none; background-color:#FFFFFF;'>"
			+ "<div class='table-responsive' style='font-size:12px;'><table class='table'>"
			+ "<button type='button' id='git-overrideBtn_" + sNum + "' class='btn btn-info' style='position: absolute; right: 25px; height: 30px; font-size: 12px;' "
			+ "onclick='classOverrideChangeE(" + sNum + "); editViewE(" + sNum + ");'>Override</button>"
			+ "<thead><tr><th>Service Name</th>" 
			+ "<th style='padding:2px 8px;'>"
			+ "<input type='text' id='git-name" + sNum + "' class='form-control' value='' style='padding:2px 8px; height:24px; width: 83%; color: " + tColor + ";' spellcheck='false'></th>"
			+ "</tr></thead>"
			+ "<tbody><tr style='height:28px;'><td style='padding:5px 8px'>Description</td><td style='padding:2px 8px;'>"
			+ "<input type='text' id='git-description" + sNum + "' class='form-control' value='' style='padding:2px 8px; height:24px;' spellcheck='false'></td></tr><tr style='height:28px;'><td style='padding:5px 8px'>Icon</td><td style='padding:2px 8px;'>"
			+ "<input type='text' id='git-icon" + sNum + "' class='form-control' value='' style='padding:2px 8px; height:24px;' spellcheck='false'></td></tr><tr style='height:28px;'><td style='padding:5px 8px'>Priority</td><td style='padding:2px 8px;'>"
			+ "<input type='text' id='git-priority" + sNum + "' class='form-control' value='' style='padding:2px 8px; height:24px;' spellcheck='false'></td></tr><tr style='height:28px;'><td style='padding:5px 8px'>Interactions</td><td style='padding:2px 8px;'>"
			+ "<input type='text' id='git-interactions" + sNum + "' class='form-control' value='' style='padding:2px 8px; height:24px;' spellcheck='false'></td></tr><tr style='height:28px;'><td style='padding:5px 8px'>Parameters</td><td style='padding:2px 8px;'>"
			+ "<input type='text' id='git-parameters" + sNum + "' class='form-control' value='' style='padding:2px 8px; height:24px;' spellcheck='false'></td></tr></tbody></table></div>"
			
			+ "<div id='git-advancedBtn_" + sNum + "' style='float:right; padding-right: 10px; color: #C90808; font-size: 12px; margin-top: -14px; cursor: pointer;' "
			+ "onclick='advancedViewE(" + sNum + ");'>Advanced</div></div>"

			+ "<div class='list-group-item height-225 git-add-service" + sNum + "' id='git-advanced" + sNum + "' style='display:none; background-color:#FFFFFF;'><div class='table-responsive' style='font-size:12px;'>"
			+ "<textarea id='git-box_advanced" + sNum + "' style='width:100%; margin-top:5px; border:1px solid #ccc; border-radius: 4px; resize:none;' rows='11' spellcheck='false'></textarea></div></div>"

		$(element).appendTo("#div_serviceNameE"); //<span style='float:right;'>edit</span>						
		anr++;
	}
}									
  /*
  <a href='#' class='list-group-item height-225 git-add-service" + anr + "' id='edit" + anr + "' style='display:none; background-color:#FFFFFF;'><div class='table-responsive' style='font-size:12px;'> <table class='table'><button type='button' id='saveBtn_" + anr + "' class='btn btn-info' style='position: absolute; right: 25px; height: 30px; font-size: 12px;' onclick='classOverrideChangeE(this.id);editViewE(this.id);'>Save</button><thead><tr><th>Service Name</th><th>" + sName + "</th></tr></thead><tbody><tr style='height:28px;'><td style='padding:5px 8px'>Description</td><td style='padding:2px 8px;'><input type='text' id='description_" + anr +"' class='form-control' value='" + description + "' style='padding:2px 8px; height:24px;'></td></tr><tr style='height:28px;'><td style='padding:5px 8px'>Icon</td><td style='padding:2px 8px;'><input type='text' id='icon_" + anr + "' class='form-control' value='' style='padding:2px 8px; height:24px;'></td></tr><tr style='height:28px;'><td style='padding:5px 8px'>Priority</td><td style='padding:2px 8px;'><input type='text' id='priority_" + anr + "' class='form-control' value='' style='padding:2px 8px; height:24px;'></td></tr><tr style='height:28px;'><td style='padding:5px 8px'>Interactions</td><td style='padding:2px 8px;'><input type='text' id='interactions_" + anr + "' class='form-control' value='' style='padding:2px 8px; height:24px;'></td></tr><tr style='height:28px;'><td style='padding:5px 8px'>Parameters</td><td style='padding:2px 8px;'><input type='text' id='parameters_" + anr + "' class='form-control' value='concert_service_make_a_map/make_a_map' style='padding:2px 8px; height:24px;'></td></tr></tbody></table></div></a>"
  */

function delServiceE(sID, sNum) //use this!
{	//Solution의 Service 삭제, 2015-01-07(Wed)_shkwak ; sNum 추가, 2015-06-03(Wed)
	if (anr > 0)
	{	//anr ; 의미없음 조건식 없애도 됨.
		var element = "." + sID;
		$("div").remove(element); 
		anr--;
		console.log('delServiceE_anr : ' + anr); //현재 선택된 service 개수 판단에 사용, 2015-06-09(Tue)
	}	

	//Selected Service 항목 초기화, 2015-06-03(Wed)_shkwak
	SelectedServiceE_JSON[sNum] = { //GOOD, name 초기화 값 추가 검토 필요!
		name: ServiceRepoContent_JSON[sNum].name, 
		selected: 'false', 
		auto_enabled: 'false', 
		overrided_name: '', 
		overrided_description: '', 
		overrided_icon: '', 
		overrided_priority: '', 
		overrided_interactions: '', 
		overrided_parameters: ''
	};

	console.log(SelectedServiceE_JSON);
	console.log(SelectedServiceE_JSON[sNum]);
}						  

function classChangeE(cID, sNum) //use this!
{	//Auto enabled service - checkBox class 변경 함수, 2015-01-07(Wed)_shkwak
	var chk_id = "#git-check_" + cID, h6_id = '#' + cID;
	var this_class = $(chk_id).attr('class');
	console.log(cID + ', ' + h6_id + ', ' + chk_id + ', ' + this_class);

	if (this_class == "glyphicon glyphicon-unchecked")
	{
		$(chk_id).removeClass();
		$(chk_id).attr("class", "glyphicon glyphicon-check");
		//$("#keyWord_1 span").removeClass( 'aaa' );  // 기존 클래스를 지운다.
		//$("#keyWord_1 span").addClass( 'bbb' );  // 새로운 클래스를 적용한다.
		$(h6_id).css('color', '#59C1E0'); //color 변경!
		//$(this).css('color', 'red');
		//$(this).css({ 'color': 'red', 'font-size': '150%' });

		//Selected Service 항목 변경, 2015-06-03(Wed)_shkwak
		SelectedServiceE_JSON[sNum].auto_enabled = 'true';
		//console.log(SelectedServiceE_JSON);
		console.log(SelectedServiceE_JSON[sNum]);
	}
	else
	{
		$(chk_id).removeClass();
		$(chk_id).attr("class", "glyphicon glyphicon-unchecked");
		$(h6_id).css('color', '#FCB040'); //color 변경!

		//Selected Service 항목 변경, 2015-06-03(Wed)_shkwak
		SelectedServiceE_JSON[sNum].auto_enabled = 'false';
		//console.log(SelectedServiceE_JSON);
		console.log(SelectedServiceE_JSON[sNum]);
	}
}

function classOverrideChangeE(sNum) //_forked_repo //use this!
{	//overrided - check, 2015-06-02(Tue)_shkwak
	var chk_id = "#git-check_override" + sNum;
	var this_class = $(chk_id).attr('class'); //glyphicon glyphicon-remove
	console.log('--------------------------');
	console.log('classOverrideChangeE(sNum)');
	console.log('sNum : ' + sNum + ', chk_id : ' + chk_id + ', class : ' + this_class);
	
	//원본 데이터, undefined 문제 해결, undefind 시 -> ""로 대체, 2015-05-27
	var name = (ServiceRepoContent_JSON[sNum].name)? ServiceRepoContent_JSON[sNum].name : "";
	var description = (ServiceRepoContent_JSON[sNum].description)? ServiceRepoContent_JSON[sNum].description : "";
	var icon = (ServiceRepoContent_JSON[sNum].icon)? ServiceRepoContent_JSON[sNum].icon : "";
	var priority = (ServiceRepoContent_JSON[sNum].priority)? ServiceRepoContent_JSON[sNum].priority : "";
	var interactions = (ServiceRepoContent_JSON[sNum].interactions)? ServiceRepoContent_JSON[sNum].interactions : "";
	var parameters = (ServiceRepoContent_JSON[sNum].parameters)? ServiceRepoContent_JSON[sNum].parameters : "";
	
	//데이터 수정여부 판단, 2015-05-27(Wed)_shkwak / undefined, "" 비교 문제, trim() 적용 -> 스페이스 입력 제거 / 
	var overrided = false;
	if (name != (document.getElementById('git-name' + sNum).value).trim()) {
		//overrided_name 항목 추가, 2015-06-09(Wed)_shkwak
		SelectedServiceE_JSON[sNum].overrided_name = document.getElementById('git-name' + sNum).value.trim();
		overrided = true;
	} else {
		SelectedServiceE_JSON[sNum].overrided_name = "";
	}
	if (description != (document.getElementById('git-description' + sNum).value).trim()) {
		//Selected Service 항목 변경, 2015-06-03(Wed)_shkwak
		SelectedServiceE_JSON[sNum].overrided_description = document.getElementById('git-description' + sNum).value.trim();
		overrided = true;
	} else {
		SelectedServiceE_JSON[sNum].overrided_description = "";
	}
	if (icon != (document.getElementById('git-icon' + sNum).value).trim()) {
		//Selected Service 항목 변경, 2015-06-03(Wed)_shkwak
		SelectedServiceE_JSON[sNum].overrided_icon = (document.getElementById('git-icon' + sNum).value).trim();
		overrided = true;		
	} else {
		SelectedServiceE_JSON[sNum].overrided_icon = "";
	}
	if (priority != (document.getElementById('git-priority' + sNum).value).trim()) {
		//Selected Service 항목 변경, 2015-06-03(Wed)_shkwak
		SelectedServiceE_JSON[sNum].overrided_priority = (document.getElementById('git-priority' + sNum).value).trim();
		overrided = true;
	} else {
		SelectedServiceE_JSON[sNum].overrided_priority = "";
	}
	if (interactions != (document.getElementById('git-interactions' + sNum).value).trim()) {
		//Selected Service 항목 변경, 2015-06-03(Wed)_shkwak
		SelectedServiceE_JSON[sNum].overrided_interactions = (document.getElementById('git-interactions' + sNum).value).trim();
		overrided = true;
	} else {
		SelectedServiceE_JSON[sNum].overrided_interactions = "";
	}
	if (parameters != (document.getElementById('git-parameters' + sNum).value).trim()) {
		//Selected Service 항목 변경, 2015-06-03(Wed)_shkwak
		SelectedServiceE_JSON[sNum].overrided_parameters = (document.getElementById('git-parameters' + sNum).value).trim();
		overrided = true;
	} else {
		SelectedServiceE_JSON[sNum].overrided_parameters = "";
	}
		
	if (overrided)
	{
		console.info('달라');
		$(chk_id).removeClass();
		$(chk_id).attr("class", "glyphicon glyphicon-ok");

		console.log(SelectedServiceE_JSON[sNum]);
	}
	else
	{
		console.info('같아');
		$(chk_id).removeClass();
		$(chk_id).attr("class", "glyphicon glyphicon-remove");

		console.log(SelectedServiceE_JSON[sNum]);
	}
}

//==== Service Configurator Function, 2015-06-03(Wed)_shkwak
function GitHubServiceConfigure() //top func
{	//Edit UI에서 선택한 값을 적용, 2015-06-03(Wed)	
	var solutionName = document.getElementById('forked_repo_solution').value; //solutionName_check(name)!!	
	var Description  = document.getElementById('forked_repo_description').value;
	var License		 = document.getElementById('forked_repo_license').value;
	var Version		 = document.getElementById('forked_repo_version').value;
	var Maintainer	 = document.getElementById('forked_repo_maintainer').value;	

	if (solutionName == "" || Description == "" || License == "" || Version == "" || Maintainer == "")
	{
		console.log("Please insert values!");
		SweetAlert_Group('basicA', "Please insert values!");		
		//SweetAlert_Group('advancedA'); //input 창 있는 alert
	}
	else
	{		
		if (anr == 0)
		{	//service 선택이 0 인 경우 조건 필요!! ===> 조건식 추가, 2015-06-09(Tue)_shkwak
			SweetAlert_Group('basicA', "Please select services!");	
		}
		else
		{
			//solution.services content 작성, services 파일 구성, 2015-06-03(Wed)_shkwak
			serviceContent = ""; //Reset! 이전 content 삭제
			for (var i = 0; i < SelectedServiceE_JSON.length; i++)
			{
				if (SelectedServiceE_JSON[i].selected == 'true')
				{
					serviceContent_created = GitHubService_serviceContent_Create(i); //★★★★
				}
			}
			console.log(serviceContent); //ok? : 간혈적으로 값이 안나오는 경우 발생 - 원인 불명 ==> 서비스 구성 -> CREATE modal -> 서비스 구성 이동 시 발생 확인! 2015-06-09(Tue)

			//solution.launch content 작성,
			launchContent = ""; //Reset! 이전 content 삭제
			launchContent_created = GitHubService_launchContent_Create();

			//package.xml content 작성, //생성되는 타이밍 조절 필요, 현재위치 : 서비스 구성 시, 같이 생성됨 ->  ================================!!!!!!!!!!!!!!!
			packageContent = ""; //Reset! 이전 content 삭제
			packageContent_created = GitHubService_packageContent_Create();
			
			//CMcakeKists.txt content 작성
			cmakelistsContent = ""; //Reset! 이전 content 삭제
			cmakelistsContent_created = GitHubService_cmakelistsContent_Create();
		}
	}	
}

/*----package.xml content----*/
function GitHubService_packageContent_Create() //use this!!
{	//Selected service의 packageContent 작성, 2015-06-04(Thu)_shkwak
	/*--생성될 솔루션 파일명(임시)--*///solution은 생성할 솔루션명이랑 같아야 할듯
	var solutionName = document.getElementById('forked_repo_solution').value; //solutionName_check(name)!!	
	var Description  = document.getElementById('forked_repo_description').value;
	var License		 = document.getElementById('forked_repo_license').value;
	var Version		 = document.getElementById('forked_repo_version').value;
	var Maintainer	 = document.getElementById('forked_repo_maintainer').value;	

	if (solutionName == "" || Description == "" || License == "" || Version == "" || Maintainer == "")
	{
		//alert("Please insert values!");
		SweetAlert_Group('basicA', 'Please insert values!');
	}
	else
	{
		var saved_ros_package = ""; //각 서비스 별 ros_package name 중복 방지를 위한 임시 저장 변수! 2015-06-09(Tue)
		solutionName = solutionName_check(solutionName); //solutionName_check(name)!!★
		packageContent += "<?xml version='1.0' encoding='UTF-8'?>\n";
		packageContent += "<package>\n";
		packageContent += "  <name>" + solutionName + "</name>\n";
		packageContent += "  <version>" + Version + "</version>\n"; //1.0.0
		packageContent += "  <description>\n";
		packageContent += "    " + Description + "\n";
		packageContent += "  </description>\n";
		packageContent += "  <maintainer email='" + Maintainer + "@gmail.com'>" + Maintainer + "</maintainer>\n"; //@gmail.com fix! (imsi)
		packageContent += "  <license>" + License + "</license>\n";
		//packageContent += "  <author>Daniel Stonier</author>\n";
		packageContent += "\n";
		packageContent += "  <buildtool_depend>catkin</buildtool_depend>\n"; //catkin fix! (imsi)
		packageContent += "\n";

		//console.log(GitHub_ros_package_name); //OK
		for (var sNum = 0; sNum < SelectedServiceE_JSON.length; sNum++)
		{	
			//console.log(saved_ros_package + ', ' + GitHub_ros_package_name[sNum]);
			if (SelectedServiceE_JSON[sNum].selected == 'true' && saved_ros_package != GitHub_ros_package_name[sNum]) //중복검사, 2015-06-09
			{				
				//ros_package name 반영
				packageContent += "  <run_depend>" + GitHub_ros_package_name[sNum] + "</run_depend>\n";				
				saved_ros_package = GitHub_ros_package_name[sNum];
			}
		}

		//packageContent += "  <run_depend>concert_master</run_depend>\n";
		//packageContent += "  <run_depend>concert_common_services</run_depend>\n";		
		packageContent += "</package>";	
	}	
	console.log(packageContent); //ok
	return true;
}

/*----cmakelists.txt content----*/
function GitHubService_cmakelistsContent_Create() //use this!!!!
{	//Selected service의 cmakelistsContent 작성, 2015-06-04(Thu)_shkwak
	var solutionName = document.getElementById('forked_repo_solution').value; //"dummy_concert1";
	solutionName = solutionName_check(solutionName); //solutionName_check(name)!!★

	cmakelistsContent += "cmake_minimum_required(VERSION 2.8.3)\n";
	cmakelistsContent += "project(" + solutionName + ")\n";
	cmakelistsContent += "\n";
	cmakelistsContent += "find_package(catkin REQUIRED)\n";
	cmakelistsContent += "\n";
	cmakelistsContent += "catkin_package()";

	console.log(cmakelistsContent); //ok
	return true;
}

/*----solution.launch content----*/
function GitHubService_launchContent_Create() //use this!!
{	//Selected service의 launchContent 작성, 2015-06-04(Thu)_shkwak
	var solutionName = document.getElementById('forked_repo_solution').value; //"dummy_concert1";
	solutionName = solutionName_check(solutionName); //solutionName_check(name)!!★
	var auto_enabled_services = new Array(); 
	var sNum = 0;
	for (var i = 0; i < SelectedServiceE_JSON.length; i++)
	{
		if (SelectedServiceE_JSON[i].auto_enabled == 'true')
		{
			auto_enabled_services[sNum++] = SelectedServiceE_JSON[i].name; //★
		}
	}

	launchContent += "<launch>\n";
	launchContent += "    <arg name='concert_name' default='" + solutionName + "'/>\n";
	launchContent += "    <arg name='services' default='" + solutionName + "/" + solutionName + ".services'/>\n";
	launchContent += "    <arg name='default_auto_enable_services' default='[" + auto_enabled_services + "]'/>\n";
	launchContent += "\n";
//	launchContent += "    <include file='$(find " + solutionName + ")/launch/" + solutionName + ".launch'>\n";
	launchContent += "    <include file='$(find concert_master)/launch/concert_master.launch'>\n"; //concert_master
	launchContent += "        <arg name='concert_name' value='$(arg concert_name)'/>\n";
	launchContent += "        <arg name='services' value='$(arg services)'/>\n";
	launchContent += "        <arg name='conductor_auto_invite' value='true'/>\n";
	launchContent += "        <arg name='conductor_local_clients_only' value='true'/>\n";
	launchContent += "        <arg name='auto_enable_services' value='$(arg default_auto_enable_services)'/>\n";
//	launchContent += "        <arg name='scheduler_type' value='compatibility_tree'/>\n";
	launchContent += "    </include>\n";
	launchContent += "</launch>";
	
	console.log(launchContent); //ok
	return true;
}

/*----solution.services content----*/
function GitHubService_serviceContent_Create(sNum) //use this!!!!
{	//Selected service의 serviceContent 작성, 2015-06-03(Wed)_shkwak
	var overrided = false;
	serviceContent += "- resource_name: " + GitHub_resource_name[sNum] + "\n";
	if (SelectedServiceE_JSON[sNum].overrided_name != ""){
		if (!overrided){ //overrided_name 항목 추가, 2015-06-09(Tue)_shkwak
			serviceContent += "  override:\n"; //초기 한번만 추가!
			overrided = true;
		}
		serviceContent += "    name: " + SelectedServiceE_JSON[sNum].overrided_name + "\n";
	}
	if (SelectedServiceE_JSON[sNum].overrided_description != ""){
		if (!overrided){ //override 상태로 들어왔는데, 이전 상태가 false 인 경우.
			serviceContent += "  override:\n"; //초기 한번만 추가!
			overrided = true;
		}
		serviceContent += "    description: " + SelectedServiceE_JSON[sNum].overrided_description + "\n";
	}
	if (SelectedServiceE_JSON[sNum].overrided_icon != ""){
		if (!overrided){ //override 상태로 들어왔는데, 이전 상태가 false 인 경우.
			serviceContent += "  override:\n"; //초기 한번만 추가!
			overrided = true;
		}
		serviceContent += "    icon: " + SelectedServiceE_JSON[sNum].overrided_icon + "\n";
	}
	if (SelectedServiceE_JSON[sNum].overrided_interactions != ""){
		if (!overrided){ //override 상태로 들어왔는데, 이전 상태가 false 인 경우.
			serviceContent += "  override:\n"; //초기 한번만 추가!
			overrided = true;
		}
		serviceContent += "    interactions: " + SelectedServiceE_JSON[sNum].overrided_interactions + "\n";
	}
	if (SelectedServiceE_JSON[sNum].overrided_parameters != ""){
		if (!overrided){ //override 상태로 들어왔는데, 이전 상태가 false 인 경우.
			serviceContent += "  override:\n"; //초기 한번만 추가!
			overrided = true;
		}
		serviceContent += "    parameters: " + SelectedServiceE_JSON[sNum].overrided_parameters + "\n";
	}
	if (SelectedServiceE_JSON[sNum].overrided_priority != ""){
		if (!overrided){ //override 상태로 들어왔는데, 이전 상태가 false 인 경우.
			serviceContent += "  override:\n"; //초기 한번만 추가!
			overrided = true;
		}
		serviceContent += "    priority: " + SelectedServiceE_JSON[sNum].overrided_priority + "\n";
	}
	//console.log(serviceContent); //ok
	return true;
}

function GitHubService_resource_name_Create() //use this!
{	//service file full path(path_GitHubServiceList)를 파싱하여 .services 파일에 사용할 resource_name 항목 생성! 2015-06-03(Wed)_shkwak
	var sNum = 0;
	path_GitHubServiceList.forEach(function (path){ 
		//concert_services\concert_service_admin\services\admin\admin.service, [1] + [3] 조합 사용! (Local)
		//"concert_common_services/services/pickup_delivery/pickup_delivery.service", //(GitHub)

		var sep_path = path.split("/");
		//console.log(sep_path);
		//console.log('sep_path.length : ' + sep_path.length);

		var services_pos = 0;
		for (var i = 0; i < sep_path.length; i++) //sNum, i 같이 사용해도 됨!
		{
			if (sep_path[i] == 'services') {
				//console.log('services positon : ' + i);
				services_pos = i; //services 위치 찾기
				GitHub_resource_name[sNum] = sep_path[i-1] + '/' + sep_path[i+1];
				GitHub_ros_package_name[sNum++] = sep_path[i-1]; //2015-06-09(Tue), ros package 명 저장
				break;
			}		
		}		
	});

	console.log(GitHub_resource_name); //GOOD
}

//*****************************************//

//============= GitHub service repository, solution repo 연동 =============
//2015-05-10(Sun)_shkwak
//========================================================================= 
//


/*============= Creat new solution ==============*/
var created_num = 0;
var timer;

function SolutionCreate_forked_repo()
{	//2015-06-01(Mon), forked repo에 solution 생성, 각 파일 contents 재 작성 필요!==/ services 파일 content 적용, 2015-06-03(Wed)
	/*--GitHub 사용자 정보--*/
	var owner = localStorage.getItem("git_username"); //'meddugi723'
	var repo = localStorage.getItem("solution_repo"); //'concert_common_solutions'

	var userID = document.getElementById("git_username").value;
	var userPW = document.getElementById("git_password").value;
	
	/*--access_token--*/ //no use!
	//var access_token = localStorage.getItem("access_token");

	if (userID == "" || userPW == "")
	{
		console.log("Please check username and password!");
		SweetAlert_Group('basicA', "Please check username and password!");
	}
	else
	{
		/*--생성될 솔루션 파일명(임시)--*///solution은 생성할 솔루션명이랑 같아야 할듯
		var solutionName = document.getElementById('forked_repo_solution').value; //solutionName_check(name)!!
		var Description  = document.getElementById('forked_repo_description').value;
		var License		 = document.getElementById('forked_repo_license').value;
		var Version		 = document.getElementById('forked_repo_version').value;
		var Maintainer	 = document.getElementById('forked_repo_maintainer').value;	
	
		if (solutionName == "" || Description == "" || License == "" || Version == "" || Maintainer == "")
		{
			//alert("Please insert values!");
			SweetAlert_Group('basicA', 'Please insert values!');
		}
		else {
			if (serviceContent_created == false || launchContent_created == false || packageContent_created == false || cmakelistsContent_created == false || anr == 0)
			{
				SweetAlert_Group('basicA', 'Please configure service contents!');
			}
			else
			{
				solutionName = solutionName_check(solutionName); //solutionName_check(name)!!
				var fileName = [solutionName + ".launch", solutionName + ".services", "package.xml", "CMakeLists.txt"];		

				//launchContent = (launchContent != "")? Base64.encode(launchContent) : document.getElementById('box1').value;
				//serviceContent = (serviceContent != "")? Base64.encode(serviceContent) : document.getElementById('box2').value;
				//packageContent = (packageContent != "")? Base64.encode(packageContent) : document.getElementById('box3').value;
				//cmakelistsContent = (cmakelistsContent != "")? Base64.encode(cmakelistsContent) : document.getElementById('box4').value;
				
				//var box = [document.getElementById('box1').value, document.getElementById('box2').value, document.getElementById('box3').value, document.getElementById('box4').value];
				var box = [Base64.encode(launchContent), Base64.encode(serviceContent), Base64.encode(packageContent), Base64.encode(cmakelistsContent)];

				var data = userID + ":" + userPW;
				var base64IDPW_user = Base64.encode(data)

				var msg = (document.getElementById('forked_repo_msg').value)? document.getElementById('forked_repo_msg').value : "Create new solution to forked repo!"; 
				var content = box[created_num]; 
				var cmds = {message : msg, content : content};
				var url = "https://api.github.com/repos/" + owner + "/" + repo + "/contents/" + solutionName + "/" + fileName[created_num];
				if (created_num == 0) url = "https://api.github.com/repos/" + owner + "/" + repo + "/contents/" + solutionName + "/launch/" + fileName[created_num];
				if (created_num == 1) url = "https://api.github.com/repos/" + owner + "/" + repo + "/contents/" + solutionName + "/solution/" + fileName[created_num];

				jQuery.support.cors = true;
				$.ajax({
					beforeSend: function (request) { 
						request.setRequestHeader("Authorization", "basic " + base64IDPW_user);
					},
					url: url, //"https://api.github.com/repos/" + owner + "/" + repo + "/contents/" + solutionName + "/" + fileName[created_num], // + "?access_token=" + access_token,
					type: "PUT",
					data: JSON.stringify(cmds),
					contentType: "application/json;charset=utf-8",
					success: function (data) {
						console.log("fileName : " + fileName[created_num]);
						console.log("created_num : " + created_num);
						created_num++;
						
						if (created_num == 4)
						{	
							created_num = 0;
							var created_solution_url = "https://github.com/" + owner + "/" + repo + "/tree/master/" + solutionName; //api, repos, contents 항목 삭제!, tree/master/ 추가★
							console.log(created_solution_url);
							clearTimeout(timer);
							
							//솔루션 생성 완료 시, Alert! 2015-06-09(Tue)_shkwak
							SweetAlert_Group('basicA', solutionName + " is successfully created!");
						}
						else
						{
							timer = setTimeout('SolutionCreate_forked_repo()',500);
						}			

						console.log(timer);
					},
					error: function (x, y, z) {
						console.log(x + " " + y + " : " + z + ", created_num : " + created_num + "\n\n솔루션 생성 중 오류가 발생했습니다. 다시 시도해 주세요.");
						if (z == "Unprocessable Entity")
						{
							console.log("이미 동일한 솔루션이 존재합니다.");
							SweetAlert_Group('basicA', "The same solution already exists!");
						}
						else if (z == "Unauthorized")
						{	//add, 2015-06-01(Mon)_shkwak
							console.log("Unauthorized!");
							SweetAlert_Group('basicA', "Unauthorized!");
						}
						else if (z == "Not Found")
						{
							console.log("gitInfo(git_username, git_repo) 값이 올바르지 않습니다. 다시 확인해 주세요.");					
						}
						
						created_num = 0;
						clearTimeout(timer);
					}
				});		
			}
		}
	}
}

function editViewE_SetValue(sNum)
{	//실제 ServiceRepoContent(num) data 적용, 2015-06-02(Tue)_shkwak ★, 선택한 서비스의 contents 항목을 채운다.
	console.log('sNum : ' + sNum);
	console.log(ServiceRepoContent_JSON[sNum].description);
	console.log(ServiceRepoContent_JSON);
	
	if (ServiceRepoContent_JSON[sNum].name) document.getElementById('git-name' + sNum).value = ServiceRepoContent_JSON[sNum].name;
	else document.getElementById('git-name' + sNum).value = ""; //add name 항목, 2015-06-09(Tue)
	if (ServiceRepoContent_JSON[sNum].description) document.getElementById('git-description' + sNum).value = ServiceRepoContent_JSON[sNum].description;
	else document.getElementById('git-description' + sNum).value = "";
	if (ServiceRepoContent_JSON[sNum].icon) document.getElementById('git-icon' + sNum).value = ServiceRepoContent_JSON[sNum].icon;
	else document.getElementById('git-icon' + sNum).value = "";
	if (ServiceRepoContent_JSON[sNum].priority) document.getElementById('git-priority' + sNum).value = ServiceRepoContent_JSON[sNum].priority;
	else document.getElementById('git-priority' + sNum).value = "";
	if (ServiceRepoContent_JSON[sNum].interactions) document.getElementById('git-interactions' + sNum).value = ServiceRepoContent_JSON[sNum].interactions;
	else document.getElementById('git-interactions' + sNum).value = "";
	if (ServiceRepoContent_JSON[sNum].parameters) document.getElementById('git-parameters' + sNum).value = ServiceRepoContent_JSON[sNum].parameters;
	else document.getElementById('git-parameters' + sNum).value = "";

	//document.getElementById('top_description_' + sNum).innerHTML = ServiceRepoContent_JSON[sNum].description;
}

function solutionName_check(name) //use this!
{	//기술적인 이슈 처리 : Name 정보는 (*)영문으로 하고, (1)소문자로 변환하고 (2)공백은 “_” 밑첨자로 변경_2015-04-29(Wed), 2015-06-03(Wed)_RE	
	//console.log(name); //제거 전
	var checked_solutionName = name.trim(); //좌우 공백제거
	//console.log(checked_solutionName); //제거 후
	
	//var solutionName = document.getElementById('inputName').value;

	//(1)소문자로 변환
	checked_solutionName = checked_solutionName.toLowerCase();
	//console.log(checked_solutionName); //변환 후

	//(2)공백 "_" 변경
	//checked_solutionName = checked_solutionName.replace(" ","_"); //첫번째 공백만 '_'으로 변경하고 나머지는 변경이 되지 않는 문제 확인!
	checked_solutionName = checked_solutionName.replace(/ /gi,"_"); //따옴표를 슬래시로 대체하고 뒤에 gi 를 붙이면 replaceAll 과 같은 결과를 볼 수 있다.
	//console.log(checked_solutionName); //변경 후

	return checked_solutionName;
}

function select_repo_change(select_num, option_value)
{	//2015-06-10(Wed), select_repo onChange 이벤트 함수 통합, 이전 select 항목 선택 시, 나중 항목 초기화 처리
	console.log('select_num : ' + select_num + ', option_value : ' + option_value);
	switch (select_num)
	{
		case 1:
			GetDataF(option_value);
			break;
		case 2:
			GetData_subF(option_value);
			break;
		case 3:
			GetData_sub_subF(option_value);
			break;
	}
}

var module_fork_opened = false; //2015-06-11
var module_branch_opened = false; 
var module_contents_opened = false;
var module_pr_opened = true;
var module_run_opened = true; //2015-06-15

function module_ShowHide(module)
{	//기능 항목 접기/펼치기, 2015-06-11(Thu)_shkwak
	switch (module)
	{
		case 'fork':
			if (!module_fork_opened)
			{
				$('#module_fork_icon').removeClass();
				$('#module_fork_icon').attr('class', 'glyphicon glyphicon-chevron-up');
				$('#module_fork').attr('style', 'display: block;');
				module_fork_opened = true;
			}
			else
			{
				$('#module_fork_icon').removeClass();
				$('#module_fork_icon').attr('class', 'glyphicon glyphicon-chevron-down');
				$('#module_fork').attr('style', 'display: none;');
				module_fork_opened = false;
			}			
			break;
		case 'branch':
			if (!module_branch_opened)
			{
				$('#module_branch_icon').removeClass();
				$('#module_branch_icon').attr('class', 'glyphicon glyphicon-chevron-up');
				$('#module_branch').attr('style', 'display: block;');
				module_branch_opened = true;
			}
			else
			{
				$('#module_branch_icon').removeClass();
				$('#module_branch_icon').attr('class', 'glyphicon glyphicon-chevron-down');
				$('#module_branch').attr('style', 'display: none;');
				module_branch_opened = false;
			}
			break;
		case 'contents':
			if (!module_contents_opened)
			{
				$('#module_contents_icon').removeClass();
				$('#module_contents_icon').attr('class', 'glyphicon glyphicon-chevron-up');
				$('#module_contents').attr('style', 'display: block;');
				module_contents_opened = true;
			}
			else
			{
				$('#module_contents_icon').removeClass();
				$('#module_contents_icon').attr('class', 'glyphicon glyphicon-chevron-down');
				$('#module_contents').attr('style', 'display: none;');
				module_contents_opened = false;
			}
			break;
		case 'pr': //pull request
			if (!module_pr_opened)
			{
				$('#module_pr_icon').removeClass();
				$('#module_pr_icon').attr('class', 'glyphicon glyphicon-chevron-up');
				$('#module_pr').attr('style', 'display: block;');
				module_pr_opened = true;
			}
			else
			{
				$('#module_pr_icon').removeClass();
				$('#module_pr_icon').attr('class', 'glyphicon glyphicon-chevron-down');
				$('#module_pr').attr('style', 'display: none;');
				module_pr_opened = false;
			}
			break;
		case 'run': //solution run
			if (!module_run_opened)
			{
				$('#module_run_icon').removeClass();
				$('#module_run_icon').attr('class', 'glyphicon glyphicon-chevron-up');
				$('#module_run').attr('style', 'display: block;');
				module_run_opened = true;
			}
			else
			{
				$('#module_run_icon').removeClass();
				$('#module_run_icon').attr('class', 'glyphicon glyphicon-chevron-down');
				$('#module_run').attr('style', 'display: none;');
				module_run_opened = false;
			}
			break;
	}
}

function GitHubSolutionRepoListG() //(1)
{	//GitHub Solution Repository에서 Solution 리스트를 가져온다. 2015-06-15(Mon)_shkwak
	var select = document.getElementById('select_solution_list');

	/*selectbox option 삭제*/
	select.options.length = 0; //option 전체삭제
	var option_line = document.createElement('option');
	option_line.value = option_line.text = "------ Select a solution ------";
	select.add(option_line);

	owner = localStorage.getItem("solution_owner");
	repo = localStorage.getItem('solution_repo');
	
	if (owner == "" || repo == "")
	{
		alert("Check Owner and Repository value!");		
	}
	else
	{
		jQuery.support.cors = true;
		$.ajax({
			url: "https://api.github.com/repos/" + owner + "/" + repo + "/contents",
			type: "GET",
			dataType: "json",
			success: function (data) {
				var j = 1;
				for (var i=0;i<data.length;i++)
				{
					var option = document.createElement('option');
					if (data[i].type == "dir")
					{	//솔루션만 리스트업_2014-04-16_유진로봇 요청사항
						option.value = option.text = data[i].name;
						select.add(option);
						/*--data_type 저장--*/
						//data_typeG[j] = data[i].type; //★
						console.log(data[i].name + ', ' + data[i].type);
						j++;
					}
				}
			},
			error: function (x, y, z) {
				alert(x + "\n" + y + "\n" + z);
			}
		});	
	}
}

//=====================================================================================================================
function imsi_test()
{	//for test func, 2015-06-02
	console.log(document.getElementById('git-box_advanced0').value); //o
	//console.log(document.getElementById('git-box_advanced0').innerHTML); //x
	
	//선택된 서비스 정보 저장 test, 2015-06-03(Wed)
	SelectedServiceE_JSON[0] = {selected: 'true', name: 'name', description: 'desc', icon: 'icon', priority: 'priority', 
		interactions: 'interactions', parameters: 'parameters', auto_enabled_service: 'true', override_desc: 'true'};
	console.log(SelectedServiceE_JSON[0].name);
	console.log('auto_enabled_service : ' + SelectedServiceE_JSON[0].auto_enabled_service);
	console.log('override_desc : ' + SelectedServiceE_JSON[0].override_desc);
	console.log('selected : ' + SelectedServiceE_JSON[0].selected);
}
