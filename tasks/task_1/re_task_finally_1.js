// Переменные: id, lastname, firstname, middlename, fullname, position, org - id, division - id

// Обновляем данные в XML collaborator
collaboratorXML = OpenDoc( UrlFromDocID(Int(id)))
collaboratorXML.TopElem.lastname = lastname
collaboratorXML.TopElem.firstname = firstname
collaboratorXML.TopElem.middlename = middlename
collaboratorXML.Save()

haveThisCollaboratorPosition = ArrayOptFirstElem(XQuery("for $elem in positions where $elem/basic_collaborator_id=" + id + " return $elem"));

// Была ли у этого сотрудника позиция в XML position
if (haveThisCollaboratorPosition != undefined) { // Была
	// Старая должность
	// alert(haveThisCollaboratorPosition.name.Value)	

	// Новая должность
	// alert(position)
	
	// Обновляем данные в XML position
	updatePositionXML = OpenDoc( UrlFromDocID(haveThisCollaboratorPosition.id.Value));
	updatePositionXML.TopElem.org_id = org
	updatePositionXML.TopElem.parent_object_id = division
	updatePositionXML.TopElem.name = position;
	updatePositionXML.TopElem.basic_collaborator_id = id;

	updatePositionXML.Save();

	collaboratorXML = OpenDoc( UrlFromDocID(Int(id)))
	collaboratorXML.TopElem.position_id = Int(haveThisCollaboratorPosition.id.Value)
	collaboratorXML.Save()

} else { // Не была	
	// На сервере создается новая должность в указанном подразделении и организации
	newPositionXML = OpenNewDoc( 'x-local://wtv/wtv_position.xmd');

	// Указано ли Подразделение save
	if (division) {
		newPositionXML.TopElem.parent_object_id = Int(division);
	}
	// Указана ли Организация save
	if (org) {
		newPositionXML.TopElem.org_id = Int(org);	
	}
	// Указано ли Должность save
	if(position) {
		newPositionXML.TopElem.name = position
	}
	
	newPositionXML.TopElem.basic_collaborator_id  = Int(id);
	newPositionXML.BindToDb();		
	newPositionXML.Save();
}

collaboratorXML = OpenDoc( UrlFromDocID(Int(id)))
// Указано ли Подразделение save
if (division) {
	collaboratorXML.TopElem.position_parent_id = Int(division)
}
// Указана ли Организация save
if (org) {
	collaboratorXML.TopElem.org_id = Int(org)	
}
collaboratorXML.Save()

MESSAGE = "Cохранение прошло успешно";
