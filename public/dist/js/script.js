$(function() {
	$(document).on('click', 'input:checkbox+label, input:radio+label', function(){
		$(this).prev('input').prop('checked', !$(this).prev('input').prop('checked'));
	})
	
	/** Slidebar */
	$('[data-toggle="sidebar"]').click(function(e) {
		var target = $(this).data('target');
		var dismiss = $(this).data('dismiss');
		if (target) {
			$(target).toggleClass('out');
		} else if (dismiss) {
			$(dismiss).toggleClass('out');
		}
	});

	/** Slidebar close khi click ra ngoài* */
	$(document).mouseup(function(e) {
		var _popover = $(".popover");
		if (!_popover.is(e.target)
				&& _popover.has(e.target).length === 0) {
			_popover.hide();
		}

		var _slidebar = $('#leftSidebar');
		if ((!_slidebar.is(e.target) && _slidebar.has(e.target).length === 0) && !_slidebar.hasClass('out')) {
			_slidebar.toggleClass('out');
		}
	});

	/** Slidebar open/close khi kéo theo phương ngang */
});
/**
 * 
 * @param length
 *            {Number} chiều dài chuỗi được tạo
 * @param isNumber
 *            {Boolean}: Tạo số ngẫu nhiên phải ko?
 * @returns
 */
function randomString(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math
				.floor(Math.random() * charactersLength));
	}
	return result;
}
