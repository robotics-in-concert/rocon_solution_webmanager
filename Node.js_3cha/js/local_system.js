/*!
 * local_system.js v0.1.0
 *
 * Copyright 2015 shkwak
 * Licensed under the BSD license
 */

//Local System의 Service List를 가져온다. 
var rServiceContent = [];
var data_servicelist = new Array();
var data_servicelist_full = new Array();
var resource_name = new Array(); //2015-05-27
var selected_serviceNum = new Array(); //2015-05-27, 서비스 구성도구에서 선택된 서비스 num를 저장!

function GetLocalServiceList(type)
{	//Local System(myservices 폴더)의 Service List를 가져온다, 2015-04-30(Thu)_shkwak	
	var cmd = "GetLocalServiceList";
	var message = {cmd : cmd, option : 'service_list'};
	console.log("message : " + message.cmd);
	
	//message send
	socket.send(message); 

	//message receive
	socket.on('message', function(data) { //typeof(data.content) : string ; OK
		//sting to json type convert
		data_servicelist_full = data.list; //Array type, service file full path!!
		data_servicelist = data.servicelist;		
		console.log(data_servicelist);
		console.log(data_servicelist_full);
		show_servicelist(); //다음 단계로 이동!		

		//service file full path!!를 파싱
		LocalService_resource_name_Create();
	});	
}

function LocalService_resource_name_Create()
{	//service file full path!!를 파싱하여 .services 파일에 사용할 resource_name 항목 생성! 2015-05-27(Wed)_shkwak
	var pNum = 0;
	data_servicelist_full.forEach(function (path){ //concert_services\concert_service_admin\services\admin\admin.service, [1] + [3] 조합 사용!
		var sep_path = path.split("\\");
		//console.log(sep_path);
		if (sep_path[3] == 'services') 
		{
			//console.log(sep_path[1] + '/' + sep_path[4]);
			resource_name[pNum++] = sep_path[1] + '/' + sep_path[4];
		}
		else
		{
			//console.log(sep_path[1] + '/' + sep_path[3]); //[이슈] service full path split - 항목 위치 다른 경우 발생_2015-05-27 21;47;16.PNG
			resource_name[pNum++] = sep_path[1] + '/' + sep_path[3];
		}
	});

	console.log(resource_name); //OK
}

var color_sample = ['#59C1E0', '#FCB040', '#EF3E35', '#4D4B45', '#59C1E0', '#FCB040', '#EF3E35', '#4D4B45', '#59C1E0', '#FCB040', '#EF3E35', '#4D4B45', '#59C1E0', '#FCB040', '#EF3E35', '#4D4B45', '#59C1E0', '#FCB040', '#EF3E35', '#4D4B45']; //우선 20개, 추후 random() 적용 예정

function show_servicelist() //ing!
{	//socket message가 수신된 후(데이터가 저장된 후) 데이터를 확인한다. 순차 실행을 위함.
	console.log(data_servicelist);

	//***** Element dynamic create/remove *****//
	$('.list-group-item1').remove(); //기존 sample 리스트 삭제

	var sNum = 0;
	data_servicelist.forEach(function(file){		
		var element = "<div class='list-group-item service" + sNum + " list-group-item1' style='height:75px; cursor: pointer;'>"
			+ "<p class='list-group-item-text' style='color:#A8A9AC;'>service name : </p>" 
			+ "<h3 class='list-group-item-heading' style='color:" + color_sample[sNum] + ";' "
			+ "onclick='addService(this.innerHTML, this.style.color, " + sNum + ");GetLocalServiceContent(" + sNum + ");'>" + file + "</h3></div>"

		$(element).appendTo("#div_serviceList"); //획득한 service 리스트 추가
		sNum++;
	});		
		
	var solutionName = document.getElementById('created_solutionName').value;
	if (solutionName == "SOLUTION NAME : dummy_concert1")
	{
		console.info("솔루션 생성을 먼저 하세요!");
	}
}

// LocalServiceContent - JSON type으로 저장! 2015-05-27(Wed)_shkwak
var LocalServiceContent_JSON = new Array(); 
var LocalServiceContent = new Array(); 

