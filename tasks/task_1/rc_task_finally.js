ERROR = 0;
MESSAGE = "";
RESULT = [];

// org и division - cтроки с id

test = []
if (fullname)
{
	test.push(" contains($elem/fullname, '"+ fullname +"') ")
} 
if (position)
{
	test.push(" contains($elem/position_name, '"+ position +"') ")
}

if (position)
{
	test.push(" MatchSome( $elem/position_parent_id, ( " + division + " ) ) " )	
}
 else if (org)
{
	test.push(" MatchSome( $elem/org_id, ( " + org + " ) ) " )
}

str =  "for $elem in collaborators " + (test.lengh > 0 ? "where " + test.join(" and ") : "") + " return $elem"

data = XQuery(str);

for (elem in data)
{	
	// Не разбивать по пробелу
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
