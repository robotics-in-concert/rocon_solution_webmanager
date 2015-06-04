/*!
 * script.js v0.1.0
 *
 * Copyright 2015 shkwak
 * Licensed under the BSD license
 */

function carouselChange(page)
{	//Template Editor 페이지, 구성파일 전환 시 동작
	//console.log(page);
	switch (page)
	{
		case 'p':			
			document.all.myCarousel_p.style.display = 'block';
			document.all.myCarousel_c.style.display = 'none';
			document.all.myCarousel_s.style.display = 'none';
			document.all.myCarousel_l.style.display = 'none';
			document.all.PageNum.value = '1';
			break;
		case 'c':			
			document.all.myCarousel_p.style.display = 'none';
			document.all.myCarousel_c.style.display = 'block';
			document.all.myCarousel_s.style.display = 'none';
			document.all.myCarousel_l.style.display = 'none';
			document.all.PageNum.value = '2';
			break;
		case 's':			
			document.all.myCarousel_p.style.display = 'none';
			document.all.myCarousel_c.style.display = 'none';
			document.all.myCarousel_s.style.display = 'block';
			document.all.myCarousel_l.style.display = 'none';
			document.all.PageNum.value = '3';
			break;
		case 'l':			
			document.all.myCarousel_p.style.display = 'none';
			document.all.myCarousel_c.style.display = 'none';
			document.all.myCarousel_s.style.display = 'none';
			document.all.myCarousel_l.style.display = 'block';
			document.all.PageNum.value = '4';
			break;
	}
}

var win = null;
function NewWindow(mypage, myname, w, h, scroll, pos)
{	//modal window, ex)NewWindow('#','myname','700','500','no','center');
	if(pos=="random")
	{
		LeftPosition=(screen.width)?Math.floor(Math.random()*((screen.width-w)-75)):100;
		TopPosition=(screen.height)?Math.floor(Math.random()*((screen.height-h)-75)):100;
	}
    if(pos=="center")
	{
        LeftPosition=(screen.width)?(screen.width-w)/2:100;
        TopPosition=(screen.height)?(screen.height-h)/2:100;
	}
	else if((pos!="center" && pos!="random") || pos==null)
	{
        LeftPosition=20;
        TopPosition=20
	}

    settings = 'height=' + h + ', width=' + w + ', top=' + TopPosition + ', left=' + LeftPosition + ', scrollbars=' + scroll + ', resizable=no,  toolbar=no, menubar=no';
    win = window.open(mypage, myname, settings);
    if(win.focus){win.focus();}
}

var isResized = false;
var nowPage = 'Page1';
var viewTimer = "";

function resizeHeight(Title)
{	//Solution Manager <-> Data Visualizer 전환 시! window height 값 조정
	var imsiHeight1 = ($(window).height() - 80) / 1.5;
	var imsiHeight2 = ($(window).height() - 80) / 6;
	var titleTop = 74 / 70;

	document.all.btn_back.style.display = 'block';
	isResized = true;
	document.all.Title_N0_1.style.display='none';
	document.all.Title_N0_2.style.display='none';

	if (Title == 'Page1')
	{			
		$("#div_no1").height('74');
		document.getElementById('div_no2').style.display = 'none';
		document.getElementById('div_content1').style.display = 'block';
		document.getElementById('div_content2').style.display = 'none';
		document.getElementById('Title_N1_1').style.display = 'none';		
		
		$("#Title_N1").css('top', titleTop);
		$("#iframe_N1").height(imsiHeight1*0.9);		
		//$("#iframe_N1_cal").height(imsiHeight1*2); //calendar		
		$("#Title_N1").css('cursor', 'default');

		nowPage = 'Page1';
	}
	else
	{		
		$("#div_no2").height('74');
		document.getElementById('div_no1').style.display = 'none';
		document.getElementById('div_content2').style.display = 'block';
		document.getElementById('div_content1').style.display = 'none';

		$("#Title_N2").css('top', titleTop);
		$("#iframe_N1").height(imsiHeight1*0.7);
		$("#Title_N2").css('cursor', 'default');

		nowPage = 'Page2';

		// Connecting to ROS
		ConnectROS(); //service list 정보의 실시간 상태를 보여주기 위해, 개선 필요 
		viewTimer = setInterval('GetServiceList()',1000);
	}
}

