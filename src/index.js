export default function hyclass(obj) {
    function h (cn) {
        var i, cur, arr, str='';
        if (typeof cn === 'string') {
            if (typeof obj !== 'object'){
                return cn;
            }
            arr = cn.split(' ');
            for (i = 0; i < arr.length; i++) {
                str && (str += ' ');
                cur = arr[i];
                str += obj[cur] || cur;
            }
        }
        return str;
    }
    return h;
}