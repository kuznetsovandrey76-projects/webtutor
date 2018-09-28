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
		.collaborator-id {
			display: none;
		}
		
		.collaborator-update-org,
		.collaborator-update-division {
			background: lightgreen;
			border: 1px solid black;
			position: absolute;
			top: 80px;	
			left: 160px;
			z-index: 20;
			width: 40%;
			padding: 5px;
		}

		/* ДОП */
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
		</div>
	</div>
	<!-- DIVISION -->
	<div id="division-block" class="division-block">	
		<div id="find-division-block">
		</div>		
	</div>
	<!-- RESULT -->
	<div id="result" class="result">
		<table id="filter-table">
		    <tr>
		        <th class="collaborator-id">id</th>
		        <th>ФИО</th>
		        <th>Должность</th>
		        <th>Организация</th>
		        <th>Подразделение</th>
		    </tr>
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
	<!-- MODAL select ORG -->
	<div id="collaborator-update-org" class="collaborator-update-org">
		<div id="select-collaborator-update-org">
		</div>
	</div>
	<!-- MODAL select DIVISION -->
	<div id="collaborator-update-division" class="collaborator-update-division">
		<div id="select-collaborator-update-division">
		</div>
	</div>
	<script>
		$( document ).ready(function() {
			// Скрываем блоки выбора ==============
			(function () {
				$('#org-block').hide()
				$('#division-block').hide()
				$('#result').hide()
				$('#collaborator-info').hide()
				$('#collaborator-update-org').hide()
				$('#collaborator-update-division').hide()				
			})()
			// ====================================
       		// ВЫБОРКИ ============================
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
						var button = $('<button id="org-search">Выбрать</button>')

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

			    				// Очищаем выбранные подразделения
				    			$('.checked-division').remove()

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
							    		var button = $('<button class="remove_checked_org">X</button>')
							    		button.click(function() {

			    							// Очищаем выбранные подразделения
				    						$('.checked-division').remove()
							    			
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
						var button = $('<button id="division-search">Выбрать</button>')

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
		    // ====================================	
		    // ПОИСК
		    $('#search').click(function() {
	    		$('.table-data').remove()
		    	
		    	// Введенные значения
	    		var fullname = $('#fullname').val()
	    		var position = $('#position').val()
	    		var orgs = []
	    		var org = $('.checked-org')
	    		for (var i = 0; i < org.length; i++) {
		    		orgs.push(org[i].textContent.slice(0,-1))	    			
	    		}
	    		var divisions = []
	    		var division = $('.checked-division')
	    		for (var i = 0; i < division.length; i++) {
		    		divisions.push(division[i].textContent.slice(0,-1))	    			
	    		}

	    		// console.log(fullname, position, orgs.toString(), divisions.toString())
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
						// console.log('ok')
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
							// !!! ОБНОВЛЯЕМ ДАННЫЕ НА СЕРВЕРЕ 
							$('#collaborator-info').hide()
					});

						// EDIT COLLABORATOR +++++++++++++++++++++++++++++++++++++++
						$('#edit-collaborator-info--lastname').click(function() {

							// Изменить текст кнопки
							// console.log($(this).context.parentNode.children[0].textContent)
							
							if ($(this).context.parentNode.children[0].textContent === 'Редактировать') {

								// Изменяемое поле
								var edit_items = $(this).context.parentNode.parentNode.children[1]

								// Получить текст изменяемого поля
								// console.log(edit_items.textContent)
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
								// console.log($(this).context.parentNode.parentNode.children[1].children[0].value)
								edit_items.textContent = $(this).context.parentNode.parentNode.children[1].children[0].value;	
							}
						});
						$('#edit-collaborator-info--firstname').click(function() {

							// Изменить текст кнопки
							// console.log($(this).context.parentNode.children[0].textContent)
							
							if ($(this).context.parentNode.children[0].textContent === 'Редактировать') {

								// Изменяемое поле
								var edit_items = $(this).context.parentNode.parentNode.children[1]

								// Получить текст изменяемого поля
								// console.log(edit_items.textContent)
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
								// console.log($(this).context.parentNode.parentNode.children[1].children[0].value)
								edit_items.textContent = $(this).context.parentNode.parentNode.children[1].children[0].value;	
							}
						});
						$('#edit-collaborator-info--middlename').click(function() {

							// Изменить текст кнопки
							// console.log($(this).context.parentNode.children[0].textContent)
							
							if ($(this).context.parentNode.children[0].textContent === 'Редактировать') {

								// Изменяемое поле
								var edit_items = $(this).context.parentNode.parentNode.children[1]

								// Получить текст изменяемого поля
								// console.log(edit_items.textContent)
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
								// console.log($(this).context.parentNode.parentNode.children[1].children[0].value)
								edit_items.textContent = $(this).context.parentNode.parentNode.children[1].children[0].value;	
							}
						});
						$('#edit-collaborator-info--position').click(function() {

							// Изменить текст кнопки
							// console.log($(this).context.parentNode.children[0].textContent)
							
							if ($(this).context.parentNode.children[0].textContent === 'Редактировать') {

								// Изменяемое поле
								var edit_items = $(this).context.parentNode.parentNode.children[1]

								// Получить текст изменяемого поля
								// console.log(edit_items.textContent)
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
								// console.log($(this).context.parentNode.parentNode.children[1].children[0].value)
								edit_items.textContent = $(this).context.parentNode.parentNode.children[1].children[0].value;	
							}
						});

						// РЕДАКТОР ОРГАНИЗАЦИИ
						$('#edit-collaborator-info--org').click(function() {

							$('#collaborator-update-org').show()

							// Запускаем тот же выбор что и в поиске
							$.ajax({
								type: "POST",
								url: "/pp/Ext/extjs_json_collection_data.html",
								dataType: "json",
								data: {
									collection_code: "rc_task_finally_org",
									parameters: ''
								},
								success: function (data, textStatus, jqXHR) {

									// Обнуляем #select-collaborator-update-org
									$('#select-collaborator-update-org').text('')

									// Прорисовка блока выбора ОРГАНИЗАЦИЙ =====================
									var button = $('<button id="update-org-search">Выбрать</button>')
									button.click(function() {
										// Заменяем текущую организацию
										// Очищаем подразделение
					    				var org_search_DOM = $(this).context.parentNode.children
					    				for (var i = 0, max = org_search_DOM.length; i < max; i++) {
					    					if (org_search_DOM[i].checked) {
					    						$('#collaborator-info--org').text(org_search_DOM[i].value)
					    					}
					    				}
										$('#collaborator-info--division').text('')
										$('#collaborator-update-org').hide()
									})

									for (elem in data.results) {
										var id = data.results[elem].id
										var name = data.results[elem].name
										var input = $('<input type="radio" name="org" value="' + name + '" id="select' + id + '" checked />')
										var label = $('<label for="select' + id + '">"' + name + '"</label><br>')

							    		$('#select-collaborator-update-org').append(input)					
							    		$('#select-collaborator-update-org').append(label)					
									}

									// После добавления всех radio
						    		$('#select-collaborator-update-org').append(button)		
						    						

						    		// $('#org-search').click(function() {	

						    		// 		// Очищаем выбранные подразделения
							    	// 		$('.checked-division').remove()

						    		// 		// Выбранные элементы
						    		// 		var checked = []

						    		// 		// Получаем DOM структуру #org-search
						    		// 		var org_search_DOM = $(this).context.parentNode.children
						    		// 		for (var i = 0, max = org_search_DOM.length; i < max; i++) {
						    		// 			if (org_search_DOM[i].checked) {
						    		// 				checked.push({
						    		// 					id: org_search_DOM[i].id,
						    		// 					name: org_search_DOM[i].value
						    		// 				})
						    		// 			}
						    		// 		}

						    		// 		// Если есть checked - прорисовываем
						    		// 		if (checked.length > 0) {
						    		// 			// Вставляем выбранные элементы после #search-block__org

						    		// 			// Очищаем от старых значений
												// $('.checked-org').remove()
						    					
						    		// 			for (elem in checked) {
						    		// 				var name = checked[elem].name
										  //   		var tr = $('<tr></tr>')
										  //   		var td = $('<td></td>')
										  //   		var button = $('<button class="remove_checked_org">X</button>')
										  //   		button.click(function() {

						    		// 					// Очищаем выбранные подразделения
							    	// 					$('.checked-division').remove()
										    			
										  //   			// Удаляем блок
										  //   			$(this).context.parentNode.parentNode.remove()
										  //   		})
										  //   		td.append(button)
										  //   		tr.addClass('checked-org')
										  //   		tr.append('<td>' + name + '</td>')
										  //   		tr.append(td)
					    			// 				$('#search-block__org').after(tr)			    						
						    		// 			}
						    		// 		}

						    		// 		$('#org-block').hide()
						    		// });
									// =====================================================
								}
							});

							// setTimeout(function() {
				   //  			$('#org-block').show()
							// }, 200);	
							// =====================================
							// console.log($(this));
						});

						// РЕДАКТОР ПОДРАЗДЕЛЕНИЙ
						$('#edit-collaborator-info--division').click(function() {

							$('#collaborator-update-division').show()

							var select_org = $('#collaborator-info--org').text()
							// console.log(select_org)

							// Запускаем тот же выбор что и в поиске
							$.ajax({
								type: "POST",
								url: "/pp/Ext/extjs_json_collection_data.html",
								dataType: "json",
								data: {
									collection_code: "rc_task_finally_division",
									parameters: 'checked=' + select_org
								},
								success: function (data, textStatus, jqXHR) {

									// Обнуляем #select-collaborator-update-division
									$('#select-collaborator-update-division').text('')

									// Прорисовка блока выбора ОРГАНИЗАЦИЙ =====================
									var button = $('<button id="update-division-search">Выбрать</button>')
									button.click(function() {
										// Заменяем текущую организацию
										// Очищаем подразделение
					    				var division_search_DOM = $(this).context.parentNode.children
					    				for (var i = 0, max = division_search_DOM.length; i < max; i++) {
					    					if (division_search_DOM[i].checked) {
					    						$('#collaborator-info--division').text(division_search_DOM[i].value)
					    					}
					    				}
										// $('#collaborator-info--division').text('')
										$('#collaborator-update-division').hide()
									})

									for (elem in data.results) {
										var id = data.results[elem].id
										var name = data.results[elem].name
										var input = $('<input type="radio" name="division" value="' + name + '" id="select' + id + '" checked />')
										var label = $('<label for="select' + id + '">"' + name + '"</label><br>')

							    		$('#select-collaborator-update-division').append(input)					
							    		$('#select-collaborator-update-division').append(label)					
									}

									// После добавления всех radio
						    		$('#select-collaborator-update-division').append(button)	
								}
							});

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

// Создать переменные: 
// fullname
// position
// org
// division

request = {
	fullname: "",
	position: "",
	org: "",
	division: ""
}

// Собираем строку запроса ========================================
if (fullname) {
	request.fullname = "contains($elem/fullname, '"+ fullname +"')" 
} else {
	request.fullname = ""
}

if (position) {
	request.position = "contains($elem/position_name, '"+ position +"')" 
} else {
	request.position = ""
}

// Сколько организаций выбрано
if (org.length) {

	org = org.split(',')	
	request.org = "contains($elem/org_name, '"+ org[0] +"')" 

	if (org.length > 1) {
		for (i = 1, max = org.length; i < max; i++) {
			request.org += " or contains($elem/org_name, '"+ org[i] +"')"	
		}
		request.org += ')'		
	}
} else {
	request.org = ""
}

// Проверка ПОД-подразделений =============================
__division_select = division.split(',')
__division_arr = XQuery('for $elem in subdivisions return $elem');

__temp_division = []

function id_this_element(value) {
	for (elem in __division_arr) 
	{	
		if(value == elem.name) {
			// Определяем id выбранных элементов
			return elem.id
		}
	}
}

function is_have_division_child(value) {
	flag = 0

	for (elem in __division_arr)
	{	
		if(value == elem.parent_object_id) {
			
			// Есть ли дети у value 
			__temp_division.push(elem.name)
			flag = 1
		}
	}

	// Если дети есть - 1, иначе - 0 
	return flag
}

for (elem in __division_select) {
	if (!is_have_division_child(id_this_element(elem))) {
		__temp_division.push(elem)
	}
}
//  ========================================================

if (__temp_division.length) {

	if (__temp_division.length == 1) {
		request.division = "contains($elem/position_parent_name, '" + __temp_division[0] +"')" 		
	} else {
		// Если несколько организаций or contains
		request.division = "(contains($elem/position_parent_name, '" + __temp_division[0] +"')" 
		for (i = 1, max = __temp_division.length; i < max; i++) {
			request.division += " or contains($elem/position_parent_name, '"+ __temp_division[i] +"')"	
		}
		request.division += ')'		
	}
} else {
	request.division = ""
}

// AND, WHERE ===================================
if (request.fullname != "" && request.position != "" || request.fullname != "" && request.org != "" || request.fullname != "" && request.division != "") {
	and1 = " and " 
} else {
	and1 = ""
} 

if (request.org != "" && request.division != "") {
	and3 = " and " 
} else {
	and3 = ""
} 

if (request.position != "" && request.org != "" || request.position != "" && request.division != "") {
	and2 = " and " 
} else {
	and2 = ""
} 

if (request.fullname != "" || request.position != "" || request.org != "" || request.division != "") {
	where = " where "
} else {
	where = ""
}
// ==============================================================

var str = "for $elem in collaborators " + where + request.fullname + and1 + request.position + and2 + request.org + and3 + request.division + " return $elem"

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
		division: elem.position_parent_name.Value
	});		

}
```
Выборка rc_task_finally_division
``` javascript
ERROR = 0;
MESSAGE = "";
RESULT = [];

// Создать переменные: 
// checked - string

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

// Не принимает никаких переменных

data = XQuery("for $elem in orgs return $elem");

for (elem in data)
{
	RESULT.push({
		id: elem.id.Value, 
		// В карточке должно быть указано Официальное название
		name: elem.name.Value 
	});		
}
```
