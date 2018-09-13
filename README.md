Сервис -> Общие настройки -> Портал -> Адрес учебного портала -> http://127.0.0.1:81/



Дизайнер -> Шаблоны документов -> new
код: <!name>
название: <!name>
Вставляем код, в разделе код
(function() {
	// code
})()

Дизайнер -> Элементы шаблонов -> new
mode: <name>, ссылка в браузере http://127.0.0.1:81/view_doc.html?mode=<name>
зона: main
шаблон: выбираем созданный "шаблон документа"



1. https://github.com/Alexander-Lv/WebTutor
2. https://ensi.gitbooks.io/progressive-webtutor/content/
3. https://maksimyurkov.gitbooks.io/web-components-in-webtutor/content/
4. Руководство системного администратора
WebTutor https://clck.ru/ELyDU 


Дизайнер -> Агенты сервера -> new
код: test_agent_001
название: Тестовый агент
выполняемый код: // можно без var
var a = 1;
var b = 'asd';
alert(a + '\n' + b);
-> Выполнить агент на стороне клиента



Запросы XQuery:
for $elem - Объект в котором хранятся запрашиваемые записи
in courses - Название таблицы из которой берутся записи. Все записи созданы по одному шаблону, и могут содержать только те поля, которые содержатся в шаблоне.
where $elem/status='publish' - Логическое условие
order by $elem/name - Сортировка записей
return $elem - Результат запроса, объект с отфильтрованными записями