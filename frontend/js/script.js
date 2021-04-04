function request(api, status, method, data = null, header = []){
	return new Promise(function(resolve, reject){
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == status) {
				resolve(JSON.parse(this.responseText));
			} else if (this.readyState == 4 && this.status != status) {
				reject();
			}
		}
		request.open(method, "http://localhost:3000/api/" + api);
		for (let content of header) {
			request.setRequestHeader(content.key, content.value);
		}
		request.send(data);
	});
};