function setDivHeight()
{	//Main UI height seperation
	if (!isResized)
	{
		var imsiHeight = (($(window).height() - 80) / 2) + 3; //
		console.log('Sub Layer Height : ' + imsiHeight);
		//document.getElementById("div_no1").height = imsiHeight; //x
		$("#div_no1").height(imsiHeight);
		$("#div_no2").height(imsiHeight);

		var titleTop = imsiHeight / 2.5;
		var titleTop_sub = titleTop + 20;
		//console.log('titleTop : ' + titleTop + ", titleTop_sub : " + titleTop_sub);
		$("#Title_N1").css('top', titleTop); //$("#Title_N1").css('vertical-align', 'middle'); //x
		$("#Title_N1_1").css('top', titleTop_sub);
		$("#Title_N2").css('top', titleTop);
	}	
}

function resizeView()
{	//2014-12-26(Fri)_shkwak, no use!
	console.log("window_size : " + $(window).width() + ", " + $(window).height());
	var windowWidth = ($(window).width() / 2) - 2;
	var windowHeight = $(window).height() / 1.5;

	$("#myPublisher").width(windowWidth);
	$("#myPublisher").height(windowHeight);
	$("#mySubscriberElement").width(windowWidth);
	$("#mySubscriberElement").height(windowHeight);	
}

function getInfo()
{	//imsi for test, 2014-10-20	; 현재 window의 width, height 정보를 가져온다. no use!
	var imsiValue = ($(window).height() - 74) / 2;
	alert($(window).width() + ", " + imsiValue + ", " + screen.width + ", " + screen.height);
}

function onMouseEvent(status)
{	//메인 화면에서 마이스 커서 오버 시, 항목 정보 표시
	if (isResized == false)
	{	//isResized == false ; 메인화면 상태
		switch (status)
		{
			case 'Over1':
				document.all.Title_N0_1.innerHTML = "ROCON 솔루션을 생성하고 구성파일을 편집할 수 있습니다.";
				document.all.Title_N0_1.style.display='block';
				break;
			case 'Over2':
				document.all.Title_N0_2.style.display='block';
				break;
			case 'Over1_sub1':
				document.all.Title_N0_1.innerHTML = "ROCON Template 에디터 도구가 포함되어 있습니다.";
				document.all.Title_N0_1.style.display='block';					
				break;
			case 'Over1_sub2':
				document.all.Title_N0_1.innerHTML = "ROCON Service 스케줄링 도구가 포함되어 있습니다.";
				document.all.Title_N0_1.style.display='block';					
				break;
			default :
				document.all.Title_N0_1.style.display='none';
				document.all.Title_N0_2.style.display='none';
				break;
		}
	}
	else
	{	//Title이 접혀진 상태
		if (status == 'Over_back')
		{
			console.log('nowPage : ' + nowPage);
			if (nowPage == 'Page2')	$("#group_back").css('color', '#4D4E53');
			else $("#group_back").css('color', '#FFFFFF');

			document.all.group_back.style.display = 'block';
		}
		else
		{
			document.all.group_back.style.display = 'none';
		}
	}
}

String.prototype.replaceAll = function() 
{	//Javascript에서 replaceAll 사용하기
    var a = arguments, length = a.length;
     
    if ( length == 0 ) {
        return this;
    }
     
    var regExp = new RegExp( a[0], "g");
     
    if ( length == 1 ) {
         
        return this.replace(regExp, "");
    } else {
        return this.replace(regExp, a[1]);
    }
    return this;
}

