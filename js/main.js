;(function () {
    new Vue({
        el: "#main",
        data: {
            list: [],
            current: {},
        },
        methods: {
            merge: function () {
                var current = this.current
                var is_update = this.current.id;
                if (is_update) {
                    var index= this.list.findIndex(function (value) {
                        return value.id == is_update;
                    })
                    Vue.set(this.list,index,Object.assign({}, this.current))
                    // this.list[index] = Object.assign({}, this.current);
                } else {
                    if (!current.title && current.title !== 0) {
                        return
                    }
                    var todo = Object.assign({}, this.current)
                    todo.id=this.next_id()
                    this.list.push(todo)
                }
                this.reset_current()
            },
            update: function () {

            },
            remove: function (id) {
                this.list.splice(id, 1);

            },
            next_id:function () {
                return this.list.length + 1;
            },
            setCurrent:function (todo) {
              this.current= Object.assign({},todo)
            },
            reset_current:function () {
                this.setCurrent({})
            }

        }
    })
})()