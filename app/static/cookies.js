function bake_cookie(name, value) {
    document.cookie = [name, '=', JSON.stringify(value), ';'].join('');
}

function read_cookie(name) {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
}
