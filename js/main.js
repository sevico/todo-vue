;(function () {
    new Vue({
        el: "#main",
        data: {
            list: [],
            current: {},
        },
        mounted: function () {
            this.list = ms.get('list') || this.list

        },
        methods: {
            merge: function () {
                var current = this.current
                var is_update = this.current.id;
                var id = is_update
                if (is_update) {
                    var index = this.findIndexByID(id);
                    Vue.set(this.list, index, Object.assign({}, this.current))
                    // this.list[index] = Object.assign({}, this.current);
                } else {
                    if (!current.title && current.title !== 0) {
                        return
                    }
                    var todo = Object.assign({}, this.current)
                    todo.id = this.next_id()
                    this.list.push(todo)
                }
                this.reset_current()
            },
            update: function () {

            },
            remove: function (id) {
                let index = this.findIndexByID(id)
                this.list.splice(index, 1);
            },
            next_id: function () {
                return this.list.length + 1;
            },
            setCurrent: function (todo) {
                this.current = Object.assign({}, todo)
            },
            reset_current: function () {
                this.setCurrent({})
            },
            findIndexByID: function (id) {
                return this.list.findIndex(function (value) {
                    return value.id == id;
                })
            },
            toggleComplete: function (id) {
                let i = this.findIndexByID(id)
                Vue.set(this.list[i], 'completed', !this.list[i].completed)
            }
        },
        watch: {
            list: {
                deep: true,
                handler: function (n, o) {
                    if (n) {
                        ms.set('list', n)
                    } else {
                        ms.set('list', [])
                    }
                }
            }
        },
    })
})()