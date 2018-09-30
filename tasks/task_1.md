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
					z-index: 1;
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
					z-index: 5;
					width: 80%;
					padding: 5px;
				}
				.collaborator {
					cursor: pointer;
				}
				.result {
					width: 80%;
					margin: 10px auto;
					position: relative;
					z-index: 1;
					background: white;
				}
				.collaborator-info__table td{
					width: 40%;
				}
				.collaborator-id,
				#collaborator-info--id {
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
				.block {
					background: rgba(123, 123, 43, .3);
					position: absolute;
					width: 100%;
					height: 100%;
					z-index: 0;
					top: 0;
					left: 0;
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
			    th {
			    	cursor: pointer;
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
				  <thead>				  	
				    <tr>
				        <th class="collaborator-id" data-type="number">id</th>
				        <th data-type="string">ФИО</th>
				        <th data-type="string">Должность</th>
				        <th data-type="string">Организация</th>
				        <th data-type="string">Подразделение</th>
				    </tr>
				  </thead>
				  <tbody id="tbody">
				  	
				  </tbody>
				</table>
			</div>
			<!-- MODAL -->
			<div id="collaborator-info" class="collaborator-info">
				<table class="collaborator-info__table">
					<tr>
						<td id="collaborator-info--id"></td>
					</tr>
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
			<div id="block" class="block"></div>
			<script>
				$( document ).ready(function() {

					// Поиск результатов
					var search = function() {
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

						    		// $('#filter-table').append(tr)					
						    		$('#tbody').append(tr)					
								}
								// Прорисовка таблицы =====================
							}
						});

						// Обработка ajax
						setTimeout(collaborator, 200);
					}



					// Для удаленного действия
					remoteAction = function (actionObject) {
						try {
							if (remoteAction != undefined) {
								var returnObject = {};
								var soapRequestBody;
								var soapServerUrl = actionObject.url != undefined ? actionObject.url : '/remote_actions_wsdl.xml';
								var soapFormat = actionObject.format != undefined ? actionObject.format : 'json';

								soapRequestBody  = "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
								soapRequestBody += "<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">";
								soapRequestBody += "<soap:Body>";
								soapRequestBody += "<" + actionObject.name + " xmlns=\"http://www.websoft.ru/\">";
								soapRequestBody += "<format>" + soapFormat + "</format>";
								if (actionObject.options != undefined) {
									for (var i = 0; i < actionObject.options.length; i++) {
										soapRequestBody += "<" + actionObject.options[i].name + ">" + actionObject.options[i].value + "</" + actionObject.options[i].name + ">";
									}
								}
								soapRequestBody += "</" + actionObject.name + ">";
								soapRequestBody += "</soap:Body>";
								soapRequestBody += "</soap:Envelope>";

								$.ajax({
									type: "POST",
									url: soapServerUrl,
									contentType: "text/xml",
									dataType: "xml",
									data: soapRequestBody,
									success: processSuccess,
									error: processError
								});

								function processSuccess (data, status, req) {
									if (status == "success") {
										var returnObject = {
											error: data.getElementsByTagName('error')[0].firstChild,
											type: data.getElementsByTagName('type')[0].firstChild,
											messageText: data.getElementsByTagName('messageText')[0].firstChild,
											result: data.getElementsByTagName('result')[0].firstChild
										};
										try{
											returnObject.error = returnObject.error.nodeValue;
										}
										catch(_ex){}
										try{
											returnObject.type = returnObject.type.nodeValue;
										}
										catch(_ex){}
										try{
											returnObject.messageText = returnObject.messageText.nodeValue;
										}
										catch(_ex){}
										try{
											returnObject.result = returnObject.result.nodeValue;
										}
										catch(_ex){}

										if (actionObject.callback_f != undefined) {
											actionObject.callback_f(returnObject);
										}

										return returnObject;
									}
									else {
										throw status;
									}
								}

								function processError(data, status, req) {
									throw req.responseText;
								}
							}
							else
							{
								throw '00'
							}
						}
						catch(_exeption) {
							returnObject = {error: 1, messageText: _exeption};
							if (typeof(actionObject.callback_f) != 'undefined') {
								actionObject.callback_f(returnObject);
							}
							return returnObject ;
						}
					};

					function collaborator() {
						// Работа с элементами результатов ============================
							$('.collaborator').click(function() {
								$('#block').css({'z-index': 2});

									var select_item = $(this).context.parentNode.children;
									// Получаем id выбранного элемента
									var fullname = select_item[1].textContent.split(' ');
									var user = {
										id: select_item[0].textContent,
										lastname: fullname[0],
										firstname: fullname[1],
										middlename: fullname[2],
										// Первоначальное значение позиции
										position: select_item[2].textContent,
										org: select_item[3].textContent,
										division: select_item[4].textContent,
									}
									// console.log(user.position)

									$('#collaborator-info').show()

									$('#collaborator-info--id').text(user.id)
									$('#collaborator-info--lastname').text(user.lastname)
									$('#collaborator-info--firstname').text(user.firstname)
									$('#collaborator-info--middlename').text(user.middlename)
									$('#collaborator-info--position').text(user.position)
									$('#collaborator-info--org').text(user.org)
									$('#collaborator-info--division').text(user.division)
							});					

								

							
			    			$('#result').show()
					}

					// EDIT
					$('#edit-collaborator-info--lastname').click(function() {						
						if ($(this).context.parentNode.children[0].textContent === 'Редактировать') {
							// console.log('ok')

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
					var old_position;
					$('#edit-collaborator-info--position').click(function() {

						// Заполнение новой позиции
						if ($(this).context.parentNode.parentNode.children[1].textContent === '') {

							// Если у сотрудника не указана должность, то поле доступно для редактирования только после заполнения фильтров организации и подразделения. 	
							if ($('#collaborator-info--org')[0].textContent === '' || $('#collaborator-info--division')[0].textContent === '') {
								alert('Выберите организацию и подразделение')
							} else {
								if ($(this).context.parentNode.children[0].textContent === 'Редактировать') {
									// Изменяемое поле
									var edit_items = $(this).context.parentNode.parentNode.children[1]

									// Получить текст изменяемого поля
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
									edit_items.textContent = $(this).context.parentNode.parentNode.children[1].children[0].value;	
								}
							}
						// Изменение существующей позиции
						} else {
							if ($(this).context.parentNode.children[0].textContent === 'Редактировать') {
								// Изменяемое поле
								var edit_items = $(this).context.parentNode.parentNode.children[1]

								// Получить текст изменяемого поля
								var input = document.createElement('input');
								// Старая позиция - edit_items.textContent
								// Вывожу глобально !!!
								old_position = edit_items.textContent

								input.value = edit_items.textContent;							
								edit_items.textContent = ''						
								edit_items.append(input)

								$(this).context.parentNode.children[0].textContent = 'ок';
							} else {
								$(this).context.parentNode.children[0].textContent = 'Редактировать';
								// Изменяемое поле
								var edit_items = $(this).context.parentNode.parentNode.children[1]
								// Считываем значение из input 
								edit_items.textContent = $(this).context.parentNode.parentNode.children[1].children[0].value;	
							}
						}

					});
					// РЕДАКТОР ОРГАНИЗАЦИИ
					$('#edit-collaborator-info--org').click(function() {
						$('#block').css({'z-index': 6});

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
									$('#block').css({'z-index': 2});
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

							}
						});
					});
					// РЕДАКТОР ПОДРАЗДЕЛЕНИЙ
					$('#edit-collaborator-info--division').click(function() {
						$('#block').css({'z-index': 6});

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
									$('#block').css({'z-index': 2});
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

					// Сохранение измененных данных
					$('#collaborator-save').click(function() {

						// Проверка все ли изменения подтверждены
						if ($('#edit-collaborator-info--lastname')[0].textContent === 'ок' || $('#edit-collaborator-info--firstname')[0].textContent === 'ок'|| $('#edit-collaborator-info--middlename')[0].textContent === 'ок' || $('#edit-collaborator-info--position')[0].textContent === 'ок') {
							alert('Подтвердите все изменения')
						} else {
							// ОБНОВЛЯЕМ ДАННЫЕ НА СЕРВЕРЕ 
							$('#block').css({'z-index': 0});
							$('#collaborator-info').hide()

							var info_arr = $(this).context.parentNode.parentNode.parentNode.children
							// [id, lastname, firstname, middlename, position, org, division, ...]

							var id = info_arr[0].textContent.replace( /\s/g, "")
							var lastname = info_arr[1].children[1].textContent
							var firstname = info_arr[2].children[1].textContent
							var middlename = info_arr[3].children[1].textContent
							var position = info_arr[4].children[1].textContent
							var org = info_arr[5].children[1].textContent
							var division = info_arr[6].children[1].textContent

							var fullname = lastname + ' ' + firstname + ' ' + middlename 

							// Если позицию не изменяли 
							if (old_position == undefined) {
								old_position = ""
							}

							//работа с удаленным действием 
							regAction = {
								name : "re_task_finally_1", //код удаленного действия
								options: [{ name: "id", value: id },
										 { name: "lastname", value: lastname },
										 { name: "firstname", value: firstname },
										 { name: "middlename", value: middlename },
										 { name: "fullname", value: fullname },
										 // Нужна отправка старой позиции
										 { name: "old_position", value: old_position},
										 // Отправка новой позиции
										 { name: "position", value: position},
										 { name: "org", value: org},
										 { name: "division", value: division}
										 ],

								callback_f : function(_doc){
									// waitWindow.hide();
									if (_doc.error == 0)
									{
										// Обновляем таблицу
										return search();
									}
									else
									{
										alert(0)
									}
								}
							} 
							// пример коллбэка на ответ, его может не быть, 
							// _doc - возвращаемый объект, содержит поля error, type, messageText, result
							remoteAction(regAction);							
						}
					});

					// Скрываем блоки выбора 
					(function () {
						$('#org-block').hide()
						$('#division-block').hide()
						$('#result').hide()
						$('#collaborator-info').hide()
						$('#collaborator-update-org').hide()
						$('#collaborator-update-division').hide()				
					})();

		       		// ВЫБОРКИ ============================
		       		// Организации
				    $('#org-button').click(function() {
				    	$('#block').css({'z-index': 2});
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
					    				$('#block').css({'z-index': 0});

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
		    			 $('#block').css({'z-index': 2});

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
					    		 		$('#block').css({'z-index': 0});	    				
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
				    $('#search').click(search);
				});
			</script>
			<script>
			    // сортировка таблицы
			    // использовать делегирование!
			    // должно быть масштабируемо:
			    // код работает без изменений при добавлении новых столбцов и строк

			    var grid = document.getElementById('filter-table');

			    grid.onclick = function(e) {
			      if (e.target.tagName != 'TH') return;

			      // Если TH -- сортируем
			      sortGrid(e.target.cellIndex, e.target.getAttribute('data-type'));
			    };

			    function sortGrid(colNum, type) {
			      var tbody = grid.getElementsByTagName('tbody')[0];
			      console.log(tbody)
			      // Составить массив из TR
			      var rowsArray = [].slice.call(tbody.rows);
			      console.log(rowsArray)

			      // определить функцию сравнения, в зависимости от типа
			      var compare;

			      switch (type) {
			        case 'number':
			          compare = function(rowA, rowB) {
			            return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
			          };
			          break;
			        case 'string':
			          compare = function(rowA, rowB) {
			          	console.log(1, rowA.cells[colNum].textContent)
			          	console.log(2, rowB.cells[colNum].textContent)
			            return rowA.cells[colNum].textContent > rowB.cells[colNum].textContent;
			          };
			          break;
			      }

			      // сортировать
			      rowsArray.sort(compare);

			      // Убрать tbody из большого DOM документа для лучшей производительности
			      grid.removeChild(tbody);

			      // добавить результат в нужном порядке в TBODY
			      // они автоматически будут убраны со старых мест и вставлены в правильном порядке
			      for (var i = 0; i < rowsArray.length; i++) {
			        tbody.appendChild(rowsArray[i]);
			      }

			      grid.appendChild(tbody);

			    }
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
// ФИО – брать из карточки сотрудника 
// position
// Должность – брать из карточки должности 
// org
// Организация – брать из карточки организации 
// division
// Подразделение – брать из карточки подразделения 

request = {
	fullname: "",
	position: "",
	org: "",
	division: ""
}

// Собираем строку запроса ========================================
if (fullname) {
	request.fullname = "contains($elem/fullname, '"+ fullname +"')" 
	// select_fullname = XQuery("for $elem in collaborators where contains($elem/fullname, '"+ fullname +"') return $elem");
	// for (elem in select_fullname) {
	// 	// Получаем id отобранных fullname 
	// 	alert(elem.id.Value)
	// }
} else {
	request.fullname = ""
}

// Изменить выборку позиции, через id usera
if (position) {
	request.position = "contains($elem/position_name, '"+ position +"')" 
	// for (elem in select_fullname) {
	// 	select_position = XQuery("for $elem in positions where contains($elem/basic_collaborator_id, '"+ elem.id.Value +"') return $elem");
	// 	alert(ArrayOptFirstElem(select_position).name.Value)
	// }
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
Удаленное действие re_task_finally_1
``` javascript
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
if (old_position === "") {

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
```
