/*!
 * service_schedule.js v0.1.0
 *
 * Copyright 2015 shkwak
 * Licensed under the BSD license
 */

//Service Scheduler Variable, 2015-01-20(Tue)_shkwak
var serviceName = "", serviceStart = "", serviceEnd = "", isSchduling = false;

function ServiceSchduling()
{	//2015-01-20(Tue)_shkwak
	if (document.getElementById('serviceName').value != "")
	{		
		serviceName = document.getElementById('serviceName').value;
	}
	if (document.getElementById('serviceStart').value != "")
	{
		serviceStart = document.getElementById('serviceStart').value;
	}
	if (document.getElementById('serviceEnd').value != "")
	{
		serviceEnd = document.getElementById('serviceEnd').value;
	}

	document.getElementById('serviceName').value = "";

	if (serviceName != "")
	{
		isSchduling = true;
	}
	else
	{
		isSchduling = false;
	}
}

var SetServiceSchdule = function(title, start, end)
{	//서비스 스케줄 등록
	var cmd = "SetServiceSchdule";
	var message = {cmd : cmd, title : title, start : start, end : end};
	console.log('SetServiceSchdule');

	//message send
	socket.send(message); 	
}

var DelServiceSchdule = function()
{	//서비스 스케줄 삭제
	var cmd = "DelServiceSchdule";
	var message = {cmd : cmd};
	console.log('DelServiceSchdule');

	//message send
	socket.send(message); 	
}