var App = new Vue({
    el: "#app",
    delimiters:["[[","]]"],
    data() {
      return {
        cardTitleInput: "",
        cards: [],
        currentCard : {},

        tasks: [],
        taskContent:"",
        currentTask: {}
      }
      },
      
    computed: {
      filteredCards() {
        var _this = this
        if(this.cardTitleInput === 0) return this.cards
        return this.cards.map(function(card) {
          return {
            name: card.name,
            cardColor: card.cardColor,
            items: card.items.filter(function (item) {
              return item.includes(_this.search)
            })
          }
        })
      }
    },
    
    methods: {
        saveTaskBtn(){
            const saveTask = document.getElementById("saveTask")
            saveTask.click()
        },
        getHeaders(){
            var cookieValue = null;
            if(document.cookie && document.cookie != ''){
                var cookies = document.cookie.split(';')
                for(var i = 0;i < cookies.length; i++){
                    var cookie = cookies[i].trim()
                    if(cookie.substring(0, name.length + 1) === (name + '=')){
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                        break
                    }
                }
            }
            return cookieValue
        },
        newHeaders(){
            axios.defaults.xsrfHeaderName = "X-CSRFToken";
            const csrftoken = this.getHeaders('csrftoken');
            const headers = {"X-CSRFTOKEN": csrftoken}
            return headers
        },

      removeCard (card) {
        this.cards.splice(this.cards.indexOf(card), 1)
      },
      clearSearchField () {
        this.cardTitleInput = ""
      },

      async getCards(){
          await axios.get('http://localhost:8000/api/v1/cards/all').then(response => {
              this.cards = response.data
          })
          
      },

     async postCards(){
        if (this.cardTitleInput.length){
            await axios.post('http://localhost:8000/api/v1/cards/all/?format=json',{"title":this.cardTitleInput}, this.newHeaders())
            this.cardTitleInput = ""
            await this.getCards()
        }
        else{
            alert('Your card title is empty')
        }
        
      },

      callUpdateCardTitle(obj){
        this.cardTitleInput = obj.title
        this.currentCard = obj
      },
      
      async updateCard(){
        await axios.put(`http://localhost:8000/api/v1/cards/updelete/${this.currentCard.id}/`,{"title":this.cardTitleInput}, this.newHeaders())
        this.cardTitleInput = ""
        await this.getCards()
      },

      callDeleteCardTitle(obj){
        this.currentCard = obj
      },

      async deleteCard(){
          await axios.delete(`http://localhost:8000/api/v1/cards/updelete/${this.currentCard.id}/`,{}, this.newHeaders())
          this.cardTitleInput = ""
          await this.getCards()
      },

      getTasks(){
        axios.get('http://localhost:8000/api/v1/tasks/all').then(response =>{
            this.tasks = response.data
        })
      },

      callCardTasks(obj){
        this.currentCard = obj
        this.taskContent = ""
      },
      async postTasks(){
       context = {"card":this.currentCard.id,"counteudo":this.taskContent}
       
        await axios.post('http://localhost:8000/api/v1/tasks/all/?format=json',
         {
             "card":this.currentCard.id,
            "conteudo":this.taskContent
            }, this.newHeaders())
            
        await this.getTasks()
      },

      callUpdateCardTask(obj){
          this.currentTask = obj
          this.taskContent = obj.conteudo
      },

      async updateTask(){
          await axios.put(`http://localhost:8000/api/v1/tasks/updelete/${this.currentTask.id}/`,
           {
             "card": this.currentTask.card,
             "conteudo": this.taskContent  
           }, this.newHeaders())

           await this.getTasks()
      },

      async deleteTask(obj){
        await axios.delete(`http://localhost:8000/api/v1/tasks/updelete/${obj.id}/`,
        {}, this.newHeaders())

        await this.getTasks()
      },
      
    }, 

    created(){
        this.getCards()
        this.getTasks()
    }
  });