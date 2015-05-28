/*!
 * github_repository.js v0.1.0
 *
 * Copyright 2015 shkwak
 * Licensed under the BSD license
 */

//**** edit_sectionE ****//
function editViewE(id)
{	//추가한 Service의 요소값을 수정하기 위한 영역을 보이게 한다.	
	var sID = id.split('_'); //console.log(id); //editBtn_1 ; OK	
	var eID = 'edit' + sID[1]; //console.log(sID[1]); //1 ; OK
	console.log(eID); //edit1 ; OK

	if (document.getElementById(eID).style.display == 'none'){
		document.getElementById(eID).style.display = 'block';
	}else{
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
function addServiceE(sName, tColor, tTitle) //★★★
{	//Solution에 Service 추가, 2015-05-11(Mon)_RE_shkwak	
	console.log("anr : " + anr);
	var description = "";

	//if (tTitle == ""){
		description = 'Robot deliveries what you order through your application. You can choose delivery robots as your needs. e.g.beverage,...';
	//}else{
	//	description = tTitle;
	//}
	
	var element = "<div class='list-group-item height-75 add-service" + anr 
		+ "'><div><p id='add-service" + anr + "' class='list-group-item-text col-xs-9' style='color:" + tColor 
		+ "; padding-left:0px;' onclick='delServiceE(this.id);'>" + sName + " (<span id='icon" + anr 
		+ "' class='glyphicon glyphicon-minus'></span>)</p></div><div class='col-xs-9' style='padding:0px;'><h6>" + description 
		+ "</h6></div><div class='col-xs-3' style='padding:0px; margin-top:-24px;'><h6 id='h6_n" + anr 
		+ "' style='color:#FCB040; float:right; margin:8px 0px 0px 0px;' onclick='classChangeE(this.id);'>Auto enabled service <span id='check_h6_n" + anr 
		+ "' class='glyphicon glyphicon-unchecked'></span></h6><div><span style='float:right; padding-right:63px; color:#ccc; font-size:12px;'>overrided <span id='check_override" + anr 
		+ "' class='glyphicon glyphicon-remove'></span></span></div><strong><div id='editBtn_" + anr 
		+ "' style='float:right; padding-right:108px; color:; font-size:12px;' onclick='editViewE(this.id)';>edit</div></strong></div></div>																																					 <a href='#' class='list-group-item height-225 add-service" + anr + "' id='edit" + anr + "' style='display:none; background-color:#FFFFFF;'><textarea id='textarea" + anr + "' style='width: 100%; height:82%; border:1px solid #ccc; border-radius:4px; resize:none;' spellcheck='false'></textarea><button type='button' id='saveBtn_" + anr + "' class='btn btn-info' style='float: right; right: 25px; height: 30px; font-size: 12px;' onclick='classOverrideChangeE(this.id);editViewE(this.id);'>Save</button></a>"

	$(element).appendTo("#div_serviceNameE"); //<span style='float:right;'>edit</span>						
	anr++;
}								
	
  /*
  <a href='#' class='list-group-item height-225 add-service" + anr + "' id='edit" + anr + "' style='display:none; background-color:#FFFFFF;'><div class='table-responsive' style='font-size:12px;'> <table class='table'><button type='button' id='saveBtn_" + anr + "' class='btn btn-info' style='position: absolute; right: 25px; height: 30px; font-size: 12px;' onclick='classOverrideChangeE(this.id);editViewE(this.id);'>Save</button><thead><tr><th>Service Name</th><th>" + sName + "</th></tr></thead><tbody><tr style='height:28px;'><td style='padding:5px 8px'>Description</td><td style='padding:2px 8px;'><input type='text' id='description_" + anr +"' class='form-control' value='" + description + "' style='padding:2px 8px; height:24px;'></td></tr><tr style='height:28px;'><td style='padding:5px 8px'>Icon</td><td style='padding:2px 8px;'><input type='text' id='icon_" + anr + "' class='form-control' value='' style='padding:2px 8px; height:24px;'></td></tr><tr style='height:28px;'><td style='padding:5px 8px'>Priority</td><td style='padding:2px 8px;'><input type='text' id='priority_" + anr + "' class='form-control' value='' style='padding:2px 8px; height:24px;'></td></tr><tr style='height:28px;'><td style='padding:5px 8px'>Interactions</td><td style='padding:2px 8px;'><input type='text' id='interactions_" + anr + "' class='form-control' value='' style='padding:2px 8px; height:24px;'></td></tr><tr style='height:28px;'><td style='padding:5px 8px'>Parameters</td><td style='padding:2px 8px;'><input type='text' id='parameters_" + anr + "' class='form-control' value='concert_service_make_a_map/make_a_map' style='padding:2px 8px; height:24px;'></td></tr></tbody></table></div></a>"
  */

function delServiceE(sID)
{	//Solution의 Service 삭제, 2015-01-07(Wed)_shkwak 						  
	if (anr > 0)
	{
		var element = "." + sID;
		$("div").remove(element); 
		anr--;
	}						
}						  

function classChangeE(cID, cColor)
{	//Auto enabled service - checkBox class 변경 함수, 2015-01-07(Wed)_shkwak
	var chk_id = "#check_" + cID, h6_id = '#' + cID;
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
	}
	else
	{
		$(chk_id).removeClass();
		$(chk_id).attr("class", "glyphicon glyphicon-unchecked");
		$(h6_id).css('color', '#FCB040'); //color 변경!
	}
}

function classOverrideChangeE(id)
{	//overrided - check class 변경 함수, 2015-05-07(Thu)_shkwak
	var sID = id.split('_');
	var chk_id = "#check_override" + sID[1];
	var this_class = $(chk_id).attr('class');
	console.log(sID[1] + ', ' + chk_id + ', ' + this_class);

	if (this_class == "glyphicon glyphicon-remove")
	{
		$(chk_id).removeClass();
		$(chk_id).attr("class", "glyphicon glyphicon-ok");
	}
	else
	{
		$(chk_id).removeClass();
		$(chk_id).attr("class", "glyphicon glyphicon-remove");
	}
}

//============= GitHub service repository, solution repo 연동 =============
//2015-05-10(Sun)_shkwak
//============= 
//
///* service repository */
//var owner = 'robotics-in-concert'; 
//var repo = 'rocon_demos';
//var pre_content = ""; //수정 전 content base64 값
//var tree_sha = "";
//var name_GitHubServiceList = new Array(), path_GitHubServiceList = new Array();
//var sha_GitHubServiceList = new Array(), url_GitHubServiceList = new Array();
//
///* solution repository */
//var owner2 = 'dwlee'; //'dwlee'; 'meddugi723'
//var repo2 = 'concert_common_solutions'; //'concert_common_solutions'; 'ROStest1'
//var pre_contentF; //수정 전 content base64 값
//var data_shaF = "", solution_master_sha = "";;
//var data_typeF = new Array(), data_type_subF = new Array(), data_type_sub_subF = new Array();
//var access_token2 = "";
//
////==== User Authorization, get access_token, 2015-05-13(Wed)_RE_shkwak ====
//var base64IDPW = "";
//
//console.log('<script src="./js/github_repository.js"></script> load');
//
//function UserAuthorization()
//{	//2015-05-13(Wed)_shkwak_RE
//	var userID = document.getElementById("ID").value;
//	var userPW = document.getElementById("PW").value;
//	
//	if (userID == "" || userPW == "")
//	{
//		alert("User account와 Password를 입력하세요.");
//	}
//	else
//	{
//		var data = userID + ":" + userPW;
//		base64IDPW = Base64.encode(data);
//
//		/*--이전 base64UserIDPW 삭제--*/
//		//localStorage.removeItem("base64UserIDPW");
//
//		/*--base64UserIDPW 갱신--*/
//		localStorage.setItem("base64UserIDPW", base64IDPW);	
//		//console.log(localStorage.getItem('base64UserIDPW')); //
//
//		AuthorizationList(); //user 정보를 이용하여 token 정보 확인
//	}
//}
//
//function localStorage_Clear(key)
//{
//	localStorage.removeItem(key);
//}
//
//function AuthorizationList()
//{	//token 리스트 가져오기
//	var userID = document.getElementById("ID").value;
//	var exist = false;
//	//var exist_num = 0;
//	//var access_token = ""; //중요!
//	var token_id = "";
//
//	jQuery.support.cors = true;
//	$.ajax({
//		beforeSend: function (request) {
//			request.setRequestHeader("Authorization", "Basic " + base64IDPW); /*bWVkZHVnaTcyMzpzaGt3YWs3OTE4");*/
//		},
//		url: "https://api.github.com/authorizations",
//		type: "GET",
//		dataType: "json",
//		success: function (data) {
//			//data.length : 4!!!, data[0].app.name : GitHub for Windows!!! Good
//			console.log(data); 
//			for (var i=0;i<data.length;i++)
//			{	//if (data[i].app.name == userID)				
//				console.log(data[i].note + ', ' + data[i].token); //object 4ea,, meddugi723, null, null, GitHub for Windows on shkwak-PC,
//
//				if (data[i].note == userID)
//				{
//					console.log("Auth exist!");
//					//exist_num++;
//					exist = true;
//					//access_token = data[i].token; //★ empty string("") return!!!
//					token_id = data[i].id;
//					console.log('token_id : ' + token_id);
//					break; //for에서 나가기
//				}				
//			}		
//			
//			if (exist)
//			{				
//				AuthorizationDelete(token_id); //기존 token 삭제!
//			}
//			else
//			{
//				//alert("Auth no exist! ");
//				/*--userID와 같은 name의 Auth 생성★--*/				
//				AuthorizationCreate();				
//			}
//			
//		},
//		error: function (x, y, z) {
//			//alert(x + "\n" + y + "\n" + z);
//			alert("User account와 Password를 다시 확인해 주세요.");
//		}
//	});	
//}
//
//function AuthorizationCreate()
//{	//새로운 token 생성하기, data.token 값 저장
//	var userID = document.getElementById("ID").value;
//	//var note = userID + ' note'; //meddugi723, futurerobot
//	var scope = [ "public_repo" ];
//	var cmds = {scopes : scope, note : userID};
//
//	if (userID == "" || base64IDPW == "")
//	{
//		alert("User account를 입력하세요!");
//	}
//	else
//	{
//	jQuery.support.cors = true;
//	$.ajax({
//		beforeSend: function (request) {
//			request.setRequestHeader("Authorization", "Basic " + base64IDPW); //bWVkZHVnaTcyMzpzaGt3YWs3OTE4
//		},
//		url: "https://api.github.com/authorizations",
//		type: "POST",
//		data: JSON.stringify(cmds),
//		contentType: "application/json;charset=utf-8",
//		success: function (data) {
//			/*--AuthorizationList() 함수 재실행, access_token 획득--*/
//			//AuthorizationList(); //기존 access_token 가져오기 위해 사용 -> but, now no use!
//			console.log('AuthorizationCreate()');			
//			console.log(data); //token ; "3b16f466d4d3dd2718a939807cfb1b5df3d46eca"			
//			access_token2 = data.token; //새로 생성된 token 값
//			console.log('access_token2 : ' + access_token2);
//			/*--access_token localStorage 저장--*/
//			localStorage.setItem("access_token2", access_token2);
//			console.log('localStorage.setItem(access_token2)');
//			/*--access User Name--*/
//			//localStorage.setItem("access_user", userID);
//		},
//		error: function (x, y, z) {
//			//alert(x + "\n" + y + "\n" + z);
//			alert("Access Token 생성 중에 오류가 발생했습니다.");
//		}
//	});	
//	}
//}
//
//function AuthorizationDelete(id)
//{	//Delete an authorization, 2015-05-14(Thu)_shkwak
//	jQuery.support.cors = true;
//	$.ajax({
//		beforeSend: function (request) {
//			request.setRequestHeader("Authorization", "Basic " + base64IDPW); //bWVkZHVnaTcyMzpzaGt3YWs3OTE4
//		},
//		url: "https://api.github.com/authorizations/" + id,
//		type: "DELETE",
//		//data: JSON.stringify(cmds),
//		//contentType: "application/json;charset=utf-8",
//		success: function (data) {
//			/*--AuthorizationList() 함수 재실행, access_token 획득--*/
//			console.log('AuthorizationDelete()');
//			AuthorizationCreate(); //token 재생성
//		},
//		error: function (x, y, z) {
//			alert(x + "\n" + y + "\n" + z);
//			//alert("Access Token 생성 중에 오류가 발생했습니다.");
//		}
//	});	
//}
//
//function GetGitHubBranchTreeSHA()
//{	//2015-05-10(Sun)_shkwak, Get Branch - tree sha 값 가져오기
//	var branch = 'concert_common_services';
//	
//	jQuery.support.cors = true;
//	$.ajax({
//		url: "https://api.github.com/repos/" + owner + "/" + repo + "/branches/" + branch,
//		type: "GET",
//		dataType: "json",
//		success: function (data) {
//			//jsonData = eval(data); //eval() : json 타입으로 변환해줌
//			console.log(data);
//			console.log(data.length); //x 안나옴!
//			console.log("brach name : " + data.name);
//			console.log("tree sha : " + data.commit.commit.tree.sha); //성공
//			tree_sha = data.commit.commit.tree.sha; //sha 저장!
//			//return tree_sha;
//			GetGitHubServiceList();
//		},
//		error: function (x, y, z) {
//			alert(x + "\n" + y + "\n" + z);
//		}
//	});	
//}
//
//function GetGitHubMasterSHA() //나중에 GetGitHubBranchTreeSHA()와 통합!
//{	//2015-05-14(Thu)_shkwak, Get master sha 값 가져오기
//	var branch = 'master';
//	
//	jQuery.support.cors = true;
//	$.ajax({
//		url: "https://api.github.com/repos/" + owner2 + "/" + repo2 + "/branches/" + branch,
//		type: "GET",
//		dataType: "json",
//		success: function (data) {
//			//jsonData = eval(data); //eval() : json 타입으로 변환해줌
//			console.log(data);
//			console.log(data.length); //x 안나옴!
//			console.log("name : " + data.name);
//			console.log("sha : " + data.commit.sha); //성공
//			solution_master_sha = data.commit.sha; //sha 저장!
//			return data.commit.sha;
//		},
//		error: function (x, y, z) {
//			alert(x + "\n" + y + "\n" + z);
//		}
//	});	
//}
//
//function GetGitHubBranchList()
//{	//2015-05-14(Thu)_shkwak, Get Branch List 가져오기	
//	jQuery.support.cors = true;
//	$.ajax({
//		url: "https://api.github.com/repos/" + owner2 + "/" + repo2 + "/branches",
//		type: "GET",
//		dataType: "json",
//		success: function (data) {
//			console.log(data);
//			console.log(data.length); //			
//			for (var i=0;i<data.length;i++ )
//			{
//				console.log("name : " + data[i].name);
//			}			
//			//return branchList;
//		},
//		error: function (x, y, z) {
//			alert(x + "\n" + y + "\n" + z);
//		}
//	});	
//}
//
//function GetGitHubServiceList() //(owner, repo, branch) next time~
//{	//2015-05-11(Mon)_shkwak, Get GitHub Service List
//	//var owner = 'robotics-in-concert'; 
//	//var repo = 'rocon_demos';		   
//	var branch = 'concert_common_services';
//		
//	if (tree_sha == "" || owner == "" || repo == "")
//	{
//		alert("Check Tree_SHA, Owner and Repository value!");		
//	}
//	else
//	{
//	jQuery.support.cors = true;
//	$.ajax({
//		url: "https://api.github.com/repos/" + owner + "/" + repo + "/git/trees/" + tree_sha + "?recursive=1",
//		type: "GET",
//		dataType: "json",
//		success: function (data) {
//			//jsonData = eval(data); //eval() : json 타입으로 변환해줌
//			console.log("tree length : " + data.tree.length); 
//			var j = 0;
//			for (var i=0;i<data.tree.length;i++)
//			{	//document.getElementById('box1').value += data[i].name + "\n";
//				//console.log(data.tree[i].type + ', ' + data.tree[i].path);				
//				if (data.tree[i].type == "blob")
//				{	//blob(파일)만 리스트업_2015-05-11(Mon)_shkwak
//					//console.log(data.tree[i].path);					
//					var tree_file = data.tree[i].path.split('.'); //확장자 검색
//					if (tree_file[1] == "service")
//					{
//						//console.log(data.tree[i].path);
//						var service_file = tree_file[0].split('/'); //ubuntu에서는 '/' 사용!
//						console.log(service_file[service_file.length-1]);
//						name_GitHubServiceList[j] = service_file[service_file.length-1]; //GitHub Service name★	
//						path_GitHubServiceList[j] = data.tree[i].path;	//GitHub Service Full path
//						sha_GitHubServiceList[j] = data.tree[i].sha;	//GitHub Service sha
//						url_GitHubServiceList[j] = data.tree[i].url;	//GitHub Service content url
//						j++;
//					}
//				}				
//			}
//			show_GitHubServiceList();
//		},
//		error: function (x, y, z) {
//			alert(x + "\n" + y + "\n" + z);
//		}
//	});	
//	}
//}
//
//function show_GitHubServiceList() //ing!
//{	//socket message가 수신된 후(데이터가 저장된 후) 데이터를 확인한다. 순차 실행을 위함.
//	console.log(name_GitHubServiceList);
//
//	//***** Element dynamic create/remove *****//
//	$('.list-group-item2').remove(); //기존 sample 리스트 삭제
//
//	var an = 0;
//	name_GitHubServiceList.forEach(function(file){		
//		var element = "<a href='#' class='list-group-item sl" + an + " list-group-item2' style='height:75px;'><p class='list-group-item-text' style='color:#A8A9AC;'>service name : </p><h3 class='list-group-item-heading' style='color:" + color_sample[an] + ";' onclick='addServiceE(this.innerHTML, this.style.color);GetGitHubServiceContent(" + an + ");'>" + file + "</h3></a>"
//
//		$(element).appendTo("#div_serviceListE"); //획득한 service 리스트 추가
//		an++;
//	});		
//		
//	var solutionName = document.getElementById('created_solutionName').value;
//	if (solutionName == "SOLUTION NAME : dummy_concert1")
//	{
//		console.info("솔루션 생성을 먼저 하세요!");
//		//alert("솔루션 생성을 먼저 하세요!");
//	}
//}
//
//function GetGitHubServiceContent(url_num) //or sha
//{	//2015-05-11(Mon)_shkwak, Get service content
//	//var branch = 'concert_common_services';
//	var url = url_GitHubServiceList[url_num]; //
//	console.log(url_GitHubServiceList[0]);
//	var textarea_id = 'textarea' + url_num;
//	console.log('textarea_id : ' + textarea_id);
//	jQuery.support.cors = true;
//	$.ajax({
//		url: url, //"https://api.github.com/repos/robotics-in-concert/rocon_demos/git/blobs/ffb6a85ebc80b5f2f4b8444f23fb6ae41fba20b8",
//		type: "GET",
//		dataType: "json",
//		success: function (data) {
//			//jsonData = eval(data); //eval() : json 타입으로 변환해줌
//			console.log(data);
//			console.log(data.content);
//			console.log(Base64.decode(data.content)); //성공
//			document.getElementById(textarea_id).innerHTML = Base64.decode(data.content);
//		},
//		error: function (x, y, z) {
//			alert(x + "\n" + y + "\n" + z);
//		}
//	});	
//}
//
//
//function GetFileListF()
//{
//	var select = document.getElementById('select_repo1');
//	var select_sub = document.getElementById('select_repo2');
//	var select_sub_sub = document.getElementById('select_repo3');
//
//	/*selectbox option 삭제*/
//	select.options.length = 0; //option 전체삭제
//	var option_line = document.createElement('option');
//	option_line.value = option_line.text = "----- Select 1st -----";
//	select.add(option_line);
//
//	select_sub.options.length = 0; //option 전체삭제
//	var option_line = document.createElement('option');
//	option_line.value = option_line.text = "------ Select 2nd -----";
//	select_sub.add(option_line);
//
//	select_sub_sub.options.length = 0; //option 전체삭제
//	var option_line = document.createElement('option');
//	option_line.value = option_line.text = "------ Select final -----";
//	select_sub_sub.add(option_line);
//	
//	if (owner2 == "" || repo2 == "")
//	{
//		alert("Check Owner and Repository value!");		
//	}
//	else
//	{
//		jQuery.support.cors = true;
//		$.ajax({
//			url: "https://api.github.com/repos/" + owner2 + "/" + repo2 + "/contents",
//			type: "GET",
//			dataType: "json",
//			success: function (data) {
//				//jsonData = eval(data); //eval() : 검사?
//				var j = 1;
//				for (var i=0;i<data.length;i++)
//				{
//					var option = document.createElement('option');
//					//if (data[i].type == "dir")
//					//{	//솔루션만 리스트업_2014-04-16_유진로봇 요청사항
//						option.value = option.text = data[i].name;
//						select.add(option);
//						/*--data_type 저장--*/
//						data_typeF[j] = data[i].type; //★
//						//console.log(data[i].name + ', ' + data[i].type); ////////////
//						j++;
//					//}
//				}
//			},
//			error: function (x, y, z) {
//				alert(x + "\n" + y + "\n" + z);
//			}
//		});	
//	}
//}
//
////자바스크립트 코드 압축 사이트, 2015-05-12(Tue)_shkwak - http://javascriptcompressor.com/
//
//function GetFileList_subF()
//{
//	var select = document.getElementById('select_repo2');
//	var solution = document.getElementById('select_repo1').value;
//
//	/*selectbox option 삭제*/
//	select.options.length = 0; //option 전체삭제
//	var option_line = document.createElement('option');
//	option_line.value = option_line.text = "----------------------";
//	select.add(option_line);
//	
//	if (owner2 == "" || repo2 == "")
//	{
//		alert("Insert Owner value and Repository value!");		
//	}
//	else
//	{
//	jQuery.support.cors = true;
//	$.ajax({
//		url: "https://api.github.com/repos/" + owner2 + "/" + repo2 + "/contents/" + solution,
//		type: "GET",
//		dataType: "json",
//		success: function (data) {
//			var j = 1;
//			for (var i=0;i<data.length;i++)
//			{
//				var option = document.createElement('option');
//		        //if (data[i].type == "file")
//				//{	//type이 file만 표시 -> 모두 표시
//					option.value = option.text = data[i].name;
//					select.add(option);
//					/*--data_type 저장--*/
//					data_type_subF[j] = data[i].type; //★
//					j++;
//				//}
//			}						
//		},
//		error: function (x, y, z) {
//			alert(x + "\n" + y + "\n" + z);
//		}
//	});	
//	}
//}
//
//function GetFileList_sub_subF()
//{
//	var select = document.getElementById('select_repo3');
//	var solution = document.getElementById('select_repo1').value;
//	var solution_path = document.getElementById('select_repo2').value;
//
//	/*selectbox option 삭제*/
//	select.options.length = 0; //option 전체삭제
//	var option_line = document.createElement('option');
//	option_line.value = option_line.text = "----------------------";
//	select.add(option_line);
//	
//	if (owner2 == "" || repo2 == "")
//	{
//		alert("Insert Owner value and Repository value!");		
//	}
//	else
//	{
//	jQuery.support.cors = true;
//	$.ajax({
//		url: "https://api.github.com/repos/" + owner2 + "/" + repo2 + "/contents/" + solution + "/" + solution_path,
//		type: "GET",
//		dataType: "json",
//		success: function (data) {
//			var j = 0;
//			for (var i=0;i<data.length;i++)
//			{
//				var option = document.createElement('option');
//		        //if (data[i].type == "file")
//				//{	//type이 file만 표시 -> 모두 표시
//					option.value = option.text = data[i].name;
//					select.add(option);
//					/*--data_type 저장--*/
//					data_type_subF[j] = data[i].type; //★
//					j++;
//				//}
//			}						
//		},
//		error: function (x, y, z) {
//			alert(x + "\n" + y + "\n" + z);
//		}
//	});	
//	}
//}
//
//function GetDataF(name)
//{
//	var select = document.getElementById('select_repo1');
//	
//	if (owner2 == "" || repo2 == "")
//	{
//		alert("Insert Owner value and Repository value!");		
//	}
//	else
//	{
//		/*--select box index 넘버 가져오기--*/ 
//		if (data_typeF[select.selectedIndex] == "dir")
//		{
//			GetFileList_subF(); //solution 폴더의 하위 파일을 다시 읽어오기
//		}
//		else if (data_typeF[select.selectedIndex] == "file")
//		{
//			jQuery.support.cors = true;
//			$.ajax({
//				url: "https://api.github.com/repos/" + owner2 + "/" + repo2 + "/contents/" + name,
//				type: "GET",
//				dataType: "json",
//				success: function (data) {
//					document.getElementById('box_result').innerHTML = Base64.decode(data.content);
//					pre_contentF = Base64.decode(data.content);
//					data_shaF = data.sha; //document.getElementById('box_sha').value = data.sha;
//				},
//				error: function (x, y, z) {
//					alert(x + "\n" + y + "\n" + z);
//				}
//			});
//		}
//		else
//		{
//			alert('해당 파일은 수정할 수 없습니다.');
//		}
//	}
//}
//
//function GetData_subF(name)
//{
//	var select = document.getElementById('select_repo2');
//	var solution = document.getElementById('select_repo1').value;
//
//	if (owner2 == "" || repo2 == "")
//	{
//		alert("Insert Owner value and Repository value!");		
//	}
//	else
//	{				
//		/*--select box index 넘버 가져오기--*/
//		//alert(select.selectedIndex); alert(data_type[select.selectedIndex]); //GOOD - file, dir
//		console.log(data_type_subF[select.selectedIndex]);
//		if (data_type_subF[select.selectedIndex] == "dir")
//		{
//			GetFileList_sub_subF(); //solution 폴더의 하위 파일을 다시 읽어오기
//		}
//		else if (data_type_subF[select.selectedIndex] == "file")
//		{
//			jQuery.support.cors = true;
//			$.ajax({
//				url: "https://api.github.com/repos/" + owner2 + "/" + repo2 + "/contents/" + solution + "/" + name,
//				type: "GET",
//				dataType: "json",
//				success: function (data) {
//					document.getElementById('box_result').innerHTML = Base64.decode(data.content);
//					pre_contentF = Base64.decode(data.content);
//					//document.getElementById('box_sha').value = data.sha;
//					data_shaF = data.sha;
//				},
//				error: function (x, y, z) {
//					alert(x + "\n" + y + "\n" + z);
//				}
//			});
//		}
//	}
//}
//
//function GetData_sub_subF(name)
//{
//	var select = document.getElementById('select_repo3');
//	var solution = document.getElementById('select_repo1').value;
//	var solution_path = document.getElementById('select_repo2').value;
//	
//	if (owner2 == "" || repo2 == "")
//	{
//		alert("Insert Owner value and Repository value!");		
//	}
//	else
//	{	
//		if (data_type_subF[select.selectedIndex] == "dir")
//		{
//			//GetFileList_sub_subF(); //solution 폴더의 하위 파일을 다시 읽어오기
//			alert('no more');
//		}
//		else if (data_type_subF[select.selectedIndex] == "file")
//		{
//			jQuery.support.cors = true;
//			$.ajax({
//				url: "https://api.github.com/repos/" + owner2 + "/" + repo2 + "/contents/" + solution + "/" + solution_path + "/" + name,
//				type: "GET",
//				dataType: "json",
//				success: function (data) {
//					document.getElementById('box_result').innerHTML = Base64.decode(data.content);
//					pre_contentF = Base64.decode(data.content);
//					//document.getElementById('box_sha').value = data.sha;
//					data_shaF = data.sha;
//				},
//				error: function (x, y, z) {
//					alert(x + "\n" + y + "\n" + z);
//				}
//			});
//		}
//	}
//}
//
//function FileUpdate_subF() //no
//{	//Required : message, content(수정 후), sha(수정 전)	
//	var solution = document.getElementById('select_repo1').value;
//	var fileName = document.getElementById('select_repo2').value;
//
//	/*--access_token--*/
//	//var access_token = document.getElementById('box_token').value;
//	var access_token = localStorage.getItem("access_token");
//	
//	if (access_token == null)
//	{
//		alert("로그인을 하여야 업데이트가 가능합니다.");		
//	}
//	else
//	{
//	var msg = document.getElementById('updateMsg').value;
//	if (msg == ""){msg = "Template Editor commit";}
//	var content = Base64.encode(document.getElementById('box_result').innerHTML);
//	var sha = data_sha; //document.getElementById('box_sha').value;
//	var cmds = {message : msg, content : content, sha : sha}; //var cmds = [ cmd ]; //[ ] 삭제
//	//var data_str = JSON.stringify(cmds);
//	
//	/*
//	if (fileName == "-----------" || content == "")
//	{
//		alert("Insert filename and content value!");
//	}
//	else
//	{*/
//		if (content == pre_content)
//		{
//			alert("Content가 이전 Content와 같습니다.");
//		}
//		else
//		{
//	jQuery.support.cors = true;
//	$.ajax({
//		url: "https://api.github.com/repos/" + owner2 + "/" + repo2 + "/contents/" + solution + "/" + fileName + "?access_token=" + access_token,
//		type: "PUT",
//		data: JSON.stringify(cmds),
//		contentType: "application/json;charset=utf-8",
//		success: function (data) {
//			alert("Update complete!");
//		},
//		error: function (x, y, z) {
//			alert(x + "\n" + y + "\n" + z);
//		}
//	});
//		}
//	}
//}
//
////==== Pull Request, 2015-05-12(Tue)_shkwak ==== 
//function CreatePullRequest()
//{
//	var access_token2 = localStorage.getItem("access_token2");
//	
//	if (access_token2 == null)
//	{
//		alert("로그인을 하여야 업데이트가 가능합니다.");		
//	}
//	else
//	{
////	var msg = document.getElementById('updateMsg').value;
////	if (msg == ""){msg = "Template Editor commit";}
////	var content = Base64.encode(document.getElementById('box_result').innerHTML);
////	var sha = data_sha; //document.getElementById('box_sha').value;
//	//var cmds = {message : msg, content : content, sha : sha}; //var cmds = [ cmd ]; //[ ] 삭제
//	var cmds = {title: "First PR", body: "Please pull this in!", head: "meddugi723: branch1", base: "master"}
//
//	/*
//	Input
//	----------------------------------------------------------------------------------------------------------------
//	Name	|	Type	|	Description
//	----------------------------------------------------------------------------------------------------------------
//	title	|	string	|	Required. The title of the pull request.
//	head	|	string	|	Required. The name of the branch where your changes are implemented. For cross-repository pull requests in the same network, namespace head with a user like this: username:branch.
//	base	|	string	|	Required. The name of the branch you want your changes pulled into. This should be an existing branch on the current repository. You cannot submit a pull request to one repository that requests a merge to a base of another repository.
//	body	|	string	|	The contents of the pull request.
//	----------------------------------------------------------------------------------------------------------------
//	*/
//	//.set('Authorization', "token "+config.github_token) //yujin code
//
//	jQuery.support.cors = true;
//	$.ajax({
//		beforeSend: function (request) {
//			request.setRequestHeader("Authorization", "token " + access_token2);
//		},
//		url: "https://api.github.com/repos/" + owner2 + "/" + repo2 + "/pulls", // + "?access_token=" + access_token,
//		type: "POST",
//		data: JSON.stringify(cmds),
//		contentType: "application/json;charset=utf-8",
//		success: function (data) {
//			console.log(data);
//		},
//		error: function (x, y, z) {
//			alert(x + "\n" + y + "\n" + z);
//		}
//	});
//	}
//}
//
//function Create_Branch(branch) //x
//{	//Create a Reference(Branch), 2015-05-14(Thu)_shkwak	
//	var access_token2 = localStorage.getItem("access_token2");
//
//	if (access_token2 == null)
//	{
//		alert("Access Token 정보가 없습니다.");		
//	}
//	else
//	{
//		var userID = document.getElementById("ID").value;
//		var userPW = document.getElementById("PW").value;
//	
//		if (userID == "" || userPW == "")
//		{
//			alert("User account와 Password를 입력하세요.");
//		}
//		else
//		{
//			var data = userID + ":" + userPW;
//			base64IDPW = Base64.encode(data);
//		}
//
//		var ref = 'refs/heads/' + branch;		
//		var sha = GetGitHubMasterSHA(); //Sha1.hash(ref); //sha1 hash encode
//		var cmds = {ref : ref, sha : sha}
//		console.log(cmds);
//
//		jQuery.support.cors = true;
//		$.ajax({
//			beforeSend: function (request) {
//				request.setRequestHeader("Authorization", "Basic " + base64IDPW); //bWVkZHVnaTcyMzpzaGt3YWs3OTE4
//			},
//			url: "https://api.github.com/repos/" + owner2 + "/" + repo2 + "/git/refs",
//			type: "POST",
//			data: JSON.stringify(cmds),
//			contentType: "application/json;charset=utf-8",
//			success: function (data) {
//				console.log(data);
//			},
//			error: function (x, y, z) {
//				alert(x + "\n" + y + "\n" + z);
//			}
//		});		
//	}
//}
//
//function Delete_Branch() //x
//{	//Delete a Reference(Branch), 2015-05-14(Thu)_shkwak
//	var access_token = '5d5859d492d4c361c505c1caebb6afd845804bb4'; //localStorage.getItem("access_token");
//	
//	if (access_token == null)
//	{
//		alert("Access Token 정보가 없습니다.");		
//	}
//	else
//	{
//	var cmds = {title: "First PR", body: "Please pull this in!", head: "meddugi723: branch1", base: "master"}
//
//	jQuery.support.cors = true;
//	$.ajax({
//		beforeSend: function (request) {
//			request.setRequestHeader("Authorization", "token " + access_token);
//		},
//		url: "https://api.github.com/repos/" + owner2 + "/" + repo2 + "/pulls", // + "?access_token=" + access_token,
//		type: "POST",
//		data: JSON.stringify(cmds),
//		contentType: "application/json;charset=utf-8",
//		success: function (data) {
//			console.log(data);
//		},
//		error: function (x, y, z) {
//			alert(x + "\n" + y + "\n" + z);
//		}
//	});
//	}
//}
//
//function CreateFork()
//{	//2015-05-19(Tue), test ; futurerobot 계정으로 로그인하여 meddugi723의 repository를 fork하는 테스트	
//	/*
//	Parameters
//	----------------------------------------------------------------------------------------------------------------
//	Name	 	 | Type	  | Description
//	organization | string |	The organization login. The repository will be forked into this organization.
//	----------------------------------------------------------------------------------------------------------------
//	*/	
//
//	//var cmds = {title: "First PR", body: "Please pull this in!", head: "meddugi723: branch1", base: "master"}
//	var useriD = 'futurerobot', userPW = 'frmac12';	//futurerobot 계정 정보
//	var data = userID + ":" + userPW;
//	var base64IDPW_fr = Base64.encode(data)
//
//	var owner2 = 'meddugi723', repo2 = 'ROStest4';
//
//	jQuery.support.cors = true;
//	$.ajax({
//		beforeSend: function (request) { 
//			request.setRequestHeader("Authorization", "basic " + base64IDPW_fr);
//		},
//		url: "https://api.github.com/repos/" + owner2 + "/" + repo2 + "/pulls", // + "?organization
//		type: "POST",
//		data: JSON.stringify(cmds),
//		contentType: "application/json;charset=utf-8",
//		success: function (data) {
//			console.log(data);
//		},
//		error: function (x, y, z) {
//			alert(x + "\n" + y + "\n" + z);
//		}
//	});
//}