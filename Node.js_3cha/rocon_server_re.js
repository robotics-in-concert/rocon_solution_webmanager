var app = require('http').createServer(handler), 
    //io = require(process.env.APPDATA + '/npm/node_modules/socket.io').listen(app), 
	io = require('socket.io').listen(app),
    fs = require('fs'),
	//ROSLIB = require(process.env.APPDATA + '/npm/node_modules/roslib'),	
	ROSLIB = require('roslib'),
    ros = new ROSLIB.Ros();
	
var param = process.argv.slice(2);
//console.log('param: ', param);
//console.log(process.argv[0]); //node?

if (param.length > 1)
{
	for (var i=0; i<param.length; )
	{
		if (param[i] == '-p')
		{
			app.listen(param[i+1]);
			console.log('app.listen(param[i]) : ' + param[i+1]);		
			console.log("Listening on http://localhost:" + param[i+1] + "...");
		}	
		i = i+2;
	}
}
else
{	//default : 8080
	app.listen(8080);
	console.log("Listening on http://localhost:8080...");
}

// directs page requests to html files 
function handler (req, res) {
	if (req.url == '/') req.url = '/index.html';
	fs.readFile(__dirname + req.url,	
	function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		} 
		res.writeHead(200);
		res.end(data);
	});
}

function driveWheel()
{	//no use
	var driveWheel = new ROSLIB.Service({
	ros : ros,
	name : '/concert/service/furo/DriveWheel',
	serviceType : 'DriveWheel'
	});

	// Then we create a Service Request. The object we pass in to ROSLIB.ServiceRequest matches the 
	// fields defined in the rospy_tutorials AddTwoInts.srv file.
	var driveWheelRequest = new ROSLIB.ServiceRequest({
	linear : 0.2,
	angular : 0
	});
	
	// Finally, we call the /concert/service/enable service and get back the results in the callback. The result
	// is a ROSLIB.ServiceResponse object.
	driveWheel.callService(driveWheelRequest, function(result) {
	console.log('Result for service call on ' + driveWheel.name + ': ' + result.error_message);
	});
}
 

/*-- ROSBridge --*/
function ConnectROS()
{
  //var master_URL = document.getElementById('master_URL').value;
  // Connecting to ROS
  // -----------------
  //var ros = new ROSLIB.Ros();
  //ros = new ROSLIB.Ros('');

  // If there is an error on the backend, an 'error' emit will be emitted.
  ros.on('error', function(error) {
    console.log(error);	
	//console.log("WebSocket connection to \'" + master_URL + "\' failed : Connection closed before receiving a handshake response."); //Error Message
  });

  // Find out exactly when we made a connection.
  ros.on('connection', function() {
    console.log('Connection made!');
  });

  // Create a connection to the rosbridge WebSocket server.
  // master_URL _2014-04-21_shkwak
  var master_URL = 'ws://192.168.0.28:9090'; //###########################################################################################수정필요!
  ros.connect(master_URL); //'ws://192.168.0.98:9090'; 
}

function callService(setServiceName, bool)
{
  if (setServiceName == null){
	  //var serviceName = document.getElementById('serviceList').value;
  }else{ 
	  var serviceName = setServiceName;
  }

  if (bool == null){
	  //var enabled = document.getElementById('serviceEnabled').value;
  }else{
	  var enabled = bool;
  }

  // Calling a service
  // -----------------
  // First, we create a Service client with details of the service's name and service type.
  var serviceEnable = new ROSLIB.Service({
    ros : ros,
    name : '/concert/service/enable',
    serviceType : 'concert_msgs/EnableService'
  });

  // Then we create a Service Request. The object we pass in to ROSLIB.ServiceRequest matches the 
  // fields defined in the rospy_tutorials AddTwoInts.srv file.
  if (enabled == "true")
	{
		var request = new ROSLIB.ServiceRequest({			
			name : serviceName, //name : 'admin',
			enable : true
		});

		//document.getElementById("service_data2").value += "ServiceCall - enable\n";
	}
	else
	{
		var request = new ROSLIB.ServiceRequest({
			name : serviceName,
			enable : false
		});

		//document.getElementById("service_data2").value += "ServiceCall - disable\n"
	}
  

  // Finally, we call the /concert/service/enable service and get back the results in the callback. The result
  // is a ROSLIB.ServiceResponse object.
  serviceEnable.callService(request, function(result) { //실제 callService 함수
    console.log('Result for service call on ' + serviceEnable.name + ': ' + result.error_message);
	
	if (result.error_message == "")
	{
		//document.getElementById("service_data2").value += "Success : " + result.success + "\n"; //result - success, error_message 두개 뿐!!
	}
	else
	{
		//document.getElementById("service_data2").value += "Error message : " + result.error_message + "\n";
	}
	
  });
}

