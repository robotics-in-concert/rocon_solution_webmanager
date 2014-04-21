var data_type = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]; //data[i].name 의 type_2014-04-14_shkwak, //솔루션 개수가 많아지면 배열 개수 문제가 발생할 듯 - 개선필요
var data_type_sub = ["", "", "", "", "", "", "", "", "", ""]; 

var cmake_str = ["############################################################################\n# CMake\n############################################################################\n\ncmake_minimum_required(VERSION 2.8.3)\nproject(", ")\n\n############################################################################\n# Catkin\n############################################################################\n\nfind_package(catkin REQUIRED)\ncatkin_package()"];
var launch_str = ["<launch>\n    <include file=\"$(find concert_master)/", "\">\n        <arg name=\"concert_name\" value=\"", "\">\n        <arg name=\"services\" value=\"", "\">\n        <arg name=\"conductor_auto_invite\" value=\"", "\">\n        <arg name=\"conductor_local_clients_only\" value=\"", "\">\n        <arg name=\"auto_enable_services\" value=\"", "\">\n        <arg name=\"scheduler_type\" value=\"", "\"/>\n    </include>\n</launch>"];
var package_str = ["<package>\n  <name>", "</name>\n  <version>", "</version>\n  <description>\n    ", "\n  </description>\n  <maintainer email=\"", "\">", "</maintainer>\n  <license>", "</license>\n  <author>", "</author>\n\n  <buildtool_depend>catkin</buildtool_depend>\n\n  <run_depend>", "</run_depend>\n</package>", "", "", "", "", "", ""];
var services_str = ["- resource: ", "\n  override: \n", "", "", "", "", ""];

function ViewSource()
{ 
	var fileName = document.getElementById('selectbox_sub').value;
	var str = ["launch", "services", "package", "CMakeLists"];

	for (var i=0;i<str.length;i++)
	{	
		var result = fileName.indexOf(str[i]);
	
		if (result > -1)
		{	
			Edit_template(str[i]);
		}	
	}	
}

function Edit_template(file)
{	
	switch(file)
	{
		case "launch": //value : 7개
			var value = [document.getElementById('includefile').value, document.getElementById('concert_name').value, document.getElementById('services').value, document.getElementById('conductor_auto_invite').value, document.getElementById('conductor_local_clients_only').value, document.getElementById('auto_enable_services').value, document.getElementById('scheduler_type').value];
			var str = launch_str[0] + value[0] + launch_str[1] + value[1] + launch_str[2] + value[2] + launch_str[3] + value[3] + launch_str[4] + value[4] + launch_str[5] + value[5] + launch_str[6] + value[6] + launch_str[7]; 
			document.all.box_result.value = str;
			break;
		case "services": //value : 4 + a개			
			var value = [document.getElementById('resource1').value, document.getElementById('resource2').value, document.getElementById('override').value, document.getElementById('override_value').value];
			var str = services_str[0] + value[0] + "/" + value[1] + services_str[1]  + "    " + value[2] + ": " + value[3]; 
			document.all.box_result.value = str;
			break;
		case "package": //value : 6 + a개
			var value = [document.getElementById('packagename').value, document.getElementById('version').value, document.getElementById('description').value, document.getElementById('email').value, document.getElementById('maintainer').value, document.getElementById('license').value, document.getElementById('author').value, document.getElementById('run_depend').value];
			var str = package_str[0] + value[0] + package_str[1] + value[1] + package_str[2] + value[2] + package_str[3] + value[3] + package_str[4] + value[4] + package_str[5] + value[5] + package_str[6] + value[6] + package_str[7] + value[7] + package_str[8]; 
			document.all.box_result.value = str;
			break;
		case "CMakeLists": //value : 1개
			var value = document.getElementById('projectName').value;	
			var str = cmake_str[0] + value + cmake_str[1];
			document.all.box_result.value = str;
			break;
		default:
			alert('Warning : 선택된 파일이 없습니다.');
			break;
	}
}

