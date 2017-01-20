/**
function share() {
			
	var uploadUrl = document.getElementById('docurl').value,
		keywords = document.getElementById('keywords').value,
		dept = '',
		deptStart=0;

	// get the department
	 for (var i =1 ; i<8; i++) {
	 	var deptid = 'key' + i.toString();
	 	//console.log(deptid)
	 	if (document.getElementById(deptid).checked) {

	 		if ( deptStart == 0) {
	 			dept = document.getElementById(deptid).value.toString();
	 		} else {
	 			dept += ',' + document.getElementById(deptid).value.toString();
	 		}
	 		
	 		deptStart++;
	 	}
	}
	console.log(dept);

	//check if no dept was selected

	 if( dept == '') {
		document.getElementById('result').innerHTML = 'you must select at least one department';
	 } else {

	 	/////////////////////
	 	var userRef = firedb.database().ref('trackdoc/user'),
	 	userRef.on('value', function(snapshot) {
			 var users = snapshot.val();
			for( key in users ) {
				var curUser= users[key];
				if ( )


	 	////////////////
	 	//push share
	 	var date = new Date().toLocaleDateString(),
		uid = firedb.auth().currentUser.uid,
		//firebase database
		shareRef = firedb.database().ref('trackdoc/shared'),
		newshare = {
			"dateReg" : date,
		    "departments" : dept,
		    "sharedBy" : username,
		    "tags" : keywords,
		    "title" : uploadUrl,
		    "uid" : uid,
		    "url" : uploadUrl
		};
		console.log(newshare);
		//shareRef.push(newshare);
	 }

}
**/
// function to add the firebase project address
function addStorageUrl(docname) {

	return 'gs://trackdoc-ad797.appspot.com/sharedDoc/' + docname;
}

//function for upload
function upload() {

	if (document.getElementById('localFile').files) {
		// Get a reference to the storage service
		var storage = firebase.storage(),
			storageRef = storage.ref(),
			shareDocRef = storageRef.child('sharedDoc'),
			// Get the selected files from the input.
			fileSelect = document.getElementById('localFile'),
			files = fileSelect.files,
			curFileName,
			curFileRef,
			curFile,
			countTense,
			uploadUrl;
			
		// Loop through each of the selected files.uploadButton.innerHTML = 'Upload';
		for (var i = 0; i <files.length; i++) {

			var curFile = files[i];
			var curFileName = files[i].name;
				curFileRef = shareDocRef.child(curFileName);
				if (i == 0) {
					uploadUrl = addStorageUrl(curFile.name) ;
				} else {
					uploadUrl += ',' + addStorageUrl(curFile.name);
				}
			curFileRef.put(files[i]).then(function(snapshot) {
			
				if (i == 0) {
					uploadUrl = addStorageUrl(curFile.name) ;
				} else {
					uploadUrl += ',' + addStorageUrl(curFile.name);
				}
			
				countTense = (i>=1)?'s':'';
				console.log(i);
				document.getElementById('result').innerHTML =  'Uploading ' + (i+1) + 'file' + countTense;
			})
			.catch(function(error)	{

			   // Handle Errors here.
			    errorCode = error.code;
			     errorMessage = error.message;
			    console.log('errorCode = ' + errorCode + ', errorMessage= ' + errorMessage);
			 });
			//console.log(i+ '' + (files.length) )
			if ( i == ( (files.length)) ) {

				document.getElementById('result').innerHTML =  'Done'; 
				break;
			}
		}
		console.log(files.length);
		// set the value of the docurl to the uploaded url
		document.getElementById("docurl").value =uploadUrl.toString();
		console.log(document.getElementById("docurl").value)
	} 
}