// save the main path
var mainPath = process.cwd(); //Node가 실행된 폴더 Path
console.log("Main Path : " + mainPath);

// read file list recursive!!
// 2015-05-06(Wed)_shkwak
var read = require('fs-readdir-recursive');
//console.log("Read Path : " + mainPath + "/myservices");

var timer = ""; //var timer = new Array();
var startTime = "", endTime = "";

// this handles socket.io comm from html files 
io.sockets.on('connection', function(socket) {
    socket.send('connected...');
	//
    socket.on('message', function(data) {
		//date - {cmd : cmd, solution : solutionName, file : fileName[i_new], content : content};
		switch(data.cmd){
			case 'CreateSolution': //Local Solution 파일 생성		
				process.chdir(mainPath); //main path로 chdir
				//Solutions Dir 체크 및 생성
				fs.exists("Solutions", function (exists) {
					//util.debug(exists ? "it's there" : "no passwd!");
					if (!exists)
					{
						fs.mkdir("Solutions", '0777', function(err){
							if(err) throw err;
							console.log('Dir created : Solutions');
							process.chdir(mainPath  + '/Solutions'); //Solutions로 chdir

							fs.exists(data.solution, function (exists) {
								//util.debug(exists ? "it's there" : "no passwd!");
								if (!exists)
								{
									fs.mkdir(data.solution, '0777', function(err){
										if(err) throw err;
										console.log('Dir created : ' + data.solution);
									});
									//<script language="JavaScript" type="text/javascript" src="./js/base64.js"></script>
									fs.writeFile(data.solution + '/' + data.file,
										Base64.decode(data.content), //base64 decode 필요!
										encoding='utf-8',function(err){
										if(err) throw err;
										console.log('File writed : ' + data.file);

										if (data.count == 3)
										{
											var result = data.solution;
											var message = {result : result}; //{cmd : cmd, solution : solutionName, file : fileName, content : content};
											//console.log(message);
											socket.send(message);
										}							
									});
								}
								else
								{
									fs.writeFile(data.solution + '/' + data.file,
										Base64.decode(data.content), //base64 decode 필요! 현재 base64 encoding 상태로 저장!
										encoding='utf-8',function(err){
										if(err) throw err;
										console.log('File writed : ' + data.file);
										
										if (data.count == 3)
										{
											var result = data.solution;
											var message = {result : result}; //{cmd : cmd, solution : solutionName, file : fileName, content : content};
											//console.log(message);
											socket.send(message);
										}
									});
								}
							});
						});
					}
					else
					{
						process.chdir(mainPath  + '/Solutions'); //Solutions로 chdir

						fs.exists(data.solution, function (exists) {
							//util.debug(exists ? "it's there" : "no passwd!");
							if (!exists)
							{
								fs.mkdir(data.solution, '0777', function(err){
									if(err) throw err;
									console.log('Dir created : ' + data.solution);
								});
								//<script language="JavaScript" type="text/javascript" src="./js/base64.js"></script>
								fs.writeFile(data.solution + '/' + data.file,
									Base64.decode(data.content), //base64 decode 필요!
									encoding='utf-8',function(err){
									if(err) throw err;
									console.log('File writed : ' + data.file);

									if (data.count == 3)
									{
										var result = data.solution;
										var message = {result : result}; //{cmd : cmd, solution : solutionName, file : fileName, content : content};
										//console.log(message);
										socket.send(message);
									}							
								});
							}
							else
							{
								fs.writeFile(data.solution + '/' + data.file,
									Base64.decode(data.content), //base64 decode 필요! 현재 base64 encoding 상태로 저장!
									encoding='utf-8',function(err){
									if(err) throw err;
									console.log('File writed : ' + data.file);
									
									if (data.count == 3)
									{
										var result = data.solution;
										var message = {result : result}; //{cmd : cmd, solution : solutionName, file : fileName, content : content};
										//console.log(message);
										socket.send(message);
									}
								});
							}
						});
					}						
				});								
				break;
			case 'GetSolutionList':				
				console.log('Get SolutionList'); //ReadFileList와 중복				
				console.log(data.solution);
				process.chdir(mainPath);
				
				fs.exists("Solutions", function (exists) {
					//util.debug(exists ? "it's there" : "no passwd!");
					if (!exists)
					{
						fs.mkdir("Solutions", '0777', function(err){
							if(err) throw err;
							console.log('Dir created : Solutions');
							process.chdir(mainPath  + '/Solutions'); //Solutions로 chdir
							console.log(process.cwd()); //chdir 안하면 : current dir! - ex) c:/***/***/ROCON
							
							//var solusion_list = 
							fs.readdir('.',function(err,list){
								if(err) throw err;
								console.log('dir length : '+list.length);
								list.forEach(function(file){
									fs.stat(file,function(err, stat){ //file 정보
										if(err) throw err;
										console.log('file : '+file);
										console.log('isFile : '+stat.isFile()+' , isDir : '+stat.isDirectory());

										if (stat.isDirectory() == true)
										{
											var message = {dir : file}; //{cmd : cmd, solution : solutionName, file : fileName, content : content};
											socket.send(message);	
										}
									});
								});
								
								//var message = {dir : file}; //{cmd : cmd, solution : solutionName, file : fileName, content : content};
								//socket.send(message);	
							});
						});
					}
					else
					{
						process.chdir(mainPath  + '/Solutions'); //Solutions로 chdir
						console.log(process.cwd()); //chdir 안하면 : current dir! - ex) c:/***/***/ROCON

						fs.readdir('.',function(err,list){
							if(err) throw err;
							console.log('dir length : '+list.length);
							list.forEach(function(file){
								fs.stat(file,function(err, stat){ //file 정보
									if(err) throw err;
									console.log('file : '+file);
									console.log('isFile : '+stat.isFile()+' , isDir : '+stat.isDirectory());

									if (stat.isDirectory() == true)
									{
										var message = {dir : file}; //{cmd : cmd, solution : solutionName, file : fileName, content : content};
										socket.send(message);	
									}
								});
							});
						});
					}
				});				
				break;
			case 'GetFileList':
				console.log('Get FileList : yet'); //ReadFileList와 중복
				break;
			case 'ReadFile':
				process.chdir(mainPath  + '/Solutions');
				//process.chdir(mainPath  + '/Solutions'); //Solutions로 chdir
				fs.readFile(data.solution + '/' + data.file, 'utf8', function(err, readData) {
					if(err) throw err;
					var cmd = "ReadFile";
					var solutionName = data.solution;
					var fileName = data.file;
					var content = readData; //★
					var message = {cmd : cmd, solution : solutionName, file : fileName, content : content};
					console.log(message);
					socket.send(message); //return result
				});
				console.log('Read File');				
				//socket.broadcast.send("let there be light!");				
				break;
			case 'ModifyFile':
				process.chdir(mainPath + '/Solutions'); //main path로 chdir				
				fs.exists(data.solution, function (exists) {
					//util.debug(exists ? "it's there" : "no passwd!");
					if (!exists)
					{
						fs.mkdir(data.solution, '0777', function(err){
							if(err) throw err;
							console.log('Dir created : ' + data.solution);
						});
						//<script language="JavaScript" type="text/javascript" src="./js/base64.js"></script>
						fs.writeFile(data.solution + '/' + data.file,
							Base64.decode(data.content), //base64 decode 필요!
							encoding='utf-8',function(err){
							if(err) throw err;
							console.log('File writed : ' + data.file);

							var result = data.file + " is modified!";
							var message = {result : result}; //{cmd : cmd, solution : solutionName, file : fileName, content : content};
							//console.log(message);
							socket.send(message);
						});
					}
					else
					{
						fs.writeFile(data.solution + '/' + data.file,
							Base64.decode(data.content), //base64 decode 필요! 현재 base64 encoding 상태로 저장!
							encoding='utf-8',function(err){
							if(err) throw err;
							console.log('File writed : ' + data.file);
							
							var result = data.file + " is modified!";							
							var message = {result : result}; //{cmd : cmd, solution : solutionName, file : fileName, content : content};
							//console.log(message);
							socket.send(message);
						});
					}
				});	
				console.log('Modify File : ' + data.file);
				break;
			case 'DeleteFile':				
				process.chdir(mainPath); //main path로 chdir
				//process.chdir(mainPath  + '/Solutions'); //Solutions로 chdir
				console.log(process.cwd());
				fs.unlink(data.solution + '/' + data.file, function (err) {
					if (err) throw err;
					console.log('successfully deleted : ' + data.solution + '/' + data.file);
				});
				console.log('Delete File');
				break;
			case 'ReadFileList': //Node.js 폴더 내의 솔루션 read
				console.log('ReadFileList');
				console.log(data.solution);
				//var process = require('process');
				process.chdir(mainPath  + '/Solutions/' + data.solution); //process.chdir('c:\\windows'); 
				//process.chdir(mainPath  + '/Solutions\\test1'); //Solutions로 chdir
				console.log(process.cwd()); //chdir 안하면 : current dir! - ex) c:/***/***/ROCON
				 
				//var fs = require('fs');
				var results = [];
				fs.readdir('.',function(err,list){
					if(err) throw err;
					console.log('dir length : '+list.length);
					list.forEach(function(file){
						fs.stat(file,function(err, stat){ //file 정보
							if(err) throw err;
							console.log('file : '+file);
							console.log('isFile : '+stat.isFile()+' , isDir : '+stat.isDirectory());
						});
					});
				});
				break;
			case 'SetServiceSchdule':
				console.log('SetServiceSchdule');
				console.log(data.title + ', ' + data.start + ', ' + data.end);				
				startTime = data.start;
				endTime = data.end;				

				ConnectROS();
				console.log('node.js timer on');

				timer = setInterval(function(){					
					//var time = new Date().getTime(); //1421805591149
					//var date = new Date(time); //Wed Jan 21 2015 10:59:51 GMT+0900 (대한민국 표준시)
					var date = new Date();
					console.log('Now Time : ' + dateReFormat(date));					
					if (dateReFormat(date) == startTime)
					{
						callService('admin', 'true');
						console.log(dateReFormat(date)); //2015-01-21T10:59:51
					}

					if (dateReFormat(date) == endTime)
					{
						callService('admin', 'false');
						console.log(dateReFormat(date)); //2015-01-21T10:59:51
						console.log('node.js timer off');
						clearInterval(timer);
					}
					//logging();					
				}, 1000);
				break;				
			case 'DelServiceSchdule':
				console.log('DelServiceSchdule');
				clearInterval(timer);				
				//timer[schedule_id] = setInterval("nowTimeCheck('"+schedule_id+"')",5000);
				break;
			case 'NewSolution':
				var sys = require('sys')
				var exec = require('child_process').exec;
				//var exec = require('child_process').spawn;
				function puts(error, stdout, stderr) { sys.puts(stdout) }

				process.chdir(mainPath);
				//process.chdir('../'); //console.log("Path : " + process.cwd()); //Path : /home/imappak - GOOD!
				process.chdir('../gazeborocon/src');
				console.log("Path : " + process.cwd()); //Path : /home/imappak/gazeborocon/src
				//[info] data = {cmd : cmd, name : solutionName, description : Description, license : License, version : Version, maintainer : Maintainer};
				exec("catkin_create_pkg " + data.name + ' std_msgs rospy -D \'' + data.description + '\' -l ' + data.license + ' -V ' + data.version + ' -m ' + data.maintainer, puts); 
				//gnome-terminal -x bash -c 'roslaunch rosbridge_server rosbridge_websocket.launch'
				//exec("ls -la", puts);	//exec("sudo start avahi-daemon", puts); //ok
				break; 
			case 'solutionConfigure':
				process.chdir(mainPath); //main path로 chdir				
				process.chdir('../gazeborocon/src');
				//var message = {cmd : cmd, solution : solutionName, file : fileName, content : content};
				fs.exists(data.solution, function (exists) {
					//util.debug(exists ? "it's there" : "no passwd!");
					if (!exists)
					{
						fs.mkdir(data.solution, '0777', function(err){
							if(err) throw err;
							console.log('Dir created : ' + data.solution);
						});
						
						fs.writeFile(data.solution + '/' + data.file,
							Base64.decode(data.content),
							encoding='utf-8',function(err){
							if(err) throw err;
							console.log('File writed : ' + data.file);

							var result = data.file + " is modified!";
							var message = {result : result}; 
							socket.send(message);
						});
					}
					else
					{
						fs.writeFile(data.solution + '/' + data.file,
							Base64.decode(data.content),
							encoding='utf-8',function(err){
							if(err) throw err;
							console.log('File writed : ' + data.file);
							
							var result = data.file + " is configured!";							
							var message = {result : result}; 
							socket.send(message);
						});
					}
				});	
				console.log('Configuration File : ' + data.file);
				break;
			case 'GetLocalServiceList':	//Local System의 Service List를 가져온다,			
				console.log('GetLocalServiceList'); 
				process.chdir(mainPath);				
				console.log(process.cwd());

				var fList = read(mainPath + '/myservices');
				var sList_full = new Array(), sList_short = new Array(), iList =  new Array(), mList =  new Array();
				var aNum = 0;

				fList.forEach(function(file){
					//console.log('fList : ' + file);
					iList = file.split('.');
					if (iList[1].match('service'))
					{	
						mList = iList[0].split('\\');
						sList_short[aNum] = mList[mList.length-1];
						sList_full[aNum++] = file;
						console.log(file);
					}					
				});
				
				console.log("sList.length : " + sList_full.length);

				var cmd = "GetLocalServiceList";
				var message = {cmd : cmd, list : sList_full, servicelist : sList_short};
				
				socket.send(message);
				console.log(message);

				aNum = 0;
				break;
			case 'GetLocalServiceLength':				
				console.log('GetLocalServiceLength'); 
				process.chdir(mainPath);				
				console.log(process.cwd());

				var fList = read(mainPath + '/myservices');
				var sList = new Array(), iList =  new Array();
				var aNum = 0;

				fList.forEach(function(file){					
					iList = file.split('.');
					if (iList[1].match('service'))
					{
						sList[aNum++] = file;
					}					
				});

				console.log("sList.length : " + sList.length); //11개

				var cmd = "GetLocalServiceLength";				
				var length = sList.length; //★
				var message = {cmd : cmd, length : length};
				
				socket.send(message);
				console.log(message);

				aNum = 0;
				break;
			case 'GetLocalServiceContent':				
				console.log('GetLocalServiceContent'); 
				process.chdir(mainPath);				
				console.log(process.cwd());

				var fList = read(mainPath + '/myservices');
				var sList = new Array(), iList =  new Array();
				var aNum = 0;

				fList.forEach(function(file){
					iList = file.split('.');
					if (iList[1].match('service'))
					{
						sList[aNum++] = file;
					}									
				});

				process.chdir(mainPath  + '/myservices');					
				fs.readFile(sList[data.num], 'utf8', function(err, readData) {
					if(err) throw err;
					var cmd = "GetLocalServiceContent";
					var serviceName = sList[data.num];
					var content = readData; //★
					var message_content = {cmd : cmd, service : serviceName, content : content};
					
					//socket.send(message_content);
					io.emit('message_content', message_content); //io.emit 적용!!!★
					console.log(message_content);
				});					

				aNum = 0;
				break;
		}

/*-- Node.js : fs --
	//1. 파일 확인
	var fs = require('fs'); 
	fs.exists('test1.txt', function (exists) {
		console.log(exists ? "it's there" : "no exists!");
	});

	//2. 파일 생성
	var fs = require('fs'); 
	var file = 'test1.txt';
	fs.open(file,'w',function(err,fd){
		if (err) throw err;
		console.log('file open complete');
	});
 

	//3. 파일 이름 변경
	//fs.rename() 해당파일의 이름을 변경합니다. 예제는 test1.txt -> test2.txt  로 변경합니다. 
	//해당 파일이 없거나 권한이 없다면 에러가 발생합니다. 또한 변경하려는 이름의 같은 이름의 파일이 존재하면 에러가 발생합니다.	
	var fs = require('fs');	 
	fs.rename('test1.txt', 'text2.txt', function (err) {
	  if (err) throw err;
	  console.log('renamed complete');
	});
	

	//4. 파일 삭제
	//fs.unlink() 파일을 삭제 합니다. 예제의 경우 test2.txt 파일을 삭제 합니다. 
	//해당 파이 없거나 권한이 없다면 에러가 발생합니다. 	
	var fs = require('fs');
	fs.unlink('text2.txt', function (err) {
	  if (err) throw err;
	  console.log('successfully deleted text2.txt');
	});


	//5.파일 읽기
	//fs.readFile() 해당 파일을 읽습니다. 예제의 경우 test1.txt 파일을 읽고 콘솔로 출력합니다.
	var fs = require('fs');	 
	fs.readFile('test1.txt', 'utf8', function(err, data) {
	  console.log(data);
	});
	

	//6. 파일 쓰기
	//fs.writeFile() 해당파일에 내용을 씁니다. 예제의 경우 test1.txt파일에 data의 내용을 씁니다. 
	//만일 파일이 존재 하지 않으면 파일을 생성후 내용을 씁니다. 파일의 내용을 이어서 쓰진 않습니다.	
	var fs = require('fs');	 
	var data = 'file system example!!';
	fs.writeFile('text1.txt', data, 'utf8', function(error){
		console.log('write end')
	});


	//7.파일 이어서 쓰기
	//fs.appendFile() 해당 파일에 내용을 이어서 씁니다. 
	//예제의 경우 test1.txt 에 'data to append' 를 이어서 씁니다. 파일이 없을경우 새로 생성하여 씁니다. 
	var fs = require('fs');	 
	fs.appendFile('test1.txt', 'data to append', function (err) {
	  if (err) throw err;
	  console.log('The "data to append" was appended to file!');
	});	
*/
        return;
    }); //message
 
    socket.on('disconnect', function() {
        socket.send('disconnected...');
    });
});



//Base64 API
var Base64 = { 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = Base64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4); 
		} 
		return output;
	},
 
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) { 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output = output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			} 
		} 
		output = Base64._utf8_decode(output);
 
		return output; 
	},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			} 
		} 
		return utftext;
	},
 
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			} 
		} 
		return string;
	}
}


function dateReFormat(date){	//2015-01-21(Wed)_shkwak
	var yyyy=date.getFullYear();
	var mm=date.getMonth()+1; mm=(mm<10)? "0"+mm:mm;
	var dd=date.getDate(); dd=(dd<10)? "0"+dd:dd;
	//var HH=date.getUTCHours(); HH=(HH<10)? "0"+HH:HH; //UTC
	var HH=date.getHours(); HH=(HH<10)? "0"+HH:HH; 
	var MM=date.getMinutes(); MM=(MM<10)? "0"+MM:MM;
	var ss=date.getSeconds(); ss=(ss<10)? "0"+ss:ss;
	
	return yyyy+"-"+mm+"-"+dd+'T'+HH+':'+MM+':'+ss; //'2014-09-09T16:00:00'
} 

function logging()
{
	console.log('in');
	//setTimeout(function(){
	//	logging();
	//}, 2000)
}
