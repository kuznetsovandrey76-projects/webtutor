ERROR = 0;
MESSAGE = "";
RESULT = [];

// Создать переменную: checked {string хранящая id}

checked = checked.split(',')

data = XQuery("for $elem in subdivisions return $elem");

for (elem in data) {
	if (checked[0]) {
		if (checked.indexOf(StrInt(elem.org_id.Value)) != -1) {
			RESULT.push({
				id: elem.id.Value, 
				name: elem.name.Value 
			});	
		}		
	} else {
			RESULT.push({
				id: elem.id.Value, 
				name: elem.name.Value 
			});
	}
}

