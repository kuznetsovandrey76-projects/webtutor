ERROR = 0;
MESSAGE = "";
RESULT = [];

// Не принимает никаких переменных

data = XQuery("for $elem in orgs return $elem");

for (elem in data)
{
	RESULT.push({
		id: elem.id.Value, 
		name: elem.name.Value 
	});		
}