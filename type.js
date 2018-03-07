var class2type = {},
    toString = class2type.toString;

function totype(obj) {
    //检测出null和undefined
    if (obj == null) {
        return obj + "";
    }

    return typeof obj === "object" || typeof obj === "function" ?
        class2type[toString.call(obj)] || "object" :
        typeof obj;
}

each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
    function (i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });


function each(obj, callback) {
    var length = obj.length, i = 0;
    for (; i < length; i++) {
        if (callback.call(obj[i], i, obj[i]) === false) {
            break;
        }
    }
    return obj;
}


console.log(totype([1,2]))