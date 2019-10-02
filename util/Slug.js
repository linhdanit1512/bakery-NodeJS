module.exports = exports = class Slug {
    constructor() {
    }

    slug(string) {
        var sb = ''
        var chs = string.toLowerCase().toCharArray();
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
}