function GetLocalServiceContent(num) //★★★
{	//2015-05-06(Wed)_shkwak, 해당 서비스의 내용을 가져온다. //2015-05-27(Wed)_RE
	var cmd = "GetLocalServiceContent"; 
	var message = {cmd : cmd, option : 'content', num : num}; //num : 서비스 리스트 항목 번호
	
	//message send
	socket.send(message); 

	//message receive
	socket.on('message_content', function(data) {
		var data_content = data.content;		
		LocalServiceContent[num] = data_content; //원본 data 저장!
		//data_content = data_content.replace(/\n/gi, ':');		
		data_content = data.content.replaceAll('\n', ':'); //Uncaught TypeError: Cannot read property 'replaceAll' of undefined 이슈
		//console.log(data_content);
		rServiceContent = data_content.split(':');
		console.log(rServiceContent.length-1);
//		rServiceContent.forEach(function(file){
//			console.log(file.trim()); //trim() 사용하여 좌우 공백 제거, trim() : 별도로 정의된 메소드
//		});				
		// json type으로 변경하고 싶은데.. ; 2015-05-27(Wed)_RE, string 생성 후, JSON.parse() 이용하여 json object 변환!
		//var object = {}; 
		var jData = ""; //string
		for (var i=0; i < rServiceContent.length-1;) { //8
			//console.log(rServiceContent[i] + ':' + rServiceContent[i+1]);
			var end = (i+2 == rServiceContent.length-1)? '"' : '", ';
			jData += rServiceContent[i] + ': "' + rServiceContent[i+1].trim() + end;
			i = i+2;
		}
		//console.log(jData);
		jData = '{' + jData + '}';
		console.log(jData);
		//LocalServiceContent_JSON[num] = JSON.parse(jData); //object, JSON.parse() ; x
		LocalServiceContent_JSON[num] = eval("(" + jData + ")"); //object
		console.log('num : ' + num);
		console.log(LocalServiceContent_JSON[num]);

		//editView_SetValue(num); //contents 덮어쓰는 문제 발생!
	});	
}

function GetLocalServiceLength()
{	//2015-05-06(Wed)_shkwak, 로컬 서비스 항목 개수를 가져온다.
	var folder = ""; 
	var cmd = "GetLocalServiceLength";
	var message = {cmd : cmd, option : 'length'};
	
	//message send
	socket.send(message); 

	//message receive
	socket.on('message', function(data) {
		var data_length = data.length;
		
		console.log("service length : " + data_length);
	});
}

//***** Element dynamic create/remove *****//
var aE = 0;
function addElement(){ //no use!
	aE++;
	var element = "<a href='#' class='list-group-item a" + aE + "' style='height:75px;'><p class='list-group-item-text' style='color:#A8A9AC;'>service name : </p><h3 class='list-group-item-heading' style='color:#59C1E0;' onclick='addService(this.innerHTML, this.style.color);'>Service " + aE + "</h3></a>"
	$(element).appendTo("#div_serviceList");						
}								

function delElement(){ //no use!						  
	if (aE > 0){
		var element = ".a" + aE;
		$("a").remove(element); 
		//$("a").remove(); //<a> all remove ㄷㄷ!
		//$("a").detach(); //same? remove()
		aE--;
	}						
}						  

