// Создать переменные: 
// id - string
// lastname - string
// firstname - string
// middlename - string
// fullname - string
// position - string
// org - string
// division - string

// Первоначальное название Позиции
// old_position - string

// Обновляем ФИО в XML
collaboratorXML = OpenDoc( UrlFromDocID(Int(id)))
collaboratorXML.TopElem.lastname = lastname
collaboratorXML.TopElem.firstname = firstname
collaboratorXML.TopElem.middlename = middlename

collaboratorXML.TopElem.position_parent_name = division
collaboratorXML.TopElem.org_name = org
collaboratorXML.Save()

// Если позиции не было
// ИСПРАВИТЬ
if (old_position === "") {

	alert(old_position)

	newPositionXML = OpenNewDoc( 'x-local://wtv/wtv_position.xmd');
	newPositionXML.TopElem.name = position;
	newPositionXML.TopElem.org_id = Int(ArrayOptFirstElem(XQuery("for $elem in orgs where $elem/name='" + org + "' return $elem")).id.Value);
	newPositionXML.TopElem.parent_object_id = Int(ArrayOptFirstElem(XQuery("for $elem in subdivisions where $elem/name='" + division + "' return $elem")).id.Value);
	newPositionXML.TopElem.basic_collaborator_id  = Int(id);
	// newPositionXML.TopElem.basic_collaborator_fullname = fullname;
	newPositionXML.BindToDb();		
	newPositionXML.Save();

	// Изменяем значение в XML сотрудника и XML должности
	collaboratorXML = OpenDoc( UrlFromDocID(Int(id)))
	collaboratorXML.TopElem.position_name = position
	collaboratorXML.TopElem.position_id = Int(ArrayOptFirstElem(XQuery("for $elem in positions where $elem/name='" + position + "' return $elem")).id.Value);
	collaboratorXML.Save();
} else 
// Позиция изменена
if (old_position !== position) {

	// Изменяем значение в XML сотрудника и XML должности
	collaboratorXML = OpenDoc( UrlFromDocID(Int(id)))
	collaboratorXML.TopElem.position_name = position
	collaboratorXML.Save();

	// Забираю предыдущий id позиции
	position_id = collaboratorXML.TopElem.position_id
	positionXML =  OpenDoc( UrlFromDocID(Int(position_id)))
	positionXML.TopElem.name = position
	// Берем id организации из выборки
	positionXML.TopElem.org_id = Int(ArrayOptFirstElem(XQuery("for $elem in orgs where $elem/name='" + org + "' return $elem")).id.Value);
	positionXML.TopElem.parent_object_id = Int(ArrayOptFirstElem(XQuery("for $elem in subdivisions where $elem/name='" + division + "' return $elem")).id.Value);
	positionXML.TopElem.name = position

	positionXML.Save();
}

// По id заходим в карточку сотрудника
__item = ArrayOptFirstElem(XQuery("for $elem in collaborators where $elem/id=" + id + " return $elem"));

// Изменения в карточке сотрудника, Если должность указана
if (__item != undefined)
{
	// Обновляем данные в карточке сотрудника
	__item.position_name = position
	__item.fullname = fullname
	__item.org_name = org
	__item.org_id = Int(ArrayOptFirstElem(XQuery("for $elem in orgs where $elem/name='" + org + "' return $elem")).id.Value);
	// Основное подразделение
	__item.position_parent_name = division
	__item.position_parent_id = Int(ArrayOptFirstElem(XQuery("for $elem in subdivisions  where $elem/name='" + division + "' return $elem")).id.Value);
}
MESSAGE = "Cохранение прошло успешно";