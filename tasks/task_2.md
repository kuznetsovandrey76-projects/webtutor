```html
<div id="main"></div> 

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
            handler: function() {

				var column_array2 = [{
					width: 300,
					header: "Название",
					dataIndex: "name"
				}];

				var field_array2 = ['id', 'name'];
				var input_options2 = {
          // Выборка позиции
					collection_code: "rc_task_2_position",
					//parameters: "td_id=" + option.td_value,
					parameters: "",
					limit: 20,
					start: 0
				};
				var close_handler2 = function(selected_object)
				{
					var sp_names ="";
					var sp_id = "";
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

					console.log(sp_names)
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

				var result_store_2 = new Ext.data.JsonStore({});
				var column_array = [{
					width: 300,
					header: "Название",
					dataIndex: "name"
				}];

				var field_array = ['id', 'name'];
				var input_options = {
          // Выборка цвета волос
					collection_code: "rc_task_2_hair_color",
					//parameters: "td_id=" + option.td_value,
					parameters: "",
					limit: 20,
					start: 0
				};
				var close_handler = function(selected_object)
				{
					var sp_names ="";
					var sp_id = "";
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

                var fullname = Ext.get('fullname')
                console.log(fullname.dom.value)
                var gender = Ext.get('gender')
                console.log(gender.dom.value)
                fullname.dom.value = ''
                gender.dom.value = 'любой'


                // show_table_window(result_store, column_array, input_options, title_object)
                
            }
        },


    ]
});

</script>
```
