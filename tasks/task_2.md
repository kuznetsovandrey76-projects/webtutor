шаблон
```html
<div id="main"></div> 
<div id="grid2"></div> 

<script>

var mainPanel =  new Ext.form.FormPanel({
  	renderTo    : 'main',
  xtype       : 'form',
    autoScroll  : false,
    id          : 'mainPanel',
    // Если все items одного xtype
    // defaultType : 'field',
    frame       : true,
    items       : [
        {
            id: 'fullname',
            fieldLabel : 'ФИО',
            xtype: 'textfield',
            width  : 150
        },
        {
            // https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.form.ComboBox

            id: 'gender',
            fieldLabel: 'Пол',
            xtype: 'combo',
            width  : 150,

            // Можно ли писать свои значения
            editable: false,
            autoSelect: true,
            typeAhead: true,
            hideTrigger: true,
            triggerAction: 'all',
            emptyText: 'любой',
            // lazyRender:true,
            mode: 'local',

            store: new Ext.data.ArrayStore({
                // id: 0,
                fields: [
                    'myId',
                    'displayText'
                ],
                data: [[0, 'любой'], [1, 'мужской'], [2, 'женский']]
            }),

            valueField: 'myId',
            displayField: 'displayText'
        },
        {
            // Одиночный выбор
            id: 'position',
            fieldLabel : 'должность',
            xtype: 'button',
            text: 'Выбрать',
            handler: function(e) {

            	// проверка что уже есть в выбранных позициях
            	var position = $('#select_position span').text()

				var column_array2 = [{
					width: 300,
					header: "Название",
					dataIndex: "name"
				}];

				var field_array2 = ['id', 'name'];
				var input_options2 = {
          			// Выборка позиции
					collection_code: "rc_task_1_position",
					// Передаем выбранную позицию
					parameters: "content=" + position,
					// parameters: "",
					limit: 20,
					start: 0
				};
				var close_handler2 = function(selected_object)
				{
            		$('#select_position').remove()

					var sp_names ="";
					var sp_id = "";

	            	// Создаем div с выбранной должностью ====================
		        	var div = document.createElement('div');
		            var span = document.createElement('span');
		            var button = document.createElement('button');

		            // Символ закрытия
		            var t = document.createTextNode("X");
		            div.append(span)
		            div.append(button)

		            button.append(t)

		            // Удаление выбранных должности или цвета волос
		            button.addEventListener('click', function() {
		                $(this).parent().remove()
		            })

	                div.id = 'select_position'
	                // e.fieldLabel - текст выбранного элемента
					// Добавляем в close_handler2

	                $('#position').after(div)
					// console.log('Выбранная должность', selected_object.data.name)
					span.textContent = selected_object.data.name
                	// ======================================================

					for( i =0; i < result_store_2.data.items.length; i++)
					{
						sp_names += html_decode(result_store_2.data.items[i].data.name) + ";\r";
						//html_decode(result_store_2.data.items[i].data.name);
						sp_id += sp_id.length > 0 ? "#" + result_store_2.data.items[i].data.id : result_store_2.data.items[i].data.id;
					}
					// console.log(sp_names)
					
					option.dd_value = sp_id.length > 0 ? sp_id : 0;
					if (option.dd_value == 0) {
					//	option.dd_value = fix_dd_val;
					}
					$("#ta_4").val(sp_names);

				};

				var title_object2 = {
					title: "Должность"

				};

				show_single_window(column_array2, field_array2, input_options2, close_handler2, title_object2);	 	

            }
        },
        {
            // Множественный выбор
            id: 'hair_color',
            fieldLabel : 'Цвет волос',
            xtype: 'button',
            text: 'Выбрать',
            handler: function() {

            	// $('.hair_color').remove()

            	// проверка что уже есть в цветах волос
                var hair_color = $('.hair_color span').text()

				var result_store_2 = new Ext.data.JsonStore({});
				var column_array = [{
					width: 300,
					header: "Название",
					dataIndex: "name"
				}];

				var field_array = ['id', 'name', 'test'];
				var input_options = {
          		// Выборка цвета волос
					collection_code: "rc_task_1_hair_color",
					parameters: "content=" + hair_color,
					// parameters: "",
					limit: 20,
					start: 0
				};
				var close_handler = function()
				{
					var sp_names ="";
					var sp_id = "";

					// console.log('Выбранные цвета', result_store_2.data.items)

					var hair_colors = result_store_2.data.items
					for (var i = 0; i < hair_colors.length; i++) {

		            	// Создаем div с выбранными цветами волос ==========
			        	var div = document.createElement('div');
			            var span = document.createElement('span');
			            var button = document.createElement('button');

			            // Символ закрытия
			            var t = document.createTextNode("X");
			            div.append(span)
			            div.append(button)

			            button.append(t)

			            // Удаление выбранных должности или цвета волос
			            button.addEventListener('click', function() {
			                $(this).parent().remove()
			            })

						div.className = 'hair_color'

		                // hair_colors[i].data.name - текст выбранного элемента

						span.textContent = hair_colors[i].data.name + ' '
						$('#hair_color').after(div)
		                // ======================================================
					}

					for( i =0; i < result_store_2.data.items.length; i++)
					{
						sp_names += html_decode(result_store_2.data.items[i].data.name) + ";\r";
						//html_decode(result_store_2.data.items[i].data.name);
						sp_id += sp_id.length > 0 ? "#" + result_store_2.data.items[i].data.id : result_store_2.data.items[i].data.id;
					}
					

					option.dd_value = sp_id.length > 0 ? sp_id : 0;
					if (option.dd_value == 0) {
					//	option.dd_value = fix_dd_val;
					}
					$("#ta_4").val(sp_names);


					
				};

				var title_object = {
					title: "Цвет волос"
				};



            	show_dual_window(result_store_2, column_array, field_array, input_options, close_handler, title_object)            	
            }
        },
        {
            
        	//Ррезультаты выбора в консоль 

            xtype: 'button',
            text: 'Найти',
            handler: function(e) {

            	$('#grid-result').remove()
 
                console.log('===========')
                var fullname = Ext.get('fullname')
                console.log(fullname.dom.value || 'ФИО не заполнено')
                var gender = Ext.get('gender')
                console.log(gender.dom.value)
                var position = $('#select_position span').text()
                console.log(position || 'позиция не выбрана')
                var hair_color = $('.hair_color span').text()
                console.log(hair_color || 'цвет волос не выбран')

                // Обращение к выборке
				$.ajax({
					type: "POST",
					url: "/pp/Ext/extjs_json_collection_data.html",
					dataType: "json",
					data: {
						collection_code: "rc_task_1_result",
						parameters: "fullname=" + fullname.dom.value 
									+ ";gender=" + gender.dom.value 
									+ ";position=" + position 
									+ ";hair_color=" + hair_color
					},
					success: function (data, textStatus, jqXHR) {

						// в data.results - придут результаты
						console.log(data.results)

						// Уходит в Grid	 
						data_result = []

						for (var i = 0, max = data.results.length; i < max; i++) {
							var item = [];
							item.push(data.results[i].fullname)
							item.push(data.results[i].position)
							item.push(data.results[i].gender)
							item.push(data.results[i].hair_color)
							data_result.push(item)
						}
					}
				})

                // Обнуляем
                // fullname.dom.value = ''
                // gender.dom.value = 'любой'
                // $('#select_position').remove()
                // $('.hair_color').remove()


    			setTimeout(function() {
				var rt = Ext.data.Record.create([
				        {name: 'fullname'}, 
				        {name: 'position'}, 
				        {name: 'sex'},
				        {name: 'hair_color'}
				    ]);


				var grid = new Ext.grid.GridPanel({
					id: 'grid-result',
				    store: new Ext.data.Store({
				        // autoDestroy: true,
				        reader: new Ext.data.ArrayReader(
					            {
					                idIndex: 0  
					            },
					            rt 
					        ),

				        // Берем из обращения к выборке
				        data: data_result
				    }),
				    colModel: new Ext.grid.ColumnModel({
				        defaults: {
				            // width: 180,
				            sortable: true
				        },
				        columns: [
				            // {id: 'company', header: 'Fullname', width: 200, sortable: true, dataIndex: 'company'},
				            {header: 'ФИО', width: 300, dataIndex: 'fullname'},
				            {header: 'Пол', width: 100, dataIndex: 'sex'},
				            {header: 'Должность', width: 200, dataIndex: 'position'},
				            {header: 'Цвет волос', width: 100, dataIndex: 'hair_color'},
				        ]
				    }),

				    // width: 600,
				    height: 300,
				    frame: true,
				    title: 'Результаты',
				    renderTo: 'grid2',
				 
				});

                grid.show()

            	}, 200);
                
            }
        },


    ]
});


</script>
```
коллекция позиция
```javascript
ERROR = 0;
MESSAGE = "";
RESULT = [];


// Создаем переменную content - строка

data = XQuery("for $elem in positions return $elem");

for (elem in data)
{

	if(elem.name.Value !== content) {
		RESULT.push({
			id: elem.id.Value, 
			name: elem.name.Value
		});		
	}
}
```
коллекция цвета волос
```javascript
ERROR = 0;
MESSAGE = "";
RESULT = [];


// Создаем переменную content - строка

// Уже выбранные цвета волос
var arr = content.split(' ')

var collaborators = XQuery("for $elem in collaborators return $elem");

// Неповторяющиеся цвета волос
var colors = [];

for (elem in collaborators) {

// Получить URL объекта с id = elem.id
doc_url = UrlFromDocID(elem.id);

// Открыть объект(XML-документ) используя его URL
open_doc = OpenDoc(doc_url);

// Получить значение настраиваемого поля
// в ObtainChildByKey указываем имя поля
custom_value = open_doc.TopElem.custom_elems.ObtainChildByKey("hair_color").value;

// Если в массиве [colors] нет такого элемента, добавляем
if (colors.indexOf( custom_value ) == -1) {
	colors.push(custom_value);
}

}

// Не пропускаем уже выбранные цвета волос
for (elem in colors) {
	// Есть ли элемент в выбранных элементах
	if (arr.indexOf(elem) == -1) {
		RESULT.push({
			name: elem.Value
		});	
	}
}

```
коллекция результаты
```javascript
ERROR = 0;
MESSAGE = "";
RESULT = [];

// Создаем переменные fullname, position, gender, hair_color - строки

// Выбранные цвета волос
var arr = hair_color.split(' ')

if (fullname) {
	fullname_insert = "contains($elem/fullname, '"+ fullname +"')" 
} else {
	fullname_insert = ""
}

if (gender !== "любой") {
	if (gender === "мужской") {
		gender_insert = "$elem/sex='m'"
	} else {
		gender_insert = "$elem/sex='w'" 	
	}	
} else {
	gender_insert = ""
}

if (position) {
	position_insert = "$elem/position_name = '"+ position + "'" 
} else {
	position_insert = ""
}

// and1 - разделить условий
if (fullname_insert!="" && gender!="любой" || fullname_insert!="" && position!="") {
	and1 = " and " 
} else {
	and1 = ""
} 

if (gender!="любой" && position!="") {
	and2 = " and " 
} else {
	and2 = ""
} 

if (fullname_insert!="" || gender!="любой" || position!="") {
	where = " where "
} else {
	where = ""
}

var str = "for $elem in collaborators " + where + fullname_insert + and1 + gender_insert + and2 + position_insert + " return $elem"


alert(str)
data = XQuery(str)


for (elem in data)
{
	doc_url = UrlFromDocID(elem.id.Value);
	open_doc = OpenDoc(doc_url);
	custom_value = open_doc.TopElem.custom_elems.ObtainChildByKey("hair_color").value;

	// hair_color - сверяем с выбранными цветами

	if (elem.sex.Value === 'm') {
		gender_result = "мужской"
	} else {
		gender_result = "женский"		
	}

	if (hair_color === '') {
		RESULT.push({
			fullname: elem.fullname.Value, 
			position: elem.position_name.Value,
			gender: gender_result,
			hair_color: custom_value.Value
		});		
	} else {
		for (i in arr) {
			if (i == custom_value) {
				RESULT.push({
					fullname: elem.fullname.Value, 
					position: elem.position_name.Value,
					// gender: elem.sex.Value,
					gender: gender_result,
					hair_color: custom_value.Value
				});	
			}
		}
	}
}

```
