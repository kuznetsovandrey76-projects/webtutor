```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Task_1</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<style>	
		.search-block {
			background: lightblue;
			border: 1px solid black;
			position: relative;
			z-index: 5;
		}

		.org-block,
		.division-block,
		.collaborator-info {
			background: khaki;
			border: 1px solid black;
			position: absolute;
			top: 0;	
			z-index: 10;
		}
		.collaborator {
			cursor: pointer;
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
	<div id="search-block" class="search-block">
		<label for="fullname">ФИО:</label>	
		<input class="input-field" id="fullname" type="text"><br>	
		<label for="position">Должность:</label>	
		<input class="input-field" id="position" type="text"><br>	
		<label for="org">Организация:</label>	
		<input class="input-field" id="org-button" type="button" value="Выбрать"><br>	
		<label for="division">Подразделение:</label>	
		<input class="input-field" id="division-button" type="button" value="Выбрать"><br>	
		<button id="search">Найти</button>		
	</div>
	<div id="org-block" class="org-block">
		<p>123</p>
		<button id="org-search">Найти</button>		
	</div>
	<div id="division-block" class="division-block">	
		<p>123</p>	
		<button id="division-search">Найти</button>			
	</div>

	<div id="result">
		<table id="filter-table">
		    <tr>
		        <th>id</th>
		        <th>ФИО</th>
		        <th>Должность</th>
		        <th>Организация</th>
		        <th>Подразделение</th>
		    </tr>
		    <tr class='table-filters'>
		        <td>
		            <!-- <input type="text"/> -->
		        </td>
		        <td>
		            <!-- <input type="text"/> -->
		        </td>
		        <td>
		            <!-- <input type="text"/> -->
		        </td>
		          <td>
		            <!-- <input type="text"/> -->
		        </td>
		    </tr>
		    <tr class='table-data'>
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
		    </tr>
		</table>
	</div>
	<div id="collaborator-info" class="collaborator-info">
		<p id="collaborator-info--lastname"></p>
		<p id="collaborator-info--firstname"></p>
		<p id="collaborator-info--middlename"></p>
		<p id="collaborator-info--position"></p>
		<p id="collaborator-info--org"></p>
		<p id="collaborator-info--division"></p>
		<button id="collaborator-save">Сохранить</button>			
	</div>

	<script>
		$( document ).ready(function() {
				// Скрываем блоки выбора ======
				$('#org-block').hide()
				$('#division-block').hide()
				$('#result').hide()
				$('#collaborator-info').hide()
				// ============================

        // Выборки =========================== 
		    $('#org-button').click(function() {
		    		$('#org-block').show()
		    		$('#org-search').click(function() {
		    				$('#org-block').hide()
		    		});
		    });

    		$('#division-button').click(function() {
		    		$('#division-block').show()
	    			$('#division-search').click(function() {
		    				$('#division-block').hide()
		    		});
		    });				
		    // ============================			


		    $('#search').click(function() {
	    			$('#result').show()
		    		var fullname = $('#fullname').val()
		    		var position = $('#position').val()
		    		console.log(fullname, position)
		    });


				$('.collaborator').click(function() {
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

						console.log(user)

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

		});
	</script>
</body>
</html>
```
