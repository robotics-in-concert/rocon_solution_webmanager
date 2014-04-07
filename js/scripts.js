function pageTitleChange(pageID)
{
	var upageTitle = getElementById('pageTitle');
	alert("in1");
	switch(pageID){
		case "P1":
			upageTitle.innerHTML="Solution Configuration Manager";
			break;
		case "P2":
			upageTitle.innerHTML="Data Visualizer";
			break;
		case "P3":
			upageTitle.innerHTML="Service Scheduler";
			break;
	}
}

function BreadcrumbChange(BreadcrumbID)
{
	var BreadcrumbTitle = getElementById("BreadcrumbTitle");
	alert("in2");
	switch(BreadcrumbID){
		case "P1":
			BreadcrumbTitle.innerHTML="Solution Configuration Manager";
			break;
		case "P2":
			BreadcrumbTitle.innerHTML="Data Visualizer";
			break;
		case "P3":
			BreadcrumbTitle.innerHTML="Service Scheduler";
			break;
	}
}

function TestAlert()
{
	alert("in in");
}

function titleChange(pageID)
{
	var BreadcrumbTitle = getElementById("BreadcrumbTitle");
	var upageTitle = getElementById("pageTitle");
	
	alert("in");

	switch(pageID){
		case "P1":
			BreadcrumbTitle.innerHTML="Solution Configuration Manager";
			upageTitle.innerHTML="Solution Configuration Manager";
			break;
		case "P2":
			getElementById("subframe").src="Webgraphviz.html";
			BreadcrumbTitle.innerHTML="Data Visualizer";
			upageTitle.innerHTML="Data Visualizer";
			break;
		case "P3":
			BreadcrumbTitle.innerHTML="Service Scheduler";
			upageTitle.innerHTML="Service Scheduler";
			break;
	}
}
