export default function (x) {
    x = x || '';
    var m = x.replace(/^\s+/, '');
    m = m.replace(/\s+$/, '');
    return m;
}