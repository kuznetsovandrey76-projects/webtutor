1. Типы документов -> new
код: `cc_peoples`   
имя объекта: `cc_peoples`  
название: `name`  
отображать в блоке: где разместить  
При добавлении нового поля - Поле в каталоге

2. Создаем два шаблона
сервер:
код: !task_6
название: !task_6 - server
```
<%
__options = [];
my_date = DateOffset(Date(), 0 - (60 * 60 * 2))

__counter = XQuery("for $elem in cc_peoples where $elem/date >= date('" + StrDate(my_date) + "') return $elem");

for (elem in __counter)
{
	__options.push(elem);	
}
Response.Write(ArrayCount(__options));
%>
```
клиент:
код: task_6
название: task_6 - client
```
<div>Количество новых обращений пользователей (с момента создания которых прошло менее 2-х часов): <span id="container"></span></div>

<script type="text/javascript">

(function () {
	var container = $("#container").empty();
	function callServer() {
		$.ajax({
			type: "POST",
			url: "custom_web_template.html?object_code=!task_6",
			dataType: "json",
			success: function (data, textStatus, jqXHR) {
				console.log(data)
				$("#container").text(data)
			}
		})
	}

	callServer();
	setInterval(callServer, 1000);

})()
</script>

```
`!task_6` - шаблон сервера

3. Элементы шаблонов -> new
mode: home
зона: main
шаблон: task_6 - client 