String.prototype.trim = function()
{   //Javascript에서 trim 사용하기 
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

function sha1_test()
{	//2015-05-14(Thu)_shkwak, sha1 hash 생성 코드
	var str = 'The quick brown fox jumps over the lazy dog.'; //408d94384216f890ff7a0c3528e8bed1e0b01621
	console.log(Sha1.hash(str));							  //408d94384216f890ff7a0c3528e8bed1e0b01621
}

function onPageEnter()
{	//2015-01-07(Wed)_shkwak, 페이지 URL 파싱, //콘솔창의 로그 내용 지움 ; console.clear();, 2015-05-06(Wed)_shkwak
	/*	var result = "Not found", tmp = [];
    location.search
			.substr(1)
			.split("&")
			.forEach(function (item){
				tmp = item.split("=");
				//if (tmp[0] === val)
		        //result = decodeURIComponent(tmp[1]);
                if(tmp[0] == "number") {
					var number = tmp[1];
					//customAlert("calling " + number, 1000);
					//callToRobot(number);
					//sessionId = getSessionID(number);
				}
		console.log("name: " + tmp[0]);
        console.log("value: " + tmp[1]);
    });					
	*/	//return result;
	var url = location.href; //result -> http://localhost:8080/ or http://192.168.0.129:8080/ - OK 
	//location.search : url에서 ? 이하의 내용을 가져옴
	console.log("URL : " + url); //URL : http://localhost:8080/	

	//자바스크립트 URL 가져오기, 2015-04-29(Wed)_shkwak
	var tmp = window.location; //location 값을 가져옴 
	tmp = String(tmp).split('/'); 
	console.log(tmp[0] + ", " + tmp[1] + ", " + tmp[2] + ", " + tmp[3]); //http:, , localhost:8080, 

	tmp = document.location.host; //www.bpnr.co.kr:50000 
	//console.log(tmp); //localhost:8080 - GOOD
	tmp = String(tmp).split(':'); 
	console.log(tmp[0] + ", " + tmp[1]); //localhost, 8080
	
	///////////////////////////////////////////////////////
	// Setting - 설정값 불러와서 DP, 2015-05-20(Wed)_shkwak
	///////////////////////////////////////////////////////
	SettingsValueRead();	

	//콘솔창의 로그 내용 지움, 2015-05-06(Wed)_shkwak
	console.clear(); 
}

function pageClose()
{	//페이지 colse 시, localStorage 데이터 처리x, 2014-04-11_shkwak
	//localStorage.clear();
	//localStorage.setItem("access_token", "page closeed!"); 
}

function sweetalert()
{	//2014-10-29_shkwak
	//====... and by passing a parameter, you can execute something else for "Cancel".====
	swal({   
		title: "Are you sure?",   
		text: "You will not be able to recover this imaginary file!",   
		type: "warning",   
		showCancelButton: true,   
		confirmButtonColor: "#DD6B55",   
		confirmButtonText: "Yes, delete it!",   
		cancelButtonText: "No, cancel plx!",   
		closeOnConfirm: false,   
		closeOnCancel: false 
		}, 
		function(isConfirm){   
			if (isConfirm) {     
				swal("Deleted!", "Your imaginary file has been deleted.", "success");   
			} else {     
				swal("Canceled", "Your imaginary file is safe :)", "error");   
			} 
		}
	);

	//====A title with a text under====
	//swal("Here's a message!", "It's pretty, isn't it?")		

	//====A success message!==== //warning", "error", "success" and "info".
	//swal("Good job!", "You clicked the button!", "success")	

	//====A message with auto close timer====
	//swal({   title: "Auto close alert!",   text: "I will close in 2 seconds.",   timer: 2000 }); 

	//====A warning message, with a function attached to the "Confirm"-button...====
	//swal({   title: "Are you sure?",   text: "You will not be able to recover this imaginary file!",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Yes, delete it!",   closeOnConfirm: false }, function(){   swal("Deleted!", "Your imaginary file has been deleted.", "success"); });

	//====A message with a custom icon====
	//swal({   title: "Sweet!",   text: "Here's a custom image.",   imageUrl: "images/thumbs-up.jpg" });
}

function ReadValue()
{	//localStorage 값을 읽어온다. ex)access_token, for test, no use!
	var item = localStorage.getItem("access_token");
	alert(item);
}

function AccessUserInfo()
{	//access_token, aceess_user 정보를 로그인 시, 표시한다, no use!
	/*--access_token--*/
	var access_token = localStorage.getItem("access_token");
	var access_user = localStorage.getItem("access_user");
	
	if (access_token == null) document.getElementById('accessUserInfo').value = "";
	else document.getElementById('accessUserInfo').value = "WELCOME, " + access_user;
}

//========================================================================================
//== GitHub API 
//========================================================================================
function PR_base_head_change(value)
{	//Pull Request - base, head select option, 2015-05-19(Tue)_shkwak
	if (value == "base_others")
	{
		document.getElementById('base_repo').style.display = 'none';
		document.getElementById('base_repo2').style.display = 'inline-block';
		document.getElementById('base_repo2_icon').style.display = 'inline-block';
	}

	if (value == "head_others")	
	{
		document.getElementById('head_repo').style.display = 'none';
		document.getElementById('head_repo2').style.display = 'inline-block';
		document.getElementById('head_repo2_icon').style.display = 'inline-block';
	}
	
	if (value == "base_repo2_cancel")
	{
		document.getElementById('base_repo').style.display = 'inline-block';
		document.getElementById('base_repo').selectedIndex = 0;
		document.getElementById('base_repo2').style.display = 'none';
		document.getElementById('base_repo2_icon').style.display = 'none';
	}

	if (value == "head_repo2_cancel")	
	{
		document.getElementById('head_repo').style.display = 'inline-block';
		document.getElementById('head_repo').selectedIndex = 0;
		document.getElementById('head_repo2').style.display = 'none';
		document.getElementById('head_repo2_icon').style.display = 'none';
	}	
}

function show_createPullRequest44()
{	//2015-05-19(Tue)_shkwak, create pull request 하기 전에 parameters 확인!
	var title = document.getElementById('PR_title').value;
	var body = document.getElementById('PR_body').value;
	
	if (document.getElementById('base_repo').value == "base_others")
	{
		var base = document.getElementById('base_repo2').value;
	}
	else
	{
		var base = document.getElementById('base_repo').value;
	}
	
	if (document.getElementById('head_repo').value == "head_others")
	{
		var head = document.getElementById('head_repo2').value;
	}
	else
	{
		var head = document.getElementById('head_repo').value;
	}

	if (title == "" || body == "" || base == "" || head == "")
	{
		//alert('Please check input values!');
		SweetAlert_Group('basicA', 'Please check input values!');
	}
	else
	{
		repo_createPullRequest44(title, body, base, head); //실제 동작 코드
		console.log('title : ' + title + ', body : ' + body + ', base : ' + base + ', head : ' + head);
	}
}


//========================================================================================
//== Settings value
//========================================================================================
function SettingsValueSave_SweetAlert()
{	//2015-05-20(Wed)_shkwak, Solutin Manager Settings modal - SweetAlert
	var git_username   = document.getElementById('git_username').value;
	var git_password   = document.getElementById('git_password').value;
	var service_owner  = document.getElementById('service_owner').value;
	var service_repo   = document.getElementById('service_repo').value;
	var solution_owner = document.getElementById('solution_owner').value;
	var solution_repo  = document.getElementById('solution_repo').value;

	if (git_username == "" || git_password == "" || service_owner == "" || service_repo == "" || service_branch == "" || solution_owner == "" || solution_repo == "")
	{
		SweetAlert_Group('no');
	}
	else
	{
		SweetAlert_Group('yes');		
	}
}

function SettingsValueSave()
{	//2015-05-20(Wed)_shkwak, Solutin Manager Settings modal - 설정값 저장 (localStorage)
	var git_username   = document.getElementById('git_username').value;
	var git_password   = document.getElementById('git_password').value;
	var service_owner  = document.getElementById('service_owner').value;
	var service_repo   = document.getElementById('service_repo').value;
	var service_branch = document.getElementById('service_branch').value; //add, 2015-06-01(Mon)_shkwak
	var solution_owner = document.getElementById('solution_owner').value;
	var solution_repo  = document.getElementById('solution_repo').value;

	/*--GitHub User Info--*/
	localStorage.setItem("git_username", document.getElementById('git_username').value); 
	localStorage.setItem("git_password", document.getElementById('git_password').value); 
	/*--GitHub Service Repo Info--*/
	localStorage.setItem("service_owner", document.getElementById('service_owner').value);
	localStorage.setItem("service_repo", document.getElementById('service_repo').value);
	localStorage.setItem("service_branch", document.getElementById('service_branch').value); //add
	/*--GitHub Solution Repo Info--*/
	localStorage.setItem("solution_owner", document.getElementById('solution_owner').value); 
	localStorage.setItem("solution_repo", document.getElementById('solution_repo').value);

	console.log('SettingsValueSave() - Saved!');
	console.log('git_username : ' + git_username + '\ngit_password : ' +  '********' + '\nservice_owner : ' +  service_owner 
		+ '\nservice_repo : ' +  service_repo + '\nservice_branch : ' +  service_branch + '\nsolution_owner : ' +  solution_owner + '\nsolution_repo : ' +  solution_repo);
}

function SettingsValueRead()
{	//2015-05-20(Wed)_shkwak, Solutin Manager Settings modal - 설정값 가져오기 (localStorage)
	var git_username   = localStorage.getItem("git_username");
	var git_password   = localStorage.getItem('git_password');
	var service_owner  = localStorage.getItem('service_owner');
	var service_repo   = localStorage.getItem('service_repo');
	var service_branch = localStorage.getItem('service_branch');
	var solution_owner = localStorage.getItem('solution_owner');
	var solution_repo  = localStorage.getItem('solution_repo');

	console.log('SettingsValueRead() - Read!');
	console.log('git_username : ' + git_username + '\ngit_password : ' +  '********' + '\nservice_owner : ' +  service_owner 
		+ '\nservice_repo : ' +  service_repo + '\nservice_branch : ' +  service_branch + '\nsolution_owner : ' +  solution_owner + '\nsolution_repo : ' +  solution_repo);

	// localStorage value DP to Settings UI
	document.getElementById('git_username').value	= git_username;
	document.getElementById('git_password').value	= git_password;
	document.getElementById('service_owner').value	= service_owner;
	document.getElementById('service_repo').value	= service_repo;
	document.getElementById('service_branch').value	= service_branch;
	document.getElementById('solution_owner').value	= solution_owner;
	document.getElementById('solution_repo').value	= solution_repo;
}

function SweetAlert_Group(type, msg, comment, status)
{	//2014-10-29_shkwak, RE ; 2015-05-20(Wed)
	//====... and by passing a parameter, you can execute something else for "Cancel".====
	switch (type)
	{	//SweetAlert URL : http://t4t5.github.io/sweetalert/
		case 'yes':
			swal({   
				title: "Are you sure?",   
				text: "The settings are stored in the localStorage!",   
				type: "warning",   
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "Yes, save it!",   
				cancelButtonText: "No, cancel it!",   
				closeOnConfirm: false,   
				closeOnCancel: false 
				}, 
				function(isConfirm){
					if (isConfirm) {
						SettingsValueSave(); //save settings in localStorage!
						swal("Saved!", "Your settings are saveed.", "success");   						
					} else {     
						swal("Canceled", "Your settings are not saved :)", "error");   
					} 
				}
			);
			break;
		case 'no':
			//====A title with a text under====
			swal("This settings are empty!", "Please check again the settings.")		
			break;
		case 'basic':
			//====Basic example
			swal("Here's a message!")
			break;
		case 'basicA': //2015-05-26(Tue)_shkwak
			//====Basic example A
			swal(msg)
			break;
		case 'basicB':
			//====A title with a text under====
			swal(msg, comment)
			break;
		case 'basicC':
			//====A success message!==== //warning", "error", "success" and "info".
			swal(msg, comment, status)	
			break;
		case 'Oops':
			swal("Oops...", "Something went wrong!", "error");
			break;
		case 'type0':
			//====A title with a text under====
			swal("Here's a message!", "It's pretty, isn't it?")
			break;		
		case 'type1':
			//====A success message!==== //warning", "error", "success" and "info".
			swal("Good job!", "You clicked the button!", "success")	
			break;
		case 'type2':
			//====A message with auto close timer====
			swal({
				title: "Auto close alert!",
				text: "I will close in 2 seconds.",
				timer: 2000
			});
			break;
		case 'type3':
			//====A warning message, with a function attached to the "Confirm"-button...====
			swal({
				title: "Are you sure?",
				text: "You will not be able to recover this imaginary file!",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Yes, delete it!",
				closeOnConfirm: false
			}, function() {
				swal("Deleted!", "Your imaginary file has been deleted.", "success");
			});
			break;
		case 'type4':
			//====A message with a custom icon====
			swal({
				title: "Sweet!",
				text: "Here's a custom image.",
				imageUrl: "images/thumbs-up.jpg"
			});
			break;
		case 'advancedA':
			swal({ //add, 2015-06-03(Wed)_shkwak for Service Scheduler
				title: "An input!",   
				text: "Write something interesting:",   
				type: "input",   
				showCancelButton: true,   
				closeOnConfirm: false,   
				animation: "slide-from-top",   
				inputPlaceholder: "Write something" 
			}, function(inputValue){   
				if (inputValue === false) return false;      
				if (inputValue === "") {     
					swal.showInputError("You need to write something!");     
					return false   
				}      
				swal("Nice!", "You wrote: " + inputValue, "success"); 
			});
			break;
	}	
}

function localStorage_Clear(key)
{	//localStorage의 특정 항목을 삭제,
	localStorage.removeItem(key);
}

function escapeHTML (unsafe_str) 
{	//2015-05-21(Thu)_shkwak, innetHTML 이슈, use yet!
    return unsafe_str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#39;'); // '&apos;' is not valid HTML 4
}