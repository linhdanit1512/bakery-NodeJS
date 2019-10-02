$.fn.extend({
	InputTable : function(query, option) {
		var createRow = function(_option) {
			var result = '<tr>';
			/**
			 * d: {type, className, placeholder, value, option}
			 */
			_option.data.forEach(function(d, index) {
				var tag = '', className = '', placeholder = '', label = '', value='', type = ''; 
				value = d.value;
				className = d.className;
				if (d instanceof Object ) {
					switch(d.type){
					case 'checkbox':
					case 'radio':
						type= d.type;
						label = d.label;
						tag = 'input';
					}
				}else{
					result += '<td>'+d+'</td>'
				}
			});
			result += '</tr>';

		}
		if (query && option) {
			switch (query) {
			case 'data':
				break;
			default:
				break;
			}
			return;
		} else if (!query && !option) {
			var id = randomString(12);
			var table = document.createElement('table');
			table.id = option.id;
			option = {
				id : '#' + id,
				placeholder : [ 'No Field' ],
				data : [ 'No data to show' ],
				destroy : true,
				createNew : false
			}
		} else if (query && !option) {
			option = query;
		}
		$(option.id).addClass('table table-input');

	}
})