```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Task_1</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<style>	
		.search-block {
			width: 80%;
			margin: 0 auto;
			background: lightblue;
			border: 1px solid black;
			position: relative;
			z-index: 5;
			padding: 5px;
		}

		.org-block,
		.division-block,
		.collaborator-info {
			background: khaki;
			border: 1px solid black;
			position: absolute;
			top: 80px;	
			left: 160px;
			z-index: 10;
			width: 80%;
			padding: 5px;


		}
		.collaborator {
			cursor: pointer;
		}
		.result {
			width: 80%;
			margin: 10px auto;
		}
		.collaborator-info__table td{
			width: 40%;
		}
	</style>
	<style>
    #filter-table{
        width: 100%;
    }
    #filter-table th{
        background-color: #dadada;
    }
    #filter-table td, #filter-table th{
        padding: 5px;
        border-bottom: 1px solid #ccc;
    }
		</style>
</head>
<body>
	
	<!-- SEARCH -->
	<div id="search-block" class="search-block">
		<table>
			<tr>
				<td><label for="fullname">ФИО:</label>	</td>
				<td><input class="input-field" id="fullname" type="text"></td>
			</tr>
			<tr>
				<td><label for="position">Должность:</label></td>
				<td><input class="input-field" id="position" type="text"></td>
			</tr>
			<tr id="search-block__org">
				<td><label for="org">Организация:</label></td>
				<td><input class="input-field" id="org-button" type="button" value="Выбрать"></td>
			</tr>
			<tr id="search-block__division">
				<td><label for="division">Подразделение:</label></td>
				<td><input class="input-field" id="division-button" type="button" value="Выбрать"></td>
			</tr>
			<tr>
				<td><button id="search">Найти</button></td>
				<td></td>
			</tr>
		</table>
	</div>


	<!-- ORG -->
	<div id="org-block" class="org-block">
		<div id="find-org-block">
		<!--  -->
		</div>

		<!-- <button id="org-search">Найти</button>		 -->
	</div>

	<!-- DIVISION -->
	<div id="division-block" class="division-block">	
		<div id="find-division-block">
		<!--  -->
		</div>		
	</div>



	<!-- RESULT -->
	<div id="result" class="result">
		<table id="filter-table">
		    <tr>
		        <th>id</th>
		        <th>ФИО</th>
		        <th>Должность</th>
		        <th>Организация</th>
		        <th>Подразделение</th>
		    </tr>
<!-- 		    <tr class='table-data'>
		        <td class="collaborator-id">10</td>
		        <td id="collaborator-1" class="collaborator">Иванов Иван Иванович</td>
		        <td>Слесарь</td>
		        <td>ООО Рога и копыта</td>
		        <td>Производство</td>
		    </tr>
		    <tr class='table-data'>
		        <td class="collaborator-id">20</td>
		        <td id="collaborator-2" class="collaborator">Петров Андрей Иванович</td>
		        <td>Программист</td>
		        <td>Лабмедия</td>
		        <td>Инженеры</td>
		    </tr>
		    <tr class='table-data'>
		        <td class="collaborator-id">30</td>
		        <td id="collaborator-3" class="collaborator">Смирнов Андрей Иванович</td>
		        <td>Учитель</td>
		        <td>МОУ СОШ №3 школа</td>
		        <td>Физкультура</td>
		    </tr> -->
		</table>
	</div>

	<!-- MODAL -->
	<div id="collaborator-info" class="collaborator-info">
		<table class="collaborator-info__table">
			<tr>
				<td>Фамилия:</td>
				<td id="collaborator-info--lastname"></td>
				<td><button id="edit-collaborator-info--lastname">Редактировать</button></td>
			</tr>
			<tr>
				<td>Имя:</td>
				<td id="collaborator-info--firstname"></td>
				<td><button id="edit-collaborator-info--firstname">Редактировать</button></td>
			</tr>
			<tr>
				<td>Отчество:</td>
				<td id="collaborator-info--middlename"></td>
				<td><button id="edit-collaborator-info--middlename">Редактировать</button></td>
			</tr>
			<tr>
				<td>Должность:</td>
				<td id="collaborator-info--position"></td>
				<td><button id="edit-collaborator-info--position">Редактировать</button></td>
			</tr>
			<tr>
				<td>Организация:</td>
				<td id="collaborator-info--org"></td>
				<td><button id="edit-collaborator-info--org">Редактировать</button></td>
			</tr>
			<tr>
				<td>Подразделение:</td>
				<td id="collaborator-info--division"></td>
				<td><button id="edit-collaborator-info--division">Редактировать</button></td>
			</tr>
			<tr>
				<td><button id="collaborator-save">Сохранить</button></td>
				<td></td>
			</tr>
		</table>
	</div>

	<script>
		$( document ).ready(function() {
			// Скрываем блоки выбора ======
			$('#org-block').hide()
			$('#division-block').hide()
			$('#result').hide()
			$('#collaborator-info').hide()
			// ============================

       		// ВЫБОРКИ =========================== 
       		// Организации
		    $('#org-button').click(function() {
				$.ajax({
					type: "POST",
					url: "/pp/Ext/extjs_json_collection_data.html",
					dataType: "json",
					data: {
						collection_code: "rc_task_finally_org",
						parameters: ''
						// parameters: "fullname=" + fullname.dom.value 
						// 			+ ";gender=" + gender.dom.value 
					},
					success: function (data, textStatus, jqXHR) {

						// Обнуляем #find-org-block
						$('#find-org-block').text('')

						// Проверяем какие элементы уже выбраны .checked-org
						var already_checked = []

						if ($('.checked-org').length) {
							for (var i = 0, max = $('.checked-org').length; i < max; i++) {
								already_checked.push($('.checked-org')[i].children[0].textContent)
							}
						} 

						// Прорисовка блока выбора ОРГАНИЗАЦИЙ =====================
						var button = $('<button id="org-search">Найти</button>')

						for (elem in data.results) {
							var id = data.results[elem].id
							var name = data.results[elem].name
							var input = $('<input type="checkbox" name="org" value="' + name + '" id="' + id + '" />')
							if(already_checked.indexOf(name) != -1) {
								input.prop('checked', true);								
							}

							var label = $('<label for="' + id + '">"' + name + '"</label><br>')

				    		$('#find-org-block').append(input)					
				    		$('#find-org-block').append(label)					
						}

						// После добавления всех checkbox
			    		$('#find-org-block').append(button)		
			    						

			    		$('#org-search').click(function() {	    				
			    				// Выбранные элементы
			    				var checked = []

			    				// Получаем DOM структуру #org-search
			    				var org_search_DOM = $(this).context.parentNode.children
			    				for (var i = 0, max = org_search_DOM.length; i < max; i++) {
			    					if (org_search_DOM[i].checked) {
			    						checked.push({
			    							id: org_search_DOM[i].id,
			    							name: org_search_DOM[i].value
			    						})
			    					}
			    				}

			    				// Массив из объектов выбранных элементов 
			    				// {id: "6537284716620812580", name: "Yandex"}

			    				// Если есть checked - прорисовываем
			    				if (checked.length > 0) {
			    					// Вставляем выбранные элементы после #search-block__org

			    					// Очищаем от старых значений
									$('.checked-org').remove()
			    					
			    					for (elem in checked) {
			    						var name = checked[elem].name
							    		var tr = $('<tr></tr>')
							    		var td = $('<td></td>')
							    		var button = $('<button>X</button>')
							    		button.click(function() {
							    			// Удаляем блок
							    			$(this).context.parentNode.parentNode.remove()
							    		})
							    		td.append(button)
							    		tr.addClass('checked-org')
							    		tr.append('<td>' + name + '</td>')
							    		tr.append(td)
		    							$('#search-block__org').after(tr)			    						
			    					}
			    				}

			    				$('#org-block').hide()
			    		});
						// =====================================================
					}
				});

				setTimeout(function() {
	    			$('#org-block').show()
				}, 200);	
		    });

       		// Подразделения
    		$('#division-button').click(function() {

    			// РАЗЛИЧИЯ ===============================================
    			// Посмотреть какие организации выбраны
    			// передать их в параметры
				var already_checked = []

				if ($('.checked-org').length) {
					for (var i = 0, max = $('.checked-org').length; i < max; i++) {
						already_checked.push($('.checked-org')[i].children[0].textContent)
					}
				} 
    			// ========================================================

				$.ajax({
					type: "POST",
					url: "/pp/Ext/extjs_json_collection_data.html",
					dataType: "json",
					data: {
						collection_code: "rc_task_finally_division",

						// Добавляем переменную checked в выборке
						parameters: 'checked=' + already_checked.toString()
					},
					success: function (data, textStatus, jqXHR) {

						// Обнуляем #find-division-block
						$('#find-division-block').text('')

						// Проверяем какие элементы уже выбраны .checked-division
						var already_checked = []

						if ($('.checked-division').length) {
							for (var i = 0, max = $('.checked-division').length; i < max; i++) {
								already_checked.push($('.checked-division')[i].children[0].textContent)
							}
						} 

						// Прорисовка блока выбора ОРГАНИЗАЦИЙ =====================
						var button = $('<button id="division-search">Найти</button>')

						for (elem in data.results) {
							var id = data.results[elem].id
							var name = data.results[elem].name
							var input = $('<input type="checkbox" name="division" value="' + name + '" id="' + id + '" />')
							if(already_checked.indexOf(name) != -1) {
								input.prop('checked', true);								
							}

							var label = $('<label for="' + id + '">"' + name + '"</label><br>')

				    		$('#find-division-block').append(input)					
				    		$('#find-division-block').append(label)					
						}

						// После добавления всех checkbox
			    		$('#find-division-block').append(button)		
			    						

			    		$('#division-search').click(function() {	    				
			    				// Выбранные элементы
			    				var checked = []
			    				// Получаем DOM структуру #division-search
			    				var division_search_DOM = $(this).context.parentNode.children
			    				for (var i = 0, max = division_search_DOM.length; i < max; i++) {
			    					if (division_search_DOM[i].checked) {
			    						checked.push({
			    							id: division_search_DOM[i].id,
			    							name: division_search_DOM[i].value
			    						})
			    					}
			    				}
			    				// Массив из объектов выбранных элементов 
			    				// {id: "6537284716620812580", name: "Yandex"}

			    				// Если есть checked - прорисовываем
			    				if (checked.length > 0) {
			    					// Вставляем выбранные элементы после #search-block__division

			    					// Очищаем от старых значений
									$('.checked-division').remove()
			    					
			    					for (elem in checked) {
			    						var name = checked[elem].name
							    		var tr = $('<tr></tr>')
							    		var td = $('<td></td>')
							    		var button = $('<button>X</button>')
							    		button.click(function() {
							    			// Удаляем блок
							    			$(this).context.parentNode.parentNode.remove()
							    		})
							    		td.append(button)
							    		tr.addClass('checked-division')
							    		tr.append('<td>' + name + '</td>')
							    		tr.append(td)
		    							$('#search-block__division').after(tr)			    						
			    					}
			    				}

			    				$('#division-block').hide()
			    		});
						// =====================================================
					}
				});

				setTimeout(function() {
	    			$('#division-block').show()
				}, 200);	
		    });				
		    // ===================================			

		    // ПОИСК
		    $('#search').click(function() {
		    	// Введенные значения
	    		var fullname = $('#fullname').val()
	    		var position = $('#position').val()
	    		var orgs = []
	    		var org = $('.checked-org')
	    		for (var i = 0; i < org.length; i++) {
		    		orgs.push(org[i].textContent)	    			
	    		}
	    		var divisions = []
	    		var division = $('.checked-division')
	    		for (var i = 0; i < division.length; i++) {
		    		divisions.push(division[i].textContent)	    			
	    		}

	    		console.log(fullname, position, orgs.toString(), divisions.toString())
		    	// Обращение к выборке
				$.ajax({
					type: "POST",
					url: "/pp/Ext/extjs_json_collection_data.html",
					dataType: "json",
					data: {
						collection_code: "rc_task_finally",
						// parameters: ''
						parameters: "fullname=" + fullname + ";position=" + position +
									";org=" + orgs.toString() + ";division=" + divisions.toString()
					},
					success: function (data, textStatus, jqXHR) {

						// Прорисовка таблицы =====================
						for (elem in data.results) {
						    var tr = $('<tr></tr>')
						    tr.addClass('table-data')

						    for(var i = 0; i < 5; i++) {
						    	var td = $('<td></td>')

						    	if (i === 0) {
						    		td.addClass('collaborator-id')
						    		td.attr('id', data.results[elem].id )
						    		td.text(data.results[elem].id)

						    	} else if (i === 1) {
						    		td.addClass('collaborator')
						    		td.text(data.results[elem].fullname)
						    	} else if (i === 2) {
						    		td.text(data.results[elem].position)
						    	} else if (i === 3) {
						    		td.text(data.results[elem].org)
						    	} else if (i === 4) {
						    		td.text(data.results[elem].division)
						    	}		 			
						    	
						    	tr.append(td)
						    }		

				    		$('#filter-table').append(tr)					
						}
						// Прорисовка таблицы =====================

					}
				});

				// Обработка ajax
				setTimeout(function() {

					// Работа с элементами результатов ============================
					$('.collaborator').click(function() {
						console.log('ok')
							var select_item = $(this).context.parentNode.children;
							// Получаем id выбранного элемента
							var fullname = select_item[1].textContent.split(' ');
							var user = {
								id: select_item[0].textContent,
								lastname: fullname[0],
								firstname: fullname[1],
								middlename: fullname[2],
								position: select_item[2].textContent,
								org: select_item[3].textContent,
								division: select_item[4].textContent,
							}

							// console.log(user)

							$('#collaborator-info').show()
							$('#collaborator-info--lastname').text(user.lastname)
							$('#collaborator-info--firstname').text(user.firstname)
							$('#collaborator-info--middlename').text(user.middlename)
							$('#collaborator-info--position').text(user.position)
							$('#collaborator-info--org').text(user.org)
							$('#collaborator-info--division').text(user.division)
					});

					$('#collaborator-save').click(function() {
							$('#collaborator-info').hide()
					});

						// EDIT COLLABORATOR +++++++++++++++++++++++++++++++++++++++
						$('#edit-collaborator-info--lastname').click(function() {

							// Изменить текст кнопки
							console.log($(this).context.parentNode.children[0].textContent)
							
							if ($(this).context.parentNode.children[0].textContent === 'Редактировать') {

								// Изменяемое поле
								var edit_items = $(this).context.parentNode.parentNode.children[1]

								// Получить текст изменяемого поля
								console.log(edit_items.textContent)
								var input = document.createElement('input');
								input.value = edit_items.textContent;
								
								edit_items.textContent = ''						
								
								edit_items.append(input)


								$(this).context.parentNode.children[0].textContent = 'ок';
							} else {
								$(this).context.parentNode.children[0].textContent = 'Редактировать';

								// Изменяемое поле
								var edit_items = $(this).context.parentNode.parentNode.children[1]

								// Считываем значение из input 
								console.log($(this).context.parentNode.parentNode.children[1].children[0].value)
								edit_items.textContent = $(this).context.parentNode.parentNode.children[1].children[0].value;	
							}
						});
						$('#edit-collaborator-info--firstname').click(function() {

							// Изменить текст кнопки
							console.log($(this).context.parentNode.children[0].textContent)
							
							if ($(this).context.parentNode.children[0].textContent === 'Редактировать') {

								// Изменяемое поле
								var edit_items = $(this).context.parentNode.parentNode.children[1]

								// Получить текст изменяемого поля
								console.log(edit_items.textContent)
								var input = document.createElement('input');
								input.value = edit_items.textContent;
								
								edit_items.textContent = ''						
								
								edit_items.append(input)


								$(this).context.parentNode.children[0].textContent = 'ок';
							} else {
								$(this).context.parentNode.children[0].textContent = 'Редактировать';

								// Изменяемое поле
								var edit_items = $(this).context.parentNode.parentNode.children[1]

								// Считываем значение из input 
								console.log($(this).context.parentNode.parentNode.children[1].children[0].value)
								edit_items.textContent = $(this).context.parentNode.parentNode.children[1].children[0].value;	
							}
						});
						$('#edit-collaborator-info--middlename').click(function() {

							// Изменить текст кнопки
							console.log($(this).context.parentNode.children[0].textContent)
							
							if ($(this).context.parentNode.children[0].textContent === 'Редактировать') {

								// Изменяемое поле
								var edit_items = $(this).context.parentNode.parentNode.children[1]

								// Получить текст изменяемого поля
								console.log(edit_items.textContent)
								var input = document.createElement('input');
								input.value = edit_items.textContent;
								
								edit_items.textContent = ''						
								
								edit_items.append(input)


								$(this).context.parentNode.children[0].textContent = 'ок';
							} else {
								$(this).context.parentNode.children[0].textContent = 'Редактировать';

								// Изменяемое поле
								var edit_items = $(this).context.parentNode.parentNode.children[1]

								// Считываем значение из input 
								console.log($(this).context.parentNode.parentNode.children[1].children[0].value)
								edit_items.textContent = $(this).context.parentNode.parentNode.children[1].children[0].value;	
							}
						});
						$('#edit-collaborator-info--position').click(function() {

							// Изменить текст кнопки
							console.log($(this).context.parentNode.children[0].textContent)
							
							if ($(this).context.parentNode.children[0].textContent === 'Редактировать') {

								// Изменяемое поле
								var edit_items = $(this).context.parentNode.parentNode.children[1]

								// Получить текст изменяемого поля
								console.log(edit_items.textContent)
								var input = document.createElement('input');
								input.value = edit_items.textContent;
								
								edit_items.textContent = ''						
								
								edit_items.append(input)


								$(this).context.parentNode.children[0].textContent = 'ок';
							} else {
								$(this).context.parentNode.children[0].textContent = 'Редактировать';

								// Изменяемое поле
								var edit_items = $(this).context.parentNode.parentNode.children[1]

								// Считываем значение из input 
								console.log($(this).context.parentNode.parentNode.children[1].children[0].value)
								edit_items.textContent = $(this).context.parentNode.parentNode.children[1].children[0].value;	
							}
						});
						$('#edit-collaborator-info--org').click(function() {
							console.log($(this));
						});
						$('#edit-collaborator-info--division').click(function() {
							console.log($(this));
						});
						// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
						// ===============================================================================	
					
	    			$('#result').show()
				}, 200);
		    });

		});
	</script>
</body>
</html>
```
Выборка rc_task_finally   
``` javascript
ERROR = 0;
MESSAGE = "";
RESULT = [];

// Создаем переменные строки
// fullname, position, org, division

data = XQuery("for $elem in collaborators return $elem");

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
		division: elem.position_parent_name.Value
	});		

}
```
Выборка rc_task_finally_division
``` javascript
ERROR = 0;
MESSAGE = "";
RESULT = [];

data = XQuery("for $elem in subdivisions return $elem");

data_org = XQuery("for $elem in orgs return $elem");


list_orgs = []
// [{id: 6537284716620812579, name: 'ООО Рога и Копыта'},
 // {id: 6537284716620812580, name: 'Yandex'}]

for (elem in data_org)
{
	list_orgs.push({
		id: elem.id.Value, 
		name: elem.name.Value 
	});		
}

// в checked приходят выбранные организации
// Yandex,ООО Рога и Копыта

// Преобразуем в массив
// ["Yandex", "ООО Рога и Копыта"]
checked = checked.split(',')

stop_list_id = []


for (check in checked) {
	for (org in list_orgs)
	{
		if (org.name === check) {
			// Название преобразуем в id
			stop_list_id.push(org.id);	
		}
	}
}


for (elem in data)
{
	if (stop_list_id.indexOf(elem.org_id.Value) != -1 || stop_list_id.length == 0) {		
		RESULT.push({
			id: elem.id.Value, 
			name: elem.name.Value 
		});		
	}
}
```
Выборка rc_task_finally_org
``` javascript
ERROR = 0;
MESSAGE = "";
RESULT = [];

data = XQuery("for $elem in orgs return $elem");

for (elem in data)
{
	RESULT.push({
		id: elem.id.Value, 
		name: elem.name.Value 
	});		
}
```
