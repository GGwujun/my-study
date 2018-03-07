var Observable = {
    callbacks: [],
    add: function (fn) {
        this.callbacks.push(fn);
    },
    fire: function () {
        this.callbacks.forEach(function (fn) {
            fn();
        })
    }
}


Observable.add(function () {
    console.log(1)
})
Observable.fire(function () {
    console.log(2)
})

Observable.fire(); // 1, 2