//***** Service dynamic create/remove *****//
var aSn = 0;
function addService(sName, tColor, sNum) //★★★
{	//Solution에 Service 추가, 2015-01-07(Wed)_shkwak, sNum 추가, 2015-05-27(Wed)_shkwak								
	console.log("aSn : " + aSn + ", sNum : " + sNum);
	//var description = (LocalServiceContent_JSON[sNum].description)? LocalServiceContent_JSON[sNum].description : 'Robot deliveries what you order through your application. You can choose delivery robots as your needs. e.g.beverage,...';
	var description = 'Robot deliveries what you order through your application. You can choose delivery robots as your needs. e.g.beverage,...';

	var element = "<div class='list-group-item height-75 add-service" + sNum 
		+ "' style='cursor: pointer;'><div><p id='add-service" + sNum + "' class='list-group-item-text col-xs-9' style='color:" + tColor 
		+ "; padding-left:0px;' onclick='delService(this.id, " + sNum + ");'>" + sName + " (<span id='icon" + sNum 
		+ "' class='glyphicon glyphicon-minus'></span>)</p></div><div class='col-xs-9' style='padding:0px;'><h6 style='cursor: default;' id='top_description_" + sNum + "'>" + description
		+ "</h6></div><div class='col-xs-3' style='padding:0px; margin-top:-24px;'><h6 id='h6_n" + sNum 
		+ "' style='color:#FCB040; float:right; margin:8px 0px 0px 0px;' onclick='classChange(this.id);'>Auto enabled service <span id='check_h6_n" + sNum 
		+ "' class='glyphicon glyphicon-unchecked'></span></h6><div><span style='float:right; padding-right:63px; color:#ccc; font-size:12px; cursor: default;'>overrided <span id='check_override" + sNum 
		+ "' class='glyphicon glyphicon-remove'></span></span></div><strong><div id='editBtn_" + sNum 
		+ "' style='float:right; padding-right:108px; color:; font-size:12px;' onclick='editView(this.id)';>edit</div></strong></div></div>"
		
		+ "<div class='list-group-item height-225 add-service" + sNum + "' id='local_edit" + sNum 
		+ "' style='display:none; background-color:#FFFFFF;'><div class='table-responsive' style='font-size:12px;'> <table class='table'><button type='button' id='overrideBtn_" + sNum 
		+ "' class='btn btn-info' style='position: absolute; right: 25px; height: 30px; font-size: 12px;' onclick='classOverrideChange(this.id); editView(this.id);'>Override</button><thead><tr><th>Service Name</th><th>" + sName 
		+ "</th></tr></thead><tbody><tr style='height:28px;'><td style='padding:5px 8px'>Description</td><td style='padding:2px 8px;'><input type='text' id='description_" + sNum 
		+ "' class='form-control' value='' style='padding:2px 8px; height:24px;'></td></tr><tr style='height:28px;'><td style='padding:5px 8px'>Icon</td><td style='padding:2px 8px;'><input type='text' id='icon_" + sNum 
		+ "' class='form-control' value='' style='padding:2px 8px; height:24px;'></td></tr><tr style='height:28px;'><td style='padding:5px 8px'>Priority</td><td style='padding:2px 8px;'><input type='text' id='priority_" + sNum 
		+ "' class='form-control' value='' style='padding:2px 8px; height:24px;'></td></tr><tr style='height:28px;'><td style='padding:5px 8px'>Interactions</td><td style='padding:2px 8px;'><input type='text' id='interactions_" + sNum 
		+ "' class='form-control' value='' style='padding:2px 8px; height:24px;'></td></tr><tr style='height:28px;'><td style='padding:5px 8px'>Parameters</td><td style='padding:2px 8px;'><input type='text' id='parameters_" + sNum 
		+ "' class='form-control' value='' style='padding:2px 8px; height:24px;'></td></tr></tbody></table></div>"
		
		+ "<div id='advancedBtn_" + sNum + "' style='float:right; padding-right: 10px; color: #C90808; font-size: 12px; margin-top: -14px; cursor: pointer;' onclick='advancedView(this.id);'>Advanced</div></div>"

		+ "<div class='list-group-item height-225 add-service" + sNum + "' id='advanced" + sNum + "' style='display:none; background-color:#FFFFFF;'><div class='table-responsive' style='font-size:12px;'>"
		+ "<textarea id='box_advanced" + sNum + "' style='width:100%; margin-top:5px; border:1px solid #ccc; border-radius: 4px; resize:none;' rows='11' spellcheck='false'></textarea></div></div>"

	$(element).appendTo("#div_serviceName"); //<span style='float:right;'>edit</span>	
	selected_serviceNum[aSn] = sNum; //선택된 서비스의 num를 저장! ; OK -> 먼가 배열 num이랑 서비스 num이랑 짝을 지어야 할듯, 나중에 삭제하기 편하도록!
	console.log(selected_serviceNum);
	aSn++;
}								

