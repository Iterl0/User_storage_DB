var name, age, points, storage, id = "";

var table = document.getElementById("myTableData");	
var rowCount = table.rows.length;

k = 0;

i =	sessionStorage.getItem("usersArr")==null &&
	localStorage.getItem("usersArr")==null &&
	getCookie("usersArr")==null ? 0 : null;

if (i===null) {
	assign_initial_id();
}

i > 0 ? i++ : null;

sessionStorage.getItem("usersArr")==null &&
localStorage.getItem("usersArr")==null &&
getCookie("usersArr")==null ? null : scan_storage_for_data();

function scan_storage_for_data() {
	user_data = JSON.parse(localStorage.getItem("usersArr"));
	arr_length = localStorage.getItem("usersArr")==null ? null : JSON.parse(localStorage.getItem("usersArr")).usersArr.length;
	pull_storage_values();	
	user_data = JSON.parse(sessionStorage.getItem("usersArr"));
	arr_length = sessionStorage.getItem("usersArr")==null ? null : JSON.parse(sessionStorage.getItem("usersArr")).usersArr.length;
	pull_storage_values();	
	user_data = JSON.parse(getCookie("usersArr"))	;
	arr_length = getCookie("usersArr")==null ? null : JSON.parse(getCookie("usersArr")).usersArr.length;
	pull_storage_values();	
	
}

function pull_storage_values() {
	for (k = 0; k<arr_length; k++) {
		insert_data();
	}	
}

function assign_initial_id() {
	max_id_ses = JSON.parse(sessionStorage.getItem("usersArr"))!==null ? JSON.parse(sessionStorage.getItem("usersArr")).usersArr.length==0 ? 0 : JSON.parse(sessionStorage.getItem("usersArr")).usersArr.slice(-1)[0].id : null;
	max_id_loc = JSON.parse(localStorage.getItem("usersArr"))!==null ? JSON.parse(localStorage.getItem("usersArr")).usersArr.length==0 ? 0 : JSON.parse(localStorage.getItem("usersArr")).usersArr.slice(-1)[0].id : null;
	max_id_coc = getCookie("usersArr")!=null ? JSON.parse(getCookie("usersArr")).usersArr.length==0 ? 0 : JSON.parse(getCookie("usersArr")).usersArr.slice(-1)[0].id : null;
	i = Math.max(max_id_coc, max_id_loc, max_id_ses);
		
}



var user_arr = [];	

var current_storage;  

var user_data = "";
var user = "";

var nox = "Yes";

var usersArr_ses_val = "";




function action() {
	k = 0;
	assign_user_val();
	user_push_to_storage();
	user_data = JSON.parse(user);
	insert_data();
	i++;

}


function assign_user_val() {
	 current_storage = window.local.checked ? window.local.id :
	 window.cookies.checked ? window.cookies.id :
	 window.session.checked ? window.session.id : null;
	 user = '{ "usersArr" :' + 
 '['+'{ "name": "' + window.in_name.value +
 '", "age": "'+ window.in_age.value +
 '", "points": "'+ window.in_points.value +
 '", "storage": "'+ current_storage +
 '", "id": "'+ i + '" }'+']' + '}';
}


function user_push_to_storage() {
	window.local.checked ? push_loc() : window.cookies.checked ? push_cok() : window.session.checked ? push_ses() : null; 

	function push_ses() {
		if (sessionStorage.getItem("usersArr")==null) {
		sessionStorage.setItem('usersArr', user);
		}
		else {
		usersArr_val = JSON.parse(sessionStorage.getItem("usersArr"));
		userArr_val_push();
		sessionStorage.setItem('usersArr', JSON.stringify(usersArr_val));		
		}
	}

	function push_loc() {
		if (localStorage.getItem("usersArr")==null) {
			localStorage.setItem("usersArr", user);
		}
		else {
		usersArr_val = JSON.parse(localStorage.getItem("usersArr"));
		userArr_val_push();
		localStorage.setItem('usersArr', JSON.stringify(usersArr_val));			
		}
	}

	function push_cok() {
		if (getCookie("usersArr")==null) {
			document.cookie = "usersArr" + "=" + user;
		}
		else {
		usersArr_val = JSON.parse(getCookie("usersArr"));
		userArr_val_push();
		document.cookie = "usersArr=" + JSON.stringify(usersArr_val);			
		}
	}		
	
}

	function userArr_val_push() {
		usersArr_val["usersArr"].push( {
   "name": window.in_name.value,
   "age": window.in_age.value, 
   "points":  window.in_points.value, 
   "storage":  current_storage,
   id:  i 
	} );	 	
	 } 


function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


function insert_data() {
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML= user_data.usersArr[k].name;
    row.insertCell(1).innerHTML= user_data.usersArr[k].age;
    row.insertCell(2).innerHTML= user_data.usersArr[k].points;
    row.insertCell(3).innerHTML= user_data.usersArr[k].id;
    row.insertCell(4).innerHTML= user_data.usersArr[k].storage;
 	row.insertCell(5).innerHTML= '<button id="edit" type="button" class="btn btn-default" onclick="entry_manipulate(this); edit_user_data()" aria-label="Left Align"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button><button id="del_user" type="button" class="btn btn-default" onclick="entry_manipulate(this); delete_user_data()" aria-label="Left Align"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>';	
}

