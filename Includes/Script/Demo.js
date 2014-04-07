(function(){
	var LINE_WIDTH = 10;
	var dropTarget = document.getElementById("dropTarget");
	var canvas = document.querySelector("canvas");
	var context = canvas.getContext("2d");
	var container = document.getElementById("container");
	var count = document.getElementById("count");
	var destination = document.getElementById("destination");
	var results = document.getElementById("results");
	var cx = canvas.width / 2;
	var cy = canvas.height / 2;
	var radius = Math.min(cx, cy) - LINE_WIDTH / 2;
	var startAngle = -Math.PI/2;
	var list = [];
	var totalSize = 0;
	var totalProgress = 0;
	
	function init() {
		dropTarget.addEventListener("drop", handleDrop, false);
		dropTarget.addEventListener("dragover", handleDragOver, false);
	}
	
	function drawProgress(progress) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		var endAngle = startAngle + progress * 2 * Math.PI;
		context.beginPath();
		context.strokeStyle = "#00a3ef";
		context.lineWidth = LINE_WIDTH;
		context.fillStyle = "rgb(146, 208, 80)";
		context.moveTo(cx, cy);
		context.arc(cx, cy, radius, startAngle, endAngle);
		context.closePath();
		context.fill();
		context.stroke();
	}
	
	function handleDragOver(event) {
		event.stopPropagation();
		event.preventDefault();
	}
	
	function handleDrop(event) {
		event.stopPropagation();
		event.preventDefault();
		processFiles(event.dataTransfer.files);
	}
	
	function processFiles(filelist, event) {
		if(!filelist || !filelist.length || list.length) return;
		//reset();
		for(var i = 0; i < filelist.length && i < 15; i++) {
			list.push(filelist[i]);
			totalSize += filelist[i].size;
		}
		uploadNext();
	}
	
	function reset() {
		totalSize = 0;
		totalProgress = 0;
		results.textContent = "";
	}
	
	function startUpload(file) {
		var result = document.createElement("tr");
		var name = document.createElement("td");
		var size = document.createElement("td");
		var status = document.createElement("td");
		var progress = document.createElement("progress");
		
		status.appendChild(progress);
		result.appendChild(name);
		result.appendChild(size);
		result.appendChild(status);
		results.appendChild(result);
		
		name.textContent = file.name;
		size.textContent = file.size;
		
		if(file.size >= 5000000) {
			status.textContent = "MAX SIZE EXCEEDED";
			status.className = "fail";
			size.className = "fail";
			handleComplete(file.size);
		} else {
			uploadFile(file, status, progress);
		}
	}
	
	function uploadFile(file, status, progress) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", destination.value);
		xhr.setRequestHeader("Content-Type", file.type);
		
		xhr.onload = function() {
			//status.textContent = "Upload Complete";
			status.className = "pass";
			handleComplete(file.size);
		};
		xhr.onerror = function() {
			//status.textContent = "UPLOAD FAILED";
			status.className = "fail";
			handleComplete(file.size);
		};
		xhr.upload.onprogress = function(event) {
			progress.value = event.loaded / event.total;
			handleProgress(event);
		}
		xhr.upload.onloadstart = function(event) {
			progress.setAttribute("value", "0");
		}
		
		//xhr.send(file); //
		handleComplete(file.size);
	}
	
	function handleComplete(size) {
		totalProgress += size;
		drawProgress(totalProgress / totalSize);
		uploadNext();
	}
	
	function handleProgress(event) {
		var progress = totalProgress + event.loaded;
		drawProgress(progress / totalSize);
	}
	
	function uploadNext() {
		if(list.length) {
			count.textContent = list.length;
			container.className = "uploading";
			startUpload(list.shift());
		} else {
			container.className = "";
		}
	}
	
	init();
})();