function delService(sID, sNum)
{	//Solution의 Service 삭제, 2015-01-07(Wed)_shkwak 						  
	if (aSn > 0){
		var element = "." + sID; //add-service + sNum, ex)add-service0
		$("div").remove(element); //a -> div
		selected_serviceNum[aSn-1] = null; //wrong! ===============================================================추가한 서비스 num 빼는 방법은 다시 생각하기로!
		console.log(selected_serviceNum);
		aSn--;
	}
}

function editView_SetValue(sNum)
{	//실제 GetLocalServiceContent(num) data 적용, 2015-05-27(Wed)_shkwak ★	
	console.log('sNum : ' + sNum);
	console.log(LocalServiceContent_JSON[sNum].description);
	console.log(LocalServiceContent_JSON);

	if (LocalServiceContent_JSON[sNum].description) document.getElementById('description_' + sNum).value = LocalServiceContent_JSON[sNum].description;
	else document.getElementById('description_' + sNum).value = "";
	if (LocalServiceContent_JSON[sNum].icon) document.getElementById('icon_' + sNum).value = LocalServiceContent_JSON[sNum].icon;
	else document.getElementById('icon_' + sNum).value = "";
	if (LocalServiceContent_JSON[sNum].priority) document.getElementById('priority_' + sNum).value = LocalServiceContent_JSON[sNum].priority;
	else document.getElementById('priority_' + sNum).value = "";
	if (LocalServiceContent_JSON[sNum].interactions) document.getElementById('interactions_' + sNum).value = LocalServiceContent_JSON[sNum].interactions;
	else document.getElementById('interactions_' + sNum).value = "";
	if (LocalServiceContent_JSON[sNum].parameters) document.getElementById('parameters_' + sNum).value = LocalServiceContent_JSON[sNum].parameters;
	else document.getElementById('parameters_' + sNum).value = "";

	document.getElementById('top_description_' + sNum).innerHTML = LocalServiceContent_JSON[sNum].description;
}

//***************** edit *****************//
function editView(id)
{	//추가한 Service의 요소값을 수정하기 위한 영역을 보이게 한다.
	var sID = id.split('_'); //console.log(id); //editBtn_1 ; OK
	var eID = 'local_edit' + sID[1]; //console.log(sID[1]); //1 ; OK, sNum을 바로 받아도 됨!_2015-05-27
	var aID = 'advanced' + sID[1];
	var sNum = sID[1];
	console.log(eID); //edit1 ; OK

	if (document.getElementById(eID).style.display == 'none') {
		document.getElementById(eID).style.display = 'block';
		editView_SetValue(sNum); //imsi, ==========================================================================================위치 이동 필요!
	} else {
		document.getElementById(eID).style.display = 'none';
		document.getElementById(aID).style.display = 'none';
	}
}

function advancedView(id)
{	//Service contents 전체 소스를 보여준다.
	var sID = id.split('_'); //console.log(id); //editBtn_1 ; OK
	var eID = 'advanced' + sID[1]; //console.log(sID[1]); //1 ; OK, sNum을 바로 받아도 됨!_2015-05-27
	var sNum = sID[1];
	console.log(eID); //edit1 ; OK
	var aID = 'box_advanced' + sNum; 

	if (document.getElementById(eID).style.display == 'none') {
		document.getElementById(eID).style.display = 'block';
		document.getElementById(aID).value = LocalServiceContent[sNum];	//===========================매번 원본 소스로 갱신! -> 소스위치 이동 필요!		
	} else {
		document.getElementById(eID).style.display = 'none';
	}
}

function classChange(cID, cColor)
{	//Auto enabled service - checkBox class 변경 함수, 2015-01-07(Wed)_shkwak
	var chk_id = "#check_" + cID, h6_id = '#' + cID;
	var this_class = $(chk_id).attr('class');
	console.log(chk_id + ', ' + this_class); //console.log(cID + ', ' + h6_id + ', ' + chk_id + ', ' + this_class);

	if (this_class == "glyphicon glyphicon-unchecked")
	{
		$(chk_id).removeClass();
		$(chk_id).attr("class", "glyphicon glyphicon-check");
		//$("#keyWord_1 span").removeClass( 'aaa' ); // 기존 클래스를 지운다.
		//$("#keyWord_1 span").addClass( 'bbb' );	 // 새로운 클래스를 적용한다.
		$(h6_id).css('color', '#59C1E0'); //color 변경!
	}
	else
	{
		$(chk_id).removeClass();
		$(chk_id).attr("class", "glyphicon glyphicon-unchecked");
		$(h6_id).css('color', '#FCB040'); //color 변경!
	}
}