function entry_manipulate(input) {
	edit_id_target = input.parentNode.parentNode.cells[3].innerHTML;
	edit_storage_target = input.parentNode.parentNode.cells[4].innerHTML;

	target_storage = edit_storage_target=="session" ? JSON.parse(sessionStorage.getItem("usersArr")) :
				     edit_storage_target=="local" ? JSON.parse(localStorage.getItem("usersArr")) :
				     edit_storage_target=="cookies" ? JSON.parse(getCookie("usersArr")) : null;

	try {
		find_target_obj();
	}
	catch(err) {} 
	finally {
	    
	}
}

function edit_user_data() {

		document.getElementById("in_name").value=target_storage.usersArr[target_obj].name;	
		document.getElementById("in_age").value=target_storage.usersArr[target_obj].age;	
		document.getElementById("in_points").value=target_storage.usersArr[target_obj].points;	
    document.getElementById("main_button").value="Modify";
	document.getElementById("edit_info_div").innerHTML = "";
	var edit_inf_to_div = document.getElementById("edit_info_div");
	edit_inf_to_div.innerHTML += " id: " + target_storage.usersArr[target_obj].id + ";" + '<p>' + "storage: " + target_storage.usersArr[target_obj].storage + '</p>';
}

function delete_user_data(){
		storage = target_storage.usersArr[target_obj].storage;
    	target_storage.usersArr.splice(target_obj, 1);

	if (storage=="session") {
		// splice();
		sessionStorage.setItem('usersArr', JSON.stringify(target_storage));
	}
	if (storage=="local") {
		// splice();
		localStorage.setItem('usersArr', JSON.stringify(target_storage));		
	}
	if (storage=="cookies") {
		// splice();	
		document.cookie = "usersArr" + "=" + JSON.stringify(target_storage);		
	}
	    
    blank_table();
    scan_storage_for_data();		
}


function find_target_obj() {
		for (j = 0; j<i+10; j++) {
			str = target_storage.usersArr[j].id;
			patt = new RegExp(edit_id_target);
			res = patt.test(str);
			res==true ? target_obj = j : null;
			}
	}

function modify_value() {
	target_storage.usersArr[target_obj].name = window.in_name.value;
	target_storage.usersArr[target_obj].age = window.in_age.value;
	target_storage.usersArr[target_obj].points = window.in_points.value;

	new_obj_toPush = target_storage.usersArr[target_obj];

	if (target_storage.usersArr[target_obj].storage=="session") {
		initial_storage_obj = JSON.parse(sessionStorage.getItem("usersArr")); //initial storage obj
		initial_storage_obj.usersArr[target_obj] = new_obj_toPush;
		sessionStorage.setItem('usersArr', JSON.stringify(initial_storage_obj));
	}
	if (target_storage.usersArr[target_obj].storage=="local") {
		initial_storage_obj = JSON.parse(localStorage.getItem("usersArr")); //initial storage obj
		initial_storage_obj.usersArr[target_obj] = new_obj_toPush;
		localStorage.setItem('usersArr', JSON.stringify(initial_storage_obj));	
	}
	if (target_storage.usersArr[target_obj].storage=="cookies") {
		initial_storage_obj = JSON.parse(getCookie("usersArr")); //initial storage obj
		initial_storage_obj.usersArr[target_obj] = new_obj_toPush;
		document.cookie = "usersArr" + "=" + JSON.stringify(initial_storage_obj);		
	}


	document.getElementById("main_button").value="Submit";
	document.getElementById("edit_info_div").innerHTML = "";
	blank_table();
	scan_storage_for_data();




}

function blank_table() {
	document.getElementById("myTableData").innerHTML = "";
	document.getElementById("myTableData").innerHTML =
	 '<thead>' +  
      '<tr>' +
        '<th>Name</th>' +
        '<th>Age</th>' +
        '<th>Points</th>' + 
        '<th>Id</th>' +
        '<th>Storage</th>' +
        '<th>Actions</th>' +
      '</tr>' +
    '</thead>';	
}


//----------------------------validation



var ST=0;


	function Ftest (obj) {
		// if (ST)	 return; 
		var ov = obj.value;
		obj.id == "in_name" ? ovrl = ov.replace (/[A-Za-z]*/, '').length : null;
		obj.id == "in_age" ? ovrl = ov.replace (/^([0]?([1-9]+(\d*)?)?)?$/, '').length : null; 
		obj.id == "in_points" ? ovrl = ov.replace (/^([0]?([1-9]+(\d*)?)?)?$/, '').length : null; 
		// var ovrl = ov.replace (/^[-]?([0]?([1-9]+(\.?\d*)?)?)?$/, '').length; 
		// var ovrl = ov.replace (/^[-]?[0-9]{0-2}(\.?\d{1.2})?$/, '').length; 
		ST = true;
		if (ovrl > 0) {obj.value = obj.lang; Fshowerror (obj); return}
		obj.lang = obj.value; ST = null;
	}
 
function Fshowerror (obj) {
	if (!this.OBJ) {
		this.OBJ = obj; 
		obj.style.backgroundColor = 'pink'; 
		this.TIM = setTimeout (Fshowerror, 50)
	}
	else {
		this.OBJ.style.backgroundColor = ''; 
		clearTimeout (this.TIM); 
		ST = null; 
		Ftest (this.OBJ); 
		this.OBJ = null} return
	}
