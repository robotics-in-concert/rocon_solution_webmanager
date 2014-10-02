var app = require('http').createServer(handler), 
    io = require(process.env.APPDATA + '/npm/node_modules/socket.io').listen(app), 
    fs = require('fs'),
	ROSLIB = require(process.env.APPDATA + '/npm/node_modules/roslib'),
    ros = new ROSLIB.Ros();
 
app.listen(8080);
console.log("Listening on http://localhost:8080...");

ros.on('error', function(error) {
console.log(error);
});

ros.on('connection', function() {
console.log('Connection made!');
});

ros.connect('ws://192.168.0.74:9090');

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
 
// this handles socket.io comm from html files
 
io.sockets.on('connection', function(socket) {
    socket.send('connected...');
	//
    socket.on('message', function(data) {
		//date - {cmd : cmd, solution : solutionName, file : fileName[i_new], content : content};
		switch(data.cmd){
			case 'CreateSolution':				
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
							data.content, //base64 decode 필요!
							encoding='utf-8',function(err){
							if(err) throw err;
							console.log('File writed : ' + data.file);
						});
					}
					else
					{
						fs.writeFile(data.solution + '/' + data.file,
							data.content, //base64 decode 필요!
							encoding='utf-8',function(err){
							if(err) throw err;
							console.log('File writed : ' + data.file);
						});
					}
				});	
				break;
			case 'GetSolutionList':				
				console.log('Get SolutionList : yet');
				break;
			case 'GetFileList':
				console.log('Get FileList : yet');
				break;
			case 'ReadFile':
				fs.readFile(data.solution + '/' + data.file, 'utf8', function(err, readData) {
					if(err) throw err;
					var cmd = "ReadFile";
					var solutionName = data.solution;
					var fileName = data.file;
					var content = readData; //★
					var message = {cmd : cmd, solution : solutionName, file : fileName, content : content};
					//console.log(message);
					socket.send(message);
				});
				console.log('Read File');				
				//socket.broadcast.send("let there be light!");				
				break;
			case 'ModifyFile':
				console.log('Modify File : yet');
				break;
			case 'DeleteFile':
				fs.unlink(data.solution + '/' + data.file, function (err) {
					if (err) throw err;
					console.log('successfully deleted : ' + data.solution + '/' + data.file);
				});
				console.log('Delete File');
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




/*
        if (data == 'turn on') {
            console.log('+');
            //board.digitalWrite(ledPin, board.HIGH);
            socket.broadcast.send("let there be light!");

		var path = 'test1.txt';
		fs.open(path,'a+',function(err,fd){
			if(err) throw err;
			if(fd == '9'){
				console.log('file create.');
			}else{
				fs.readFile(path, 'utf8', function(err, data) {
				  console.log(data);
				});
			}

			fs.close(fd);
		});
  
        }
        if (data == 'turn off') {
            console.log('-');
            //board.digitalWrite(ledPin, board.LOW);
            socket.broadcast.send("who turned out the light?");

			//4. 파일 삭제
			fs.unlink('test1.txt', function (err) {
			  if (err) throw err;
			  console.log('successfully deleted test1.txt');
			});
        }

		if (data == 'fs_close') {
            //console.log('file closed');
            //board.digitalWrite(ledPin, board.LOW);
            //socket.broadcast.send("who turned out the light?");
			
			fs.exists('./Solutions', function (exists) {
				//util.debug(exists ? "it's there" : "no passwd!");
				if (!exists)
				{
					fs.mkdir('./Solutions', '0777', function(err){
						if(err) throw err;
						console.log('dir writed');
					});

					fs.writeFile('./Solutions/CmakeLists.txt',
						'############################################################################\r\n# CMake\r\n############################################################################\r\n\r\ncmake_minimum_required(VERSION 2.8.3)\r\nproject()\r\n\r\n############################################################################\r\n# Catkin\r\n############################################################################\r\n\r\nfind_package(catkin REQUIRED)\r\ncatkin_package()', 
						encoding='utf-8',function(err){
						if(err) throw err;
						console.log('file writed');
					});
				}
				else
				{
					fs.writeFile('./Solutions/CmakeLists.txt',
						'############################################################################\r\n# CMake\r\n############################################################################\r\n\r\ncmake_minimum_required(VERSION 2.8.3)\r\nproject()\r\n\r\n############################################################################\r\n# Catkin\r\n############################################################################\r\n\r\nfind_package(catkin REQUIRED)\r\ncatkin_package()', 
						encoding='utf-8',function(err){
						if(err) throw err;
						console.log('file writed');
					});
				}
			});									
        }
*/
        return;
    }); //message
 
    socket.on('disconnect', function() {
        socket.send('disconnected...');
    });
});
