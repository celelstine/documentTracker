


/**
// require express 
const firebase = require('firebase.js');
const express = require('express'),
	  app = express();
      database = firebase.database();

app.listen(3000, function() {
  console.log('listening on 3000')
});


 
function saveToList(event) {

        var docTitle = document.getElementById('txttitle').value.trim();
        var docTitle = document.getElementById('txttag').value.trim();
        var docTitle = document.getElementById('txtdepartment').value.trim();
        var docTitle = document.getElementById('doc').value.trim();
        // fetch user record
        
            saveToFB(movieName);
        }
        document.getElementById('movieName').value = '';
        return false;
};
 
function saveToFB(movieName) {
    // this will save data to Firebase
    favMovies.push({
        name: movieName
    });
};
 
function refreshUI(list) {
    var lis = '';
    for (var i = 0; i < list.length; i++) {
        lis += '<li data-key="' + list[i].key + '">' + list[i].name + '</li>';
    };
    document.getElementById('favMovies').innerHTML = lis;
};
 
// this will get fired on inital load as well as when ever there is a change in the data
favMovies.on("value", function(snapshot) {
    var data = snapshot.val();
    var list = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            name = data[key].name ? data[key].name : '';
            if (name.trim().length > 0) {
                list.push({
                    name: name,
                    key: key
                })
            }
        }
    }
    // refresh the UI
    refreshUI(list);
});

**/