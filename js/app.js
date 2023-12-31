const { createApp } = Vue;
var DateTime = luxon.DateTime;






createApp({

    data(){
        return{

            /* indice conversazione attiva */

            activeConversation: 0,

            /* testo da cercare */
            textToSearch:'',

            /* orario semplificato */
            simpleOrario: [],

            /* nuovo messaggio  */
            newMessage : "",

            /* il mio contatto */
            myAvatar:{
                nome: 'Mario Rossi',
                img:"./img/avatar_io.jpg"
                
            },
            /* lista contatti */
            contacts: [
                {
                    name: 'Michele',
                    avatar: 'img/avatar_1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: 'img/avatar_2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: 'img/avatar_3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: 'img/avatar_4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: 'img/avatar_5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: 'img/avatar_6.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: 'img/avatar_7.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: 'img/avatar_8.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ]
            

        }
    },

    methods:{

        /* invio del messaggio */
        sendMessage: function (){


            /* salvo la data di ora */
            let dt = DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE);
            console.log(dt)
            /* inizializzo nuovo messaggio */
            let newmessage = {date: dt, message: this.newMessage, status: 'sent'};
            /* inserisco nell'array dei messaggi */
            this.contacts[this.activeConversation].messages.push(newmessage);

            /* pusho l'orario attuale negli orari semplici */
            this.simpleOrario.push(dt);

            /* risposta automatica dopo 3 secondi */
            let response = {date: dt, message: 'ok', status: 'received'};
            setTimeout(() => {
                this.contacts[this.activeConversation].messages.push(response);
                this.simpleOrario.push(response.date)

                
            }, 3000);

            /* reinizializzo la variabile che dovrà contenere il nuovo messaggio */
            console.log(this.simpleOrario);
            this.newMessage=""; 



            

        },

        /* funzione cerca */
        cerca: function(){  


            /* cerca nei contatti (non case sensitive) */
            let searchText= this.textToSearch.toLowerCase();
            /* se è vero rimane senno lo toglie */
            this.contacts.forEach(element => {
                let thisElement=element.name.toLowerCase();
                if(thisElement.includes(searchText)){

                    element.visible=true
                }else{
                    element.visible=false
                }
            });




        },

        //funzione che mi traduce l'orario in legibile

        getOrario: function() {
            
            this.simpleOrario=[]
            this.contacts[this.activeConversation].messages.forEach(element => {
                
                let simpletime = element.date.slice(11,16);
                this.simpleOrario.push(simpletime);
            });
            
        },

    

    }








}).mount('#app')