<template>
  <div class="team">
    <v-container class="my-5">
        <v-card >
          <v-card-text class=" text-center">
          <h2 class="display-2" align ="center">Introdução</h2>
          <br>
          <p>A página consiste em um trabalho universitário que demostra um 
          sistema em tempo real utilizando API’s públicas. Com o propósito de informar 
          o usuário com informações reais e precisas. Todos as informações são verídicas e coletedas
          da OMS - Organização mundial da saúde.</p>
          <h2 class="title" align ="center">Fonte de dados</h2>
          <br>
          <p> <a href="https://coronavirus-19-api.herokuapp.com/countries" target="_blank">Total de casos por país</a> </p>
          <p> <a href="https://coronavirus-19-api.herokuapp.com/all" target="_blank">Total de casos no mundo</a> </p>
          <p> <a href="https://covid19-brazil-api.now.sh/api/report/v1" target="_blank">Casos do dia em estados no Brasil</a> </p>
          <p> <a href="https://covid-api-brasil.herokuapp.com/casos" target="_blank">Total de Casos no Brasil em ordem cronológica</a> </p>
        </v-card-text>
        
      </v-card>
    </v-container>
    <v-container>  
      <v-card >
        <v-card-text>
          <h2 class="headline" align ="center">Colaboradores</h2>
          <v-row >
            <v-col v-for="person in team" :key="person.name">
              <v-card class="text-xs-center ma-3" flat>
                <v-responsive class="pt-4" align="center">
                  <v-avatar size="100" class="grey lighten-2">
                    <img :src="person.avatar1">
                    <img :src="person.avatar2">
                    <img :src="person.avatar3">
                  </v-avatar>
                </v-responsive>
                <v-card-text align="center">
                  <div class="subheading">{{ person.name }}</div>
                  <v-btn depressed large align="center" :href="person.git" target="_blank">
                    <i class="fab fa-gitlab" ></i>
                    <span>GitLab</span>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

    </v-container>
    <v-container class="my-5">
      <v-card >
        <v-card-text>
          <h1 class="headline" align ="center">Apoiadores</h1>
        
          <v-row>
              <v-col v-for="person in professor" :key="person.name">
                  <v-card flat>
                      <v-responsive class="pt-4" 
                          align = "center"
                      >
                          <v-avatar size="100" class="grey lighten-2">
                              <img :src="person.avatar4">
                              <img :src="person.avatar5">
                          </v-avatar>
                      </v-responsive>
                      <v-card-text 
                          align="center"
                      >
                          <div class="subheading">{{person.name}}</div>
                      </v-card-text>
                  </v-card>
              </v-col>
          </v-row>
        </v-card-text>  
      </v-card>
    </v-container>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      team: [
        { name: 'Miguel Cunha',
          avatar1: 'https://gitlab.com/uploads/-/system/user/avatar/2834689/avatar.png?width=400',
          git: 'https://gitlab.com/Miguel_PC' 
        },
        { name: 'Gabriel Ribeiro',
          avatar2: 'https://secure.gravatar.com/avatar/ded6eb9557d83de1291f0606d53e4946?s=800&d=identicon',
          git: 'https://gitlab.com/gableisure' 
        },
        { name: 'Hugo Marcos',
          avatar3: 'https://gitlab.com/uploads/-/system/user/avatar/3804194/avatar.png?width=400',
          git: 'https://gitlab.com/hugo.marcos' 
        },
      ],
      professor: [
          { name: 'Aderbal Botelho',
            avatar4: 'https://scontent.fbsb3-1.fna.fbcdn.net/v/t1.0-9/81194615_1444785399008810_2678330563424681984_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_oc=AQm0ZQbWGTmGaHUkc0uMHTnu1zDEzls1L92AzNzvz0qQu_5BhEc8tW6guSvOXaQLPEU&_nc_ht=scontent.fbsb3-1.fna&oh=9d71def01f23571b237f4467a84694e6&oe=5EE93DA5'
          },
          { name:'UniCEUB',
            avatar5: 'data:image/jpeg;base64,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'          
          }
      ]
    }
  }
}
</script>