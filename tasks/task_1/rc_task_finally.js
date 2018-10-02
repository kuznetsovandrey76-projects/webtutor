ERROR = 0;
MESSAGE = "";
RESULT = [];

// org и division - cтроки с id
org = org.split(',')	
division = division.split(',')	

temp = {
	start: "for $elem in collaborators ",
	fullname: "", 
	position: "", 
	org: "",
	division: "",
	where: "", 
	and1: "", 
	and2: "",
	end: " return $elem"
}

if (fullname) {
	// ====
	temp.where = " where "
	// ====
	temp.fullname = " contains($elem/fullname, '"+ fullname +"') " 
} else {
	temp.fullname = ""
}

if (position) {
	// ====
	temp.where = " where "
	if (temp.fullname != "") {
		temp.and1 = " and "
	}
	// ====
	temp.position = " contains($elem/position_name, '"+ position +"') " 
} else {
	temp.position = ""
}

if (org[0]) {
	// ====
	temp.where = " where " 	
	if (temp.fullname != "" || temp.position != "") {
		temp.and1 = " and "
	}
	if (temp.fullname != "" && temp.position != "") {
		temp.and2 = " and "
	}
	// ====
	if (org.length == 1) {
		temp.org = " contains($elem/org_id, '"+ org[0] +"') "
	} else {
		// Если несколько организаций or contains
		temp.org = " (contains($elem/org_id, '"+ org[0] +"') " 
		for (i = 1, max = org.length; i < max; i++) {
			temp.org += " or contains($elem/org_id, '"+ org[i] +"') "	
		}
		temp.org += ') '		
	}
} else {
	temp.org = ""
}

if (division[0]) {
	// ====
	temp.where = " where " 	
	temp.org = ""
	if (temp.fullname != "" || temp.position != "") {
		temp.and1 = " and "
	}
	if (temp.fullname != "" && temp.position != "") {
		temp.and2 = " and "
	}
	// ====
	if (division.length == 1) {
		temp.division = " contains($elem/position_parent_id, '"+ division[0] +"') " 		
	} else {
		temp.division = " (contains($elem/position_parent_id, '"+ division[0] +"') " 
		for (i = 1, max = division.length; i < max; i++) {
			temp.division += " or contains($elem/position_parent_id, '"+ division[i] +"') "	
		}
		temp.division += ') '		
	}
} else {
	temp.division = ""
}

str = temp.start + temp.where + temp.fullname + temp.and1 + temp.position + temp.and2 + temp.org + temp.division + temp.end 
alert(str)

data = XQuery(str);

for (elem in data)
{	

	fullname = elem.fullname.Value.split(' ');
	
	RESULT.push({
		id: elem.id.Value, 
		fullname: elem.fullname.Value,
		lastname: fullname[0],
		firstname: fullname[1],
		middlename: fullname[2],
		position: elem.position_name.Value,
		org: elem.org_name.Value,
		org_id: elem.org_id.Value,
		division: elem.position_parent_name.Value,
		division_id: elem.position_parent_id.Value
	});		

}
