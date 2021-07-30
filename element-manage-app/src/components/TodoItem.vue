<template>
  <div :class="{editing: isEdited}">
    <div class="view">
      <!-- 选择某条备忘录 -->
      <!-- v-model绑定是否选中 -->
      <input
        type="checkbox"
        class="toggle"
        @change="updateChecked($event.target.checked)"
      />
      <!-- 双击可以操作备忘 -->
      <label @dblclick="editTodo">{{ title }}</label>
      <!-- 删除某些备忘 -->
      <button class="destroy" @click="removeTodo"></button>
    </div>
    <input
      class="edit"
      type="text"
      v-autofocus
      v-model="editingTitle"
      v-if="isEdited"
      @blur="doneEdit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
    />
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  data () {
    return {
      isEdited: false,
      editingTitle: ''
    }
  },

  directives: {
    autofocus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },

  props: {
    title: {
      type: String,
      default: ''
    },

    completed: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    editTodo () {
      this.editingTitle = this.title
      this.isEdited = true
    },

    doneEdit () {
      if (this.isEdited) {
        this.$emit('update:title', this.editingTitle)
        this.isEdited = false
      }
    },

    cancelEdit () {
      this.isEdited = false
    },

    updateChecked (completed) {
      this.$emit('update:completed', completed)
    },

    removeTodo () {
      this.$emit('delete')
    }
  }
}
</script>

<style scope>
 .todo-list li .editing .view {
   display: none;
 }

 .todo-list li .editing .edit {
   display: block;
   width: 506px;
   padding: 12px 16px;
   margin: 0 0 0 43px;
 }
</style>