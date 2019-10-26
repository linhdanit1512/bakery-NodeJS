$(function () {
    window._cropper = {}
    $('input[data-image="preview"]').change(function () {
        let src_name = $(this).prop('name');
        $('#img').css({width: 'unset', height: 'unset'});
        let target_id = $(this).data('target');
        let target = $('#' + target_id);
        if (this.files && this.files[0]) {
            if (this.files[0].type.match(/^image\//)) {
                var reader = new FileReader();
                let ratio = numeral(getItem('aspectRatio')).value();
                if (!window._cropper[src_name]) window._cropper[src_name] = {};
                window._cropper[src_name].img = {};
                reader.onload = function (e) {
                    /**Set image to config */
                    let img = new Image();
                    img.onload = function () {
                        window._cropper[src_name].img.originalWidth = img.width;
                        window._cropper[src_name].img.originalHeight = img.height;
                    }
                    img.src = e.target.result;
                    target.attr('src', e.target.result);
                    /**check create cropper */
                    if (window._cropper[src_name] && window._cropper[src_name].cropper != undefined) {
                        window._cropper[src_name].cropper.destroy();
                        window._cropper[src_name].cropper = null;
                        delete window._cropper[src_name].img.crop;

                    }
                    $('#' + target_id).Jcrop({
                        bgColor: 'white',
                        bgFade: true,
                        bgOpacity: .4,
                        onSelect: function (c) {
                            window._cropper[src_name].info = $.extend({}, c);
                        },
                        onRelease : function(c){
                            delete window._cropper[src_name].img.crop;
                        },
                        aspectRatio: ratio,
                        allowSelect: true,
                        allowMove: true,
                        allowResize: false
                    }, function () {
                        // window._cropper[src_name].crop = this;
                        window._cropper[src_name].ratio = getItem('ratioText')
                        window._cropper[src_name].img.width = target.width();
                        window._cropper[src_name].img.height = target.height();
                        window._cropper[src_name].cropper = this;
                    });
                }
                reader.readAsDataURL(this.files[0]);
            }
        }else{
            if(window._cropper && window._cropper[src_name] && window._cropper[src_name].cropper){
                window._cropper[src_name].cropper.destroy();
                window._cropper[src_name].cropper = null;
            }
        }
    });

    $(document).unbind('click', '.btnCropPopover').on('click', '.btnPreviewPopover', function () {
        let target_id = $(this).data('pop');
        $(`.popover[data-pop="${target_id}"]`).show();
    });

    let objectDisplay = {
        cake: 'bánh',
        Cake: 'Bánh',
        CAKE: 'BÁNH',
        user: 'nhân viên',
        User: 'Nhân Viên',
        USER: 'NHÂN VIÊN',
        admin: 'quản trị viên',
        Admin: 'Quản Trị Viên',
        ADMIN: 'QUẢN TRỊ VIÊN'
    }

    $('[data-toggle="tooltip"]').tooltip();

    $('[data-toggle="popover"]')[0] && $('[data-toggle="popover"]').popover();

    $('[data-delete="true"]').click(function () {
        let $this = this;
        var _object = $(this).data('object');
        var link = host + 'admin/' + _object + '/' + $(this).data('id');
        $.ajax({
            url: link,
            type: 'delete',
            dataType: 'json',
            statusCode: {
                200: function () {
                    notifyCustomer('Đã xóa ' + objectDisplay[_object] + ' thành công', true);
                    $($this).closest('.item-root').remove();
                },
                201: function () {
                    notifyCustomer('Đã xóa ' + objectDisplay[_object] + ' thành công', true);
                    $($this).closest('.item-root').remove();
                },
                204: function () {
                    notifyCustomer('Đã xảy ra lỗi. Xóa ' + objectDisplay[_object] + ' không thành công', false);
                },
                404: function () {
                    notifyCustomer('Đã có lỗi xảy ra. Vui lòng thực hiện sau', false);
                },
                500: function () {
                    notifyCustomer('Máy chủ tạm thời bị lỗi. Vui lòng thực hiện sau', false);
                }

            },
            error: function (e) {

            }
        })
    });


});

function slug(string) {
    var sb = '';
    var chs = string.toLowerCase().split('');
    chs.forEach(function (c) {
        if (c == 'á' || c == 'à' || c == 'ả' || c == 'ã' || c == 'ạ' || c == 'ă' || c == 'ắ' || c == 'ằ' || c == 'ẳ' || c == 'ẵ' || c == 'ặ' || c == 'â' || c == 'ấ' || c == 'ầ' || c == 'ẩ' || c == 'ẫ' || c == 'ậ')
            sb += 'a';
        else if (c == 'é' || c == 'è' || c == 'ẻ' || c == 'ẽ' || c == 'ẹ' || c == 'ê' || c == 'ế' || c == 'ề' || c == 'ể' || c == 'ễ' || c == 'ệ')
            sb += 'e';
        else if (c == 'ì' || c == 'í' || c == 'ỉ' || c == 'ĩ' || c == 'ị')
            sb += 'i';
        else if (c == 'ó' || c == 'ò' || c == 'ỏ' || c == 'õ' || c == 'ọ' || c == 'ô' || c == 'ố' || c == 'ồ' || c == 'ổ' || c == 'ỗ' || c == 'ộ' || c == 'ơ' || c == 'ớ' || c == 'ờ' || c == 'ở' || c == 'ỡ' || c == 'ợ')
            sb += 'o';
        else if (c == 'ú' || c == 'ù' || c == 'ủ' || c == 'ũ' || c == 'ụ' || c == 'ư' || c == 'ừ' || c == 'ứ' || c == 'ử' || c == 'ữ' || c == 'ự')
            sb += 'u';
        else if (c == 'ý' || c == 'ỳ' || c == 'ỷ' || c == 'ỹ' || c == 'ỵ')
            sb += 'y';
        else if (c == 'đ')
            sb += 'd';
        else if (c == ' ')
            sb += '-';
        else
            sb += c;
    })
    return sb.toString();
}

var setItem = function (key, value) {
    localStorage.setItem(btoa(key), btoa(value));
}

var getItem = function (key) {
    if (localStorage.getItem(btoa(key))) {
        return atob(localStorage.getItem(btoa(key)))
    } else {
        return null;
    }
}

/**
 * 
 * @param {String} message 
 * @param {Boolean} status : true = thanh cong
 * 
 */
var notifyCustomer = (message, status = true) => {
    if (status == true) {
        $('.notification_content').text(message);
        $('#modalAlert').modal('show');
    } else {
        $('.message_content').text(message);
        $('#modalMessage').modal('show');
    }
}