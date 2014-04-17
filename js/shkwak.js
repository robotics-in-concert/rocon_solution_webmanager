var cmake_str = ["############################################################################\n# CMake\n############################################################################\n\ncmake_minimum_required(VERSION 2.8.3)\nproject(", ")\n\n############################################################################\n# Catkin\n############################################################################\n\nfind_package(catkin REQUIRED)\ncatkin_package()"];
var launch_str = ["<launch>\n    <include file=\"$(find concert_master)/", "\">\n        <arg name=\"concert_name\" value=\"", "\">\n        <arg name=\"services\" value=\"", "\">\n        <arg name=\"conductor_auto_invite\" value=\"", "\">\n        <arg name=\"conductor_local_clients_only\" value=\"", "\">\n        <arg name=\"auto_enable_services\" value=\"", "\">\n        <arg name=\"scheduler_type\" value=\"", "\"/>\n    </include>\n</launch>"];
var package_str = ["<package>\n  <name>", "</name>\n  <version>0.5.6</version>\n  <description>\n    ", "\n  </description>\n  <maintainer email=\"", "\">", "</maintainer>\n  <license>BSD</license>\n  <author>", "</author>\n\n  <buildtool_depend>catkin</buildtool_depend>\n\n  <run_depend>", "</run_depend>\n</package>", "", "", "", "", "", ""];
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
			alert('in');
			var value = [document.getElementById('resource1').value, document.getElementById('resource2').value, document.getElementById('override').value, document.getElementById('override_value').value];
			var str = services_str[0] + value[0] + "/" + value[1] + services_str[1]  + "    " + value[2] + ": " + value[3]; 
			document.all.box_result.value = str;
			break;
		case "package": //value : 6 + a개
			var value = [document.getElementById('packagename').value, document.getElementById('description').value, document.getElementById('email').value, document.getElementById('maintainer').value, document.getElementById('author').value, document.getElementById('run_depend').value];
			var str = package_str[0] + value[0] + package_str[1] + value[1] + package_str[2] + value[2] + package_str[3] + value[3] + package_str[4] + value[4] + package_str[5] + value[5] + package_str[6]; 
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