function ShowHide(option)
{
	var gitUserRepo = document.getElementById('gitUserRepo');	

	switch(option)
	{
		case "URL":
			if (ShowHide_status)
			{
				gitUserRepo.style.display = 'none';
				ShowHide_status = false;
			}	
			else
			{
				gitUserRepo.style.display = 'inline';
				ShowHide_status = true;
			}	
			break;
		default:
			var gitInfo = document.getElementById('gitInfo');
		
			if (ShowHide_status)
			{
				gitUserRepo.style.display = 'none';
				gitInfo.style.display = 'inline';
				ShowHide_status = false;
			}	
			else
			{
				gitInfo.style.display = 'none';
				gitUserRepo.style.display = 'inline';
				ShowHide_status = true;
			}	
			break;
	}
}

function View_dotgraph(page)
{	//2014-04-17_shkwak
	switch(page)
	{
		case "real":
			document.getElementById('Sample_dotgraph').style.display = 'none';
			document.getElementById('Real_dotgraph').style.display = 'block';
			break;
		case "sample":
			document.getElementById('Sample_dotgraph').style.display = 'block';
			document.getElementById('Real_dotgraph').style.display = 'none';
			break;
	}		
}

function changeList()
{
	var listValue = document.getElementById('serviceList').value;
	
	if (listValue == "사용자 입력")
	{
		//alert("사용자 입력");
		document.getElementById('serviceName').style.display='inline';
		document.getElementById('serviceName').value = "";
		//document.getElementById('serviceName').placeholder = "";
	}
	else
	{
		document.getElementById('serviceName').style.display='none';
		document.getElementById('serviceName').value = listValue;
	}
}

function pageChange(fileTag)
{
	var page1 = document.getElementById('launchfile');
	var page2 = document.getElementById('servicefile');
	var page3 = document.getElementById('packagefile');
	var page4 = document.getElementById('CMakeListsfile');

	switch (fileTag)
	{
		case "launch":
			page1.style.display='block';
			page2.style.display='none';
			page3.style.display='none';
			page4.style.display='none';
			break;	
	
		case "service":
			page1.style.display='none';
			page2.style.display='block';
			page3.style.display='none';
			page4.style.display='none';
			break;	
	
		case "package":
			page1.style.display='none';
			page2.style.display='none';
			page3.style.display='block';
			page4.style.display='none';
			break;	
	
		case "CMakeLists":
			page1.style.display='none';
			page2.style.display='none';
			page3.style.display='none';
			page4.style.display='block';
			break;		
	}
}

var pre_serviceName = "";
var pre_OnTime_date = "";
var pre_OnTime_time = "";
var pre_OffTime_date = "";
var pre_OffTime_time = "";

var li_count = 0;

var timer = new Array();
var setServiceName = new Array();

