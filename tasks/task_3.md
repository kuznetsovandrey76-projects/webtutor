
``` javascript
alert('Агент task_3 запущен');
// Получаем массив всех сотрудников
var collaborators = XQuery("for $elem in collaborators return $elem");

var colors = [];

for (elem in collaborators) {

	// Получить URL объекта с id = elem.id
	doc_url = UrlFromDocID(elem.id);

	// Открыть объект(XML-документ) используя его URL
	open_doc = OpenDoc(doc_url);

	// Получить значение настраиваемого поля
	// в ObtainChildByKey указываем имя поля
	custom_value = open_doc.TopElem.custom_elems.ObtainChildByKey("hair_color").value;
	
	// Если в массиве нет такого элемента, добавляем
	if (colors.indexOf( custom_value ) == -1) {
		colors.push(custom_value);		
	}

	// Получить ID объекта
	// doc_id = open_doc.DocID;

	// Получить название корневого элемента объекта
	// doc_rootName = open_doc.TopElem.id;
}


// Очищаем документ
var old_colors = XQuery("for $elem in cc_task_3s return $elem");

for (elem in old_colors) {	
	DeleteDoc(UrlFromDocID(elem.id));
}
alert('База очищена');

// где <name> - тип документа
// docPOL = OpenNewDoc( 'x-local://udt/udt_<name>.xmd');
docPOL = OpenNewDoc( 'x-local://udt/udt_cc_task_3.xmd');

for (elem in colors) {
	docPOL.TopElem.hair_color = elem;
	docPOL.BindToDb();
	docPOL.Save();
}

alert('Данные обновлены')
```
