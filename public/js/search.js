//function to fetch query string
		  	
function search(cat) {
	var searchString = document.getElementById ("txtsearch").value;
	deepSearch(cat, searchString);
}

// read query string 
				
function getUrlParameter(url) {
    url = url.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + url + '=([^&#]*)'),
    	results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function fecthSearchHistory() {
	var x = document.createElement("DATALIST");
	var searchHistoryRef = firedb.database().ref('trackdoc/searchHistory');
	var option;

	searchHistoryRef.on('value', function(snapshot) {
		var history = snapshot.val();
		console.log(history);
		var searchArray = history.split(',');
		for (var i =0 ; i<searchArray.length;i++) {
			option += '<option value="'+searchArray[i]+'" />';
		}

		var my_list=document.getElementById("searchlog"); 
		my_list.innerHTML = option;
		
	})
	
	



}
//function to load tags and department
function deepSearch(category,searchString) {

			
	if ( category != '' && searchString != ''){

		// clear the content
		document.getElementById("dashboard").innerHTML = "";
		var shareRef = firedb.database().ref('trackdoc/shared'),
			shared,
			dashboard = document.getElementById("dashboard"),
			pass = null,
			foundCount=0;

		// update searchlog searchString


		// fetch department
		 shareRef.orderByChild("dateReg").on('value', function(snapshot) {
			 shared = snapshot.val();
			for( key in shared ) {

				var curShare = shared[key],
			 		curusername1;
				//check for user citeria

				if ( category == 1) {
					if ( curShare.tags.toString().toLowerCase().includes(searchString.toLowerCase()) ) {
						pass =1;
					}
				} else if ( category == 3) {
					if ( curShare.title.toString().toLowerCase().includes(searchString.toLowerCase()) ) {
						pass =1;
					}
				} else if ( category == 5) {
					if (  curShare.dateReg.toString().toLowerCase().includes(searchString.toLowerCase()) ) {
						pass =1;
					}
				}  else if ( category == 2) {
					if (  curShare.departments.toString().toLowerCase().includes(searchString.toLowerCase()) ) {
						pass =1;
					}
				}  else if ( category == 4) {
					if (  curShare.sharedBy.toString().toLowerCase().includes(searchString.toLowerCase()) ) {
						pass =1;
					}
				}
						 		
				if ( pass == 1) {

					foundCount++;

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
			 		var shareurl1 = document.createElement('p');
			 		shareurl1.className ='share-url1';
			 		var lshareurl1 = document.createElement('a');
			 		lshareurl1.style.cssText  = 'color:#000053';
					var tsharetitle1 = document.createTextNode(curShare.url.toString());
					lshareurl1.appendChild(tsharetitle1);
					lshareurl1.href =curShare.url;
			 		shareurl1.appendChild(lshareurl1);
			 		userDiv.appendChild(shareurl1);
		 		}
		 	}
 		})
	}	
}