function addSchdule()
{	//2014-04-17_shkwak, 2014-04-21_re_timer setting
	var serviceName = document.getElementById('serviceList').value;
	//alert(serviceName);	

	if (serviceName == "" || serviceName == "-----------")
	{
		alert('서비스명을 선택해 주세요.');
	}
	else
	{
		if (serviceName == "사용자 입력")
		{
			serviceName = document.getElementById('serviceName').value;
		}
		
		var OnTime_date = document.getElementById('serviceOnDate').value;
		var OnTime_time = document.getElementById('serviceOnTime').value;
		var OffTime_date = document.getElementById('serviceOffDate').value;
		var OffTime_time = document.getElementById('serviceOffTime').value;

		if (OnTime_date == "" || OnTime_time == "" || OffTime_date == "" || OffTime_time == "")
		{
			alert('서비스 실행 날짜와 시간을 올바르게 입력해 주세요!');
		}
		else
		{
			if (pre_serviceName == serviceName && pre_OnTime_date == OnTime_date && pre_OnTime_time == OnTime_time && pre_OffTime_date == OffTime_date && pre_OffTime_time == OffTime_time)
			{   //직전 스케줄과 비교 밖에 되지 않음, 전체 스케줄과 비교하게 수정 필요!
				alert('이미 등록된 Schedule 입니다!');
			}
			else
			{
				var OnTime = OnTime_date + " " + OnTime_time;
				var OffTime = OffTime_date + " " + OffTime_time;
				/*--현재 날짜, 시간--*/
				var today = new Date();	
				var NowDateTime = leadingZeros(today.getFullYear(),4) + "-" + leadingZeros(today.getMonth() + 1,2) + "-" + leadingZeros(today.getDate(),2) + " " + leadingZeros(today.getHours(),2) + ":" + leadingZeros(today.getMinutes(),2)
				
				if (OnTime >= OffTime)
				{
					alert('ON Time이 OFF Time과 같은시간 이거나 나중시간입니다. \n다시 입력해 주세요.');
				}
				else if (OnTime < NowDateTime || OffTime < NowDateTime)
				{
					alert('설정한 시간이 현재시간보다 이전시간입니다. \n다시 입력해 주세요.');
				}
				else
				{
					var ul = document.getElementById('result_ul');
	 
					var new_li = document.createElement('li');
					//new_li.id = "li_" + li_count; //ok
					new_li.setAttribute('id', 'li' + li_count); //ok			
					//new_li.value = "test li"; //x
					new_li.innerHTML = serviceName + ", " + OnTime + " ~ " + OffTime + "&nbsp; <input type='image' src='./img/icon_minus_2.png' onclick='deleteService(this.id);' style='vertical-align:middle;' id='input_li" + li_count +"'/>";
					ul.appendChild(new_li);			
	
					/*--등록 스케줄 저장--*/ //음. 이건 직전꺼와 같은지 밖에 비교가 안되는군. 개선 필요~!!_2014-04-17
					pre_serviceName = serviceName;
					pre_OnTime_date = OnTime_date;
					pre_OnTime_time = OnTime_time;
					pre_OffTime_date = OffTime_date;
					pre_OffTime_time = OffTime_time;
	
					/*--Timer create--*/
					setOnTime = OnTime;
					setOffTime = OffTime;			
					schedule_id = 'li' + li_count;
					setServiceName[schedule_id] = serviceName;
					//var timecheck = new nowTimeCheck(schedule_id);
					timer[schedule_id] = setTimeout('nowTimeCheck(schedule_id)',1000); //10초에 한번
					console.log("timer[" + schedule_id + "] is created."); //timer['li' + li_count] == 1?? why?
			
					/*--증감자 처리--*/
					li_count++;
				}
			}
		}
	}
}

function nowTimeCheck(id)
{
	//formatting yyyy-MM-dd hh:mm:ss
	var today = new Date();	
	
	var NowTime = leadingZeros(today.getFullYear(),4) + "-" + leadingZeros(today.getMonth() + 1,2) + "-" + leadingZeros(today.getDate(),2) + " " + leadingZeros(today.getHours(),2) + ":" + leadingZeros(today.getMinutes(),2);	
	var NowTime_sec = leadingZeros(today.getFullYear(),4) + "-" + leadingZeros(today.getMonth() + 1,2) + "-" + leadingZeros(today.getDate(),2) + " " + leadingZeros(today.getHours(),2) + ":" + leadingZeros(today.getMinutes(),2) + ":" + leadingZeros(today.getSeconds(),2);	

	console.log("NowTime : " + NowTime_sec + ", setOnTime : " + setOnTime + ", setOffTime : " + setOffTime + ", id : " + id + ", serviceName : " + setServiceName[id]); 
	//console.log("id : " + id + ", setServiceName : " + setServiceName[id]); 

	if (setOnCmdSended == false)
	{
		if (NowTime == setOnTime)
		{
			callService(setServiceName[id], 'true');
			console.log("ServiceCall - enable");		
			setOnCmdSended = true;
		}
	}
	
	schedule_id = id;
	timer[id] = setTimeout('nowTimeCheck(schedule_id)',5000); //10초에 한번

	if (NowTime == setOffTime)
	{
		callService(setServiceName[id], 'false');
		console.log("ServiceCall - disable");
		clearTimeout(timer[id]);
		console.log("timer[" + id + "] is deleted.");
	}	
}

