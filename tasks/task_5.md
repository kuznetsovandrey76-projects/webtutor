Шаблон документа
``` html
<%
current_date = Date();
user = curUserID;
%>

<SPXMLScreen Width="500">


  <Action Name="CustomAction" Source="test_5_temp" Success="ALERT={message}; OPENURL=http://127.0.0.1:81/view_doc.html?mode=task_5" Failure="ALERT=ERROR;">
    <Param Name="message" Value="{message}"/>
    <Param Name="theme" Value="{theme}"/>
    <Param Name="collaborator_id" Value="<%=user%>"/>
    <Param Name="creation_date" Value="<%=current_date%>"/>
  </Action >

  <Panel Name="Panel1" Title="С какими проблемами вы столкнулись?">
    <Button Click="HIDE=Panel1; SHOW=Panel2 ">Портал не работал</Button>
    <Button Click="HIDE=Panel1; SHOW=Panel3 ">Ошибка на портале</Button>
    <Button Click="HIDE=Panel1; SHOW=Panel4 ">Я не знаю</Button>
  </Panel>

  <Panel Name="Panel2" Title="В какое время произошла ошибка?" Hidden="true">
    <Button Click="HIDE=Panel2; SHOW=Panel5 ">В рабочее время</Button>
    <Button Click="HIDE=Panel2; SHOW=Panel6 ">В период с 02:00 до 05:00</Button>
  </Panel>

  <Panel Name="Panel5" Title="В рабочее время" Hidden="true">
    <Edit Name="theme" Width="500" EmptyText="Период когда не работал портал"></Edit>
    <Edit Name="message" Width="500" EmptyText="Дополнительные сведения"></Edit>
<!--     <Button Click="OPENURL=http://127.0.0.1:81/view_doc.html?mode=task_5">отправить обращение</Button> -->
      <Button Click="SET=CustomAction/message,{message};SET=CustomAction/theme,{theme};ACTION=CustomAction">Выполнить</Button>
  </Panel>

  <Panel Name="Panel6" Title="В период с 02:00 до 05:00" Hidden="true">
    <HTMLBox>
    <![CDATA[
    <p>В это время происходит обслуживание сервера и он может не работать</p>
    ]]>
    </HTMLBox> 
    <Button Click="OPENURL=http://127.0.0.1:81/view_doc.html?mode=task_5">ОК</Button>
  </Panel>


  <Panel Name="Panel3" Title="Ошибка на портале" Hidden="true">
    <Edit Name="Edit3" Width="500" EmptyText="Адрес страницы"></Edit>
    <Edit Name="Edit4" Width="500" EmptyText="Описание ошибки"></Edit>
    <Button Click="ALERT={Edit3}; OPENURL=http://127.0.0.1:81/view_doc.html?mode=task_5">отправить обращение</Button>
  </Panel>

  <Panel Name="Panel4" Title="Я не знаю" Hidden="true">
    <Edit Name="Edit5" Width="500" EmptyText="Описание ошибки в свободной форме"></Edit>
    <Button Click="OPENURL=http://127.0.0.1:81/view_doc.html?mode=task_5">отправить обращение</Button>
  </Panel>

</SPXMLScreen>
```
Удаленное действие
``` javascript
if (check_field_1 == "" || check_field_2 == "")
{
	ERROR = 1;
	MESSAGE = "Заполните все поля"	 	
}
else
{
	// <name> - имя Типа документа
	// docPOL = OpenNewDoc( 'x-local://udt/udt_<name>.xmd');
	docPOL = OpenNewDoc( 'x-local://udt/udt_cc_task_6_doc.xmd');
	docPOL.TopElem.theme = theme;
	docPOL.TopElem.message = message;

	// creation_date - можно использовать Date()
	// collaborator_id - можно использовать curUserID
	docPOL.TopElem.creation_date = creation_date;
	docPOL.TopElem.collaborator_id = collaborator_id;
	docPOL.BindToDb();
	docPOL.Save();

	MESSAGE = "Cохранение прошло успешно";
}
```
