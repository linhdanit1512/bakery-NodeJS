function CreateForm() {
}

CreateForm.prototype = {
	constructor : CreateForm,
	init : function() {
		this.createField();
		this.bindEvent();
	},
	bindEvent : function() {
		var _self = this;
		$(document).on('click', 'table tr:not(:last-child) .btnRemoveAttr', function(){
			_self.removeAttribute(this);
		}).on('click', '.btnAddAttribute', function(){
			_self.createField();
		}).on('submit', 'form', function(e){
			e.preventDefault();
			_self.getForm();
		});
	},
	createAttribute : function() {

	},
	removeAttribute : function(elem){
		$(elem).closest('tr').remove();
	},
	createField : function(option) {
		var result = '';
		result += '<tr>';
		result += '<td class="hasinput"><input class="form-control" data-attr="name" placeholder="Label"></td>';
		result += '<td class="hasinput"><input class="form-control" data-attr="attr" placeholder="Nhập tên biến"></td>';
		result += '<td class="hasinput">'
				+ '<select class="form-control" data-attr="dataType" style="width:100%">'
				+ '<option value="">Chọn kiểu dữ liệu</option>'
				+ '<option value="text">Text</option>'
				+ '<option value="number">Number</option>'
				+ '<option value="file">File</option>'
				+ '<option value="email">Email</option>'
				+ '<option value="date">Date</option>'
				+ '<option value="time">Time</option>'
				+ '<option value="datetime">Date Time</option>'
				+ '<option value="textarea">Textarea</option>'
				+ '<option value="hidden">Hidden</option>'
				+ '<option value="radio">Radio</option>'
				+ '<option value="checkbox">Checkbox</option>'
				+ '<option value="select">Select</option>'
				+ '<option value="multi-select">Multiple Select</option>'
				+ '<option value="button">Button</option>' + '</select>'
				+ '</td>';
		result += '<td class="hasinput"><input class="tags-input form-control" data-attr="attr_fields" placeholder="Thuộc tính thêm"></td>'
		result += '<td class="hasinput"><input class="form-control" data-attr="src" placeholder="Nguồn dữ liệu"></td>';
		result += '<td class="hasinput"><input class="form-control" data-attr="extend_by" placeholder="Mở rộng từ"></td>';
		result += '<td class="hasinput"><input class="form-control" data-attr="default" placeholder="Giá trị mặc định"></td>';
		result += '<td class=""><input type="checkbox" data-attr="required"><label class="text-center">&nbsp;</label></td>';
		result += '<td class=""><button type="button" class="btn btn-xs btn-warning btnRemoveAttr"><i class="fa fa-trash"></i></button></td>';
		result += '</tr>';
		
		$('#table_createForm tbody').append(result);
		
		
	},
	/**
	 * option {JSON} :
	 */
	createCheckBox : function(option) {
		if (!option)
			option = {};
		if (!option.type)
			option.type = 'checkbox';
		if (!option.name)
			return;
		if (!option.label)
			option.label = '';
		if (!option.value) {
			option.value = option.label;
		}
		var result = '';
		result += '<input type="' + option.type + '"'
				+ (option.id ? ' id="' + option.id + '"' : '') + ' name="'
				+ option.name + '" value="' + option.value + '">';
		result += '<label>' + option.label + '</label>';
		return result;
	},

	createCheckboxs : function(options) {

	},
	getForm : function(){
		var data = [];
		$('#table_createForm tbody').find('tr').each(function(index, elem){
			var newAttr = {};
			$(elem).find('input, select, textarea').each(function(index2, elem2){
				newAttr[$(elem2).data('attr')] = ($(elem2).prop('type')=='checkbox' || $(elem2).prop('type')=='radio') ? $(elem2).prop('checked') : $(elem2).val();
			});
			data.push(newAttr);
		})
		console.log(data);
		return data;
	}
}