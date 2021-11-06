new Vue({
    el: '#app',
    data() {
      return {
        isDark: true,
        show: true,
        todoTitle: '',
        todos: []
      }
    },
    created(){
      const query = `
        query {
          getTodos {
            id title done updatedAt createdAt
          }
        }
      `;
      fetch('/graphql', {
        method: 'post',
        headers: {
          'Content-type' : "application/json",
          'Accept' : 'application/json'
      },
        body: JSON.stringify({query})
      })
      .then(res => res.json())
      .then(({data: {getTodos}}) => {
        this.todos = getTodos
      })
      .catch(e => console.log(e));
    },
    methods: {
      addTodo() {
        const title = this.todoTitle.trim()
        if (!title) {
          return
        }
        const query = `
          mutation {
            addTodo(todo: {title: "${title}"}){
              title done id createdAt updatedAt
            }
          }
        `
        fetch('/graphql', {
          method: "post",
          headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
          },
          body: JSON.stringify({query})
        }).then(res => res.json())
        .then(({data}) => {
          this.todos.push(data.addTodo);
          this.todoTitle = '';
        }).catch(e => console.log(e));
      },
      completeTodo(id){
        const query = `
          mutation {
            completeTodo(id: "${id}"){
              updatedAt
            }
          }
        `;
        fetch('/graphql', {
          method: "post",
          headers: {
            "Content-Type":"application/json",
            "Accept" : "application/json"
          },
          body: JSON.stringify({query})
        }).then(res => res.json())
        .then(response => {
          console.log(response);
          const idx = this.todos.findIndex(t => t.id === id);
          this.todos[idx].updatedAt = response.data.completeTodo.updatedAt;
        }).catch(e => console.log(e))
      },
      removeTodo(id) {
        const query = `
          mutation {
            removeTodo(id: "${id}")
          }
        `;
        fetch('/graphql', {
          method: "post",
          headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
          },
          body: JSON.stringify({query})
        }).then(() => {
          this.todos = this.todos.filter(t => t.id !== id);
        }).catch(e => console.log(e));
      }
    },
    filters: {
      capitalize(value) {
        return value.toString().charAt(0).toUpperCase() + value.slice(1)
      },
      date(value, withTime) {
        const options = {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
      };
      if(withTime){
        options.hour = '2-digit',
        options.minute = '2-digit',
        options.second = '2-digit'
      }
        return new Intl.DateTimeFormat('en-En', options).format(new Date(+value))
      }
    }
  })