function classOverrideChange(id)
{	 //overrided - check class 변경 함수, 2015-05-07(Thu)_shkwak
	var sID = id.split('_');
	var chk_id = "#check_override" + sID[1];
	var this_class = $(chk_id).attr('class');
	var sNum = sID[1]; //sNum
	console.log('sNum : ' + sID[1] + ', ' + chk_id + ', ' + this_class);

	//초기 데이터와 edit 데이터 log 출력, 2015-05-27(Wed)_shkwak
//	console.log(LocalServiceContent_JSON[sNum].description + ' : ' +  document.getElementById('description_' + sNum).value 
//		+ '\n' +  LocalServiceContent_JSON[sNum].icon + ' : ' +  document.getElementById('icon_' + sNum).value 
//		+ '\n' +  LocalServiceContent_JSON[sNum].priority + ' : ' +  document.getElementById('priority_' + sNum).value
//		+ '\n' +  LocalServiceContent_JSON[sNum].interactions + ' : ' +  document.getElementById('interactions_' + sNum).value
//		+ '\n' +  LocalServiceContent_JSON[sNum].parameters + ' : ' +  document.getElementById('parameters_' + sNum).value)

	//undefined 문제 해결, undefind 시 -> ""로 대체, 2015-05-27
	var description = (LocalServiceContent_JSON[sNum].description)? LocalServiceContent_JSON[sNum].description : "";
	var icon = (LocalServiceContent_JSON[sNum].icon)? LocalServiceContent_JSON[sNum].icon : "";
	var priority = (LocalServiceContent_JSON[sNum].priority)? LocalServiceContent_JSON[sNum].priority : "";
	var interactions = (LocalServiceContent_JSON[sNum].interactions)? LocalServiceContent_JSON[sNum].interactions : "";
	var parameters = (LocalServiceContent_JSON[sNum].parameters)? LocalServiceContent_JSON[sNum].parameters : "";
	
	//초기 데이터와 edit 데이터 log 출력, 2015-05-27(Wed)_shkwak
//	console.log(description + ' : ' +  document.getElementById('description_' + sNum).value 
//		+ '\n' +  icon + ' : ' +  document.getElementById('icon_' + sNum).value 
//		+ '\n' +  priority + ' : ' +  document.getElementById('priority_' + sNum).value
//		+ '\n' +  interactions + ' : ' +  document.getElementById('interactions_' + sNum).value
//		+ '\n' +  parameters + ' : ' +  document.getElementById('parameters_' + sNum).value)


	//데이터 수정여부 판단, 2015-05-27(Wed)_shkwak	: undefined, "" 비교 문제, trim() 적용 -> 빈값에 스페이스 입력 제거
	if (description != (document.getElementById('description_' + sNum).value).trim()
		|| icon != (document.getElementById('icon_' + sNum).value).trim() 
		|| priority != (document.getElementById('priority_' + sNum).value).trim()
		|| interactions != (document.getElementById('interactions_' + sNum).value).trim()
		|| parameters != (document.getElementById('parameters_' + sNum).value).trim()) 
	{
		console.info('달라');
		$(chk_id).removeClass();
		$(chk_id).attr("class", "glyphicon glyphicon-ok");
	}
	else
	{
		console.info('같아');
		$(chk_id).removeClass();
		$(chk_id).attr("class", "glyphicon glyphicon-remove");
	}

//	if (this_class == "glyphicon glyphicon-remove")
//	{
//		$(chk_id).removeClass();
//		$(chk_id).attr("class", "glyphicon glyphicon-ok");
//	}
//	else
//	{
//		$(chk_id).removeClass();
//		$(chk_id).attr("class", "glyphicon glyphicon-remove");
//	}
}
//*****************************************//

