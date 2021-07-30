<template>
  <section>
    <header>
      <input
        class="new-todo"
        placeholder="你接下来要做什么？"
        v-model="newTodo"
        v-autofocus
        @keyup.enter="addTodo"
      />
    </header>
    <transition-group
      name="staggered-fade"
      tag="ul"
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
      class="todo-list"
    >
      <li
        v-for="todo in computedTodos"
        class="todo"
        :key="todo.id"
        :class="{ completed: todo.completed}"
      >
        <todo-item
          v-bind:title.sync="todo.title"
          v-bind:completed.sync="todo.completed"
          @delete="removeTodo(todo)"
        ></todo-item>
      </li>
    </transition-group>
    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
      </span>
      <button
        class="clear-completed"
        @click="removeCompleted"
        v-show="todos.length > remaining"
      >
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>
import TodoItem from '../components/TodoItem'
import Velocity from 'velocity-animate'
let id = 1
export default {
  components: {
    'todo-item': TodoItem
  },

  data () {
    return {
      todos: [], // 所有备忘录列表
      newTodo: '', // 新增备忘录
      editedTodo: {} // 修改中的备忘录
    }
  },

  computed: {
    remaining () {
      return this.todos.filter(todo => !todo.completed).length
    },

    computedTodos () {
      return this.todos.filter(todo => {
        return (todo.title.toLowerCase().indexOf(this.newTodo.toLowerCase()) !== -1)
      })
    }
  },

  filters: {
    pluralize (num) {
      return num > 1 ? 'items' : 'item'
    }
  },

  directives: {
    autofocus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },

  methods: {
    // 新增备忘录
    addTodo () {
      if (!this.newTodo) {
        return
      }
      this.todos.unshift({
        id: id++,
        title: this.newTodo,
        completed: false
      })
      this.newTodo = ''
    },

    removeTodo (todo) {
      const index = this.todos.findIndex(x => x.id === todo.id)
      this.todos.splice(index, 1)
    },

    removeCompleted () {
      this.todos = this.todos.filter(x => !x.completed)
    },

    beforeEnter (el) {
      el.style.opacity = 0
      el.style.height = 0
    },

    enter (el, done) {
      let delay = el.dataset.index * 150
      setTimeout(function () {
        // eslint-disable-next-line
        Velocity(
          el,
          {
            opacity: 1,
            height: '58px'
          },
          {
            complete: done
          }
        )
      }, delay)
    },

    leave (el, done) {
      let delay = el.dataset.index * 150
      setTimeout(function () {
        // eslint-disable-next-line
        Velocity(
          el,
          {
            opacity: 0,
            height: 0
          },
          {
            complete: done
          }
        )
      }, delay)
    }
  }
}
</script>

<style scope>
@import "https://unpkg.com/todomvc-app-css@2.1.0/index.css";
</style>