function deleteService(id)
{
	//var li_id = id.substring(6,10); //li0 ; ok
	var li_id2 = id.split('_'); //li0 ; ok - 채택!!

	//alert(li_id2[1]);
	var ul = document.getElementById('result_ul');
	var li = document.getElementById(li_id2[1]);
	ul.removeChild(li);
	console.log(li_id2[1] + " is deleted.");

	/*--Timer del--*/
	schedule_id = li_id2[1];
	clearTimeout(timer[schedule_id]);
	console.log("timer[" + schedule_id + "] is deleted.");
}


/*--Template Editor--*/
function changeList2()
{
	var run_depend = document.getElementById('run_depend').value;
	
	if (run_depend == "사용자 입력")
	{
		//alert("사용자 입력");
		document.getElementById('user_depend').style.display='inline';
		document.getElementById('user_depend').value = "";
		//document.getElementById('serviceName').placeholder = "";
	}
	else
	{
		document.getElementById('user_depend').style.display='none';
		//document.getElementById('user_depend').value = run_depend;
	}
}

function addDepend()
{	//2014-04-17_shkwak
	var depend_value = document.getElementById('run_depend').value;
	//alert(depend_value + ", " + depend_pre_check);
	//alert(pre_depend_value[0] + ", " + pre_depend_value[1] + ", " + pre_depend_value[2] + ", " + pre_depend_value[3]);
	if (depend_value == "사용자 입력")
	{
		depend_value = document.getElementById('user_depend').value;
	}

	if (depend_value == "")
	{
		alert('run_depend가 올바르지 않습니다.');
	}
	else
	{
		for (var i=0;i<pre_depend_value.length;i++)
		{
			if (pre_depend_value[i] == depend_value)
			{
				//alert(i + ", " + pre_depend_value[i] + ", " + depend_value);
				depend_pre_check = true;
				break;
			}
		}		

		if (depend_pre_check)
		{
			alert('이미 등록된 run_depend 입니다!');
			depend_pre_check = false;
		}
		else
		{			
			var ul = document.getElementById('result_ul');

			var new_li = document.createElement('li');
			//new_li.id = "li_" + depend_count; //ok
			new_li.setAttribute('id', 'li' + depend_count); //ok			
			//new_li.value = "test li"; //x
			new_li.innerHTML = "&nbsp; run_depend &nbsp;: &nbsp;" + depend_value + "&nbsp; <input type='image' src='./img/icon_minus_2.png' onclick='delDepend(this.id);' style='vertical-align:middle;' id='input&li" + depend_count + "&" + depend_value + "'/>";
			ul.appendChild(new_li);			

			/*--등록 저장--*/ //음. 이건 직전꺼와 같은지 밖에 비교가 안되는군. 개선 필요~!!_2014-04-17
			pre_depend_value[depend_count] = depend_value;
			depend_pre_check = false;
			//alert(depend_count + ", " + pre_depend_value[depend_count] + ", " + depend_value);
			depend_count++;
			
			//var ul = document.getElementById('result_ul');
			//alert(ul);
		}
	}
}

function delDepend(id)
{
	//var li_id = id.substring(6,10); //li0 ; ok
	var li_id2 = id.split('&'); //li0 ; ok - 채택!!

	//alert(li_id2[1]);
	var ul = document.getElementById('result_ul');
	var li = document.getElementById(li_id2[1]);	
	//alert(li_id2[2]);
	ul.removeChild(li);

	/*--delete pre_depend_value--*/
	for (var i=0;i<pre_depend_value.length;i++)
	{
		if (pre_depend_value[i] == li_id2[2])
		{	
			//alert(i + ", " + pre_depend_value[i] + ", " + li_id2[2]);
			pre_depend_value[i] = "";
			break;
		}
	}
}