var fileModify = function(fileID){
	var serviceContent = ""; //Init!	
	var solutionName = document.getElementById('select_solution').value;
	var fileName = "";
	switch (fileID)
	{		
		case '1': 
			fileName = "package.xml"; 
			serviceContent += "<package>\n";
			serviceContent += "  <name>" + document.getElementById('packageName').value + "</name>\n";
			serviceContent += "  <version>" + document.getElementById('packageVersion').value + "</version>\n";
			serviceContent += "  <description>" + document.getElementById('packageDescription').value + "</description>\n";
			serviceContent += "  <maintainer text=\"" + document.getElementById('packageMaintainertext').value + "\">" + document.getElementById('packageMaintainer').value + "</maintainer>\n";
			serviceContent += "  <license>" + document.getElementById('packageLicense').value + "</license>\n";
			serviceContent += "  <url type=\"" + document.getElementById('packageURLType').value + "\">" + document.getElementById('packageURL').value + "</url>\n";	
			serviceContent += "  <author>" + document.getElementById('packageAuthor').value + "</author>\n";
			serviceContent += "  <buildtool_depend>" + document.getElementById('packageBuildtoolDepend').value + "</buildtool_depend>\n";
			serviceContent += "  <run_depend>" + document.getElementById('packageRunDepend').value + "</run_depend>\n";
			serviceContent += "  <export>\n";
			serviceContent += "    <concert_service>" + document.getElementById('packageExport').value + "</concert_service>\n";
			serviceContent += "  </export>\n";
			serviceContent += "</package>\n";
			break;
		case '2': 
			fileName = "CMakeLists.txt"; 
			serviceContent += "cmake_minimum_required(" + document.getElementById('cmakeVersion').value + ")\n";
			serviceContent += "project(" + document.getElementById('cmakeProject').value + ")\n";
			serviceContent += "find_package(" + document.getElementById('cmakeFindPkg').value + ")\n";
			serviceContent += document.getElementById('cmakeCatkinPkg').value + "\n";
			break;
		case '3': 			
			fileName = "solution.service"; 
			serviceContent += "name: " + document.getElementById('serviceName').value + "\n";
			serviceContent += "description: " + document.getElementById('serviceDescription').value + "\n";
			serviceContent += "author: " + document.getElementById('serviceAuthor').value + "\n";
			serviceContent += "priority: " + document.getElementById('servicePriority').value + "\n";
			serviceContent += "launcher_type: " + document.getElementById('serviceLauncherType').value + "\n";
			serviceContent += "launcher: " + document.getElementById('serviceLauncher').value + "\n";
			serviceContent += "icon: " + document.getElementById('serviceIcon').value + "\n";
			serviceContent += "interactions: " + document.getElementById('serviceInteractions').value + "\n";
			serviceContent += "parameters: " + document.getElementById('serviceParmeters').value + "\n";
			break;
		case '4': 
			fileName = "solution.launch"; 
			serviceContent += "<launch>\n";
			serviceContent += "  <node name=\"" + document.getElementById('launchNodeName').value + "\" pkg=\"" + document.getElementById('launchNodePkg').value + "\" type=\"" + document.getElementById("launchNodeType").value + "\">\n";
			serviceContent += "    <param name=\"" + document.getElementById('launchParamName').value + "\" value=\"" + document.getElementById('launchParamValue').value + "\"/>\n";
			serviceContent += "  </node>\n";
			serviceContent += "  <include file=\"" + document.getElementById('launchIncludeFile').value + "\">\n";
			serviceContent += "    <arg name=\"" + document.getElementById('launchArgName').value + "\" value=\"" + document.getElementById('launchArgValue').value + "\"/>\n";
			serviceContent += "  </include>\n";
			serviceContent += "</launch>\n";
			break;
	};	

	console.log(serviceContent); //ok

	var cmd = "ModifyFile"; 
	var content = Base64.encode(serviceContent); 
	var message = {cmd : cmd, solution : solutionName, file : fileName, content : content};
		
	if (solutionName != "")
	{
		socket.send(message); //message send

		//message receive
		socket.on('message', function(data) {
			console.log(data.result);			
			return;
		});
	}
}
