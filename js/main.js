;(function () {
    var Event = new Vue()

    Vue.component('task', {
        template: "#task-tpl",
        props: ['todo'],
        methods: {
            action: function (name, params) {
                Event.$emit(name, params)
            }
        }
    })
    new Vue({
        el: "#main",
        data: {
            list: [],
            current: {},
            lastId:0,
        },
        mounted: function () {
            this.list = ms.get('list') || this.list
            this.lastId=ms.get('last_id') || this.lastId
            this.checkAlerts()
            setInterval(() => {
                this.checkAlerts()
            }, 1000)
            Event.$on('remove', (id) => {
                if (id) {
                    this.remove(id)
                }
            })
            Event.$on('toggleComplete', (id) => {
                if (id) {
                    console.log("toggleComplete")
                    this.toggleComplete(id)
                }
            })
            Event.$on("toggleDetail", (id) => {
                this.toggleDetail(id)
            })
            Event.$on('setCurrent', (todo) => {
                this.setCurrent(todo)
            })

        },
        methods: {
            checkAlerts: function () {
                this.list.forEach((row, i) => {
                    if (!row.alertAt || row.alertConfirmed) {
                        return
                    } else {
                        let alertAt = row.alertAt
                        console.log('alertAt:', alertAt)
                        alertAt = new Date(alertAt)
                        let timeStapm = alertAt.getTime()
                        let now = (new Date()).getTime()
                        if (now >= alertAt) {
                            let confirmed = confirm(row.title)
                            Vue.set(this.list[i], 'alertConfirmed', confirmed)
                        }
                    }

                })
            },
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
                this.lastId+=1
                ms.set('lastId',this.lastId)
                return this.lastId
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
            toggleDetail: function (id) {
                let index = this.findIndexByID(id)
                Vue.set(this.list[index],"showDetail",!this.list[index].showDetail)
            },
            toggleComplete: function (id) {
                let i = this.findIndexByID(id)
                Vue.set(this.list[i], 'completed', !this.list[i].completed)
            },
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