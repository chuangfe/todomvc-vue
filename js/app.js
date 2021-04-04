(function (window) {
  "use strict";

  const filterTodos = {
    // 返回全部的 todos
    all(todos) {
      return todos;
    },
    // 返回未完成的 todos
    active(todos) {
      return todos.filter((todo) => {
        return todo.completed === false;
      });
    },
    // 返回已完成的 todos
    completed(todos) {
      return todos.filter((todo) => {
        return todo.completed === true;
      });
    },
  };

  const vm = new Vue({
    el: "#app",
    data: {
      // 要新增的 todo title
      title: "",
      todos: [
        { id: 1, title: "HTML", completed: false, editing: false },
        { id: 2, title: "CSS", completed: false, editing: false },
        { id: 3, title: "Javascript", completed: false, editing: false },
        { id: 4, title: "Vue", completed: false, editing: false },
        { id: 5, title: "Vue-router", completed: false, editing: false },
        { id: 6, title: "Vuex", completed: false, editing: false },
        { id: 7, title: "Vue-cli", completed: false, editing: false },
        { id: 8, title: "Bootstrap", completed: false, editing: false },
        { id: 9, title: "Tailwindcss", completed: false, editing: false },
        { id: 10, title: "English", completed: false, editing: false },
      ],
      // 當前正在編輯的 todo
      editingTodo: null,
      hash: "#/all",
    },
    computed: {
      filterTodos() {
        return filterTodos[this.hash.slice(2)](this.todos);
      },
      // 計算未完成的 todo
      filterLeft() {
        return filterTodos.active(this.todos).length;
      },
      // 計算已經完的 todo
      filterClear() {
        return filterTodos.completed(this.todos).length;
      },
      // 這部分真難懂
      toggleAll: {
        // 設值, 針對 checkbox model toggleAll 設定值時執行的函式
        set(val) {
          this.todos.forEach((todo) => {
            todo.completed = val;
          });
        },
        // 取值, 或者說依照函式內容的 data 改變時, 執行的函式, 從而改變自身的值
        get() {
          // 未完成的 todo 數量
          let length = filterTodos.active(this.todos).length;
          // 判斷, 未完成的數量 === 0, 0 就返回 true, 否則反之
          return length === 0;
        },
      },
    },
    methods: {
      // 新增 todo
      create() {
        if (!this.title) return false;
        this.todos.push({
          id: this.todos.length ? this.todos[this.todos.length - 1].id + 1 : 1,
          title: this.title,
          completed: false,
        });
        this.title = "";
      },
      // 刪除 todo
      remove(todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
      },
      // 編輯 todo
      editTodo(todo) {
        this.editingTodo = todo;
        todo.editing = true;
      },
      // todo 結束編輯
      doneEdit(todo) {
        this.editingTodo = null;
        todo.editing = false;
        if (!todo.title) {
          this.remove(todo);
        }
      },
      // 刪除所有已完成的 todo
      clear() {
        this.todos = filterTodos.active(this.todos);
      },
      hashChangeHandler() {
        this.hash = location.hash;
      },
    },
    directives: {
      /**
       * 當有 todo dblclick editTodo 事件函式執行後, 紀錄正在編輯的 todo
       * editingTodo, 自訂指令 v-todo-edit-focus="editingTodo === todo"
       * 當 editingTodo === todo 時, 指令的值改變時, 指令的生命週期 update 會執行,
       * 以下為簡寫方式, 函式會在 bind update 兩個生命週期的狀態執行
       */
      // el 有該指令的元素
      // binding 指令的資料, 例如參數值等等
      "todo-edit-focus": function (el, binding) {
        if (binding.value) {
          el.focus();
        }
      },
    },
    mounted() {
      location.hash = "#/all";
      window.addEventListener("hashchange", this.hashChangeHandler);
    },
  });
})(window);
