//function to load tags and department
function upload() {
	console.log('test');
}
function loadDB() {

	var shareRef = firedb.database().ref('trackdoc/shared'),
		shared,
		dashboard = document.getElementById("dashboard"),
		pass = null,
		foundCount=0;
	// fetch shareDDoc       
	shareRef.orderByChild("dateReg").on('value', function(snapshot) {
	
		 shared = snapshot.val();
		 for( key in shared ) {

	 		var curShare = shared[key],
		 		curusername1;
		 		console.log(curShare);

				 		var userDiv = document.createElement('div');
				 		userDiv.className = "doc";
				 		dashboard.appendChild(userDiv);

									 		// append user-name
				 		var user_name = document.createElement('p');
				 		user_name.className ='user-name';

				 		var username = document.createTextNode(curShare.sharedBy);
				 		user_name.appendChild(username);
				 		userDiv.appendChild(user_name);
				 		// append share-date
				 		var sharedate = document.createElement('p');
				 		sharedate.className ='share-date';
				 		var lsharedate = document.createTextNode(curShare.dateReg);
				 		sharedate.appendChild(lsharedate);
				 		userDiv.appendChild(sharedate);
				 		// append share-title1
				 		var sharetitle1 = document.createElement('p');
				 		sharetitle1.className ='share-title1';
				 		var lsharetitle1 = document.createTextNode(curShare.title);
				 		sharetitle1.appendChild(lsharetitle1);
				 		userDiv.appendChild(sharetitle1);

				 		// append share-url1
				 		// split the url
				 		var urlArr =curShare.url.toString().split(',');
				 		for (var i=0; i<urlArr.length;i++) {

				 			var shareurl1 = document.createElement('p');
					 		shareurl1.className ='share-url1';
					 		var lshareurl1 = document.createElement('a');
					 		lshareurl1.style.cssText  = 'color:#000053';
							var tsharetitle1 = document.createTextNode(urlArr[i].toString());
							lshareurl1.appendChild(tsharetitle1);
							lshareurl1.href =urlArr[i];
					 		shareurl1.appendChild(lshareurl1);
					 		userDiv.appendChild(shareurl1);
				 		}
				 		

				 		continue;

	
			 	
		}
	})

}