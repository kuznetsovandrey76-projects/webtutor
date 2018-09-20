Шаблон документа
``` javascript
<%
current_date = StrDate(Date());

user = curUserID;

str_1 = StrRangePos(StrInt(curUserID), 0, 16) 
str_2 = StrRangePos(StrInt(curUserID), 16, 19)
%>

<!-- форма -->
<label for="theme">Тема обращения:</label>	
<input type="text" id="theme">
<label for="message">Обращение:</label>	
<input type="text" id="message">
<input type="submit" value="Отправить" id="send">

<script>
// console.log('<%=current_date%>')

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
}

$('#send').click(function() {
	var theme = $('#theme').val();
	var message = $('#message').val();

	if (theme && message) {
		// console.log('Тема обращения:', theme);
		// console.log('Обращение:', message);

		// возврат после отправки 
		var url = "http://127.0.0.1:81/view_doc.html?mode=task_4";

		//работа с удаленным действием 
		regAction = {
			name : "task_4", //код удаленного действия
			options: [{ name: "message", value: message },
					 { name: "theme", value: theme },
					 { name: "creation_date", value: '<%=current_date%>'},
					 { name: "collaborator_id", value: '' + <%=str_1%> + <%=str_2%>}
					 ],


			callback_f : function(_doc){
				waitWindow.hide();
				if (_doc.error == 0)
				{
					alert(1)
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

		// console.log(regAction.options[2])

		// подтверждение что все отправлено
		alert('Ваше обращение принято');

		// возврат на страницу
		$(location).attr('href',url);
	} else {
		alert('Заполните все поля');
	}
});

</script>
```
Удаленное действие
``` javascript
docPOL = OpenNewDoc( 'x-local://udt/udt_cc_task_6_doc.xmd');

docPOL.TopElem.theme = theme;
docPOL.TopElem.message = message;
docPOL.TopElem.creation_date = creation_date;
docPOL.TopElem.collaborator_id = collaborator_id
docPOL.BindToDb();
docPOL.Save();

MESSAGE = "Cохранение прошло успешно";

msgToAdmin = 'Тема: ' + theme  + '. Обращение: ' + message;

// tools.create_notification('task_4_type', collaborator_id, {theme: theme, message: message});
tools.create_notification('task_4_type', collaborator_id, msgToAdmin);
```
Шаблон уведомлений
``` javascript
Обращение от: <%=objDoc.fullname%>, id - <%=objDoc.id%>  
<%=Text%>
```
