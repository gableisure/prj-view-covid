<template>
  <div class="home">
    <v-container class="my-1">

      <v-row>
        <v-col cols="6">
          <div class="display-1"><b>Dashboard</b> Coronavírus</div>
          <div class="grey--text">Atualizado em: {{dateFormatted}}</div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="3">
          <v-select @input="getDataCountrySelected()" v-model="select_countries" :items="countries" placeholder="Selecione um país" solo></v-select>
        </v-col>
      </v-row>

      <v-row class="mx-5">
        <v-col align="center" justify="center">
          <v-card width="250px">
            <v-card-text class="display-1 text-center primary--text">
              <v-icon left color="primary">fa-virus</v-icon>
              {{objSelected.cases | numeral('0,0')}}
            </v-card-text>
            <v-card-title class="confirmados justify-center pa-0">Casos confirmados</v-card-title>
          </v-card>
        </v-col>

        <v-col align="center" justify="center">
           <v-card width="250px">
            <v-card-text class="display-1 text-center secondary--text">
              <v-icon left color="secondary">fa-skull-crossbones</v-icon>
              {{objSelected.deaths | numeral('0,0')}}
            </v-card-text>
            <v-card-title class="obitos justify-center pa-0">Óbitos</v-card-title>
          </v-card>
        </v-col>

        <v-col align="center" justify="center">
          <v-card width="250px">
            <v-card-text class="display-1 text-center accent--text">
              <v-icon left color="accent">fa-heart</v-icon>
              {{objSelected.recovered | numeral('0,0')}}
            </v-card-text>
            <v-card-title class="recuperados justify-center pa-0">Recuperados</v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col cols="6">
          <v-card>
            <v-card-title class="subtitle-1 grey--text pa-2">
              <v-icon right color="primary">fa-chart-bar</v-icon>
              <span class="ml-3">Top 10 casos por País</span> 
            </v-card-title>
            <v-card-text>
              <bar-chart :data="barChartCases" height="300px" :colors="['#31b5a1']"></bar-chart>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-card-title class="subtitle-1 grey--text pa-2">
              <v-icon right color="primary">fa-chart-bar</v-icon>
              <span class="ml-3">Top 10 óbitos por País</span> 
              </v-card-title>
            <v-card-text>
              <bar-chart :data="barChartDeaths" height="300px" :colors="['#31b5a1']"></bar-chart>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

       <v-row class="mt-4">
        <v-col cols="6">
          <v-card>
            <v-card-title class="subtitle-1 grey--text pa-2">
              <v-icon right color="primary">fa-chart-bar</v-icon>
              <span class="ml-3">Top 5 casos Hoje por País</span> 
              </v-card-title>
            <v-card-text>
              <bar-chart :data="barChartTodayCases" height="300px" :colors="['#31b5a1']"></bar-chart>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-card-title class="subtitle-1 grey--text pa-2">
              <v-icon right color="primary">fa-chart-bar</v-icon>
              <span class="ml-3">Top 5 óbitos Hoje por País</span> 
              </v-card-title>
            <v-card-text>
              <bar-chart :data="barChartTodayDeaths" height="300px" :colors="['#31b5a1']"></bar-chart>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row >
        <v-col>
          <v-card>
            <v-card-title class="confirmados">
              <span class="pt-0">Síntese de casos, óbitos, recuperados, casos hoje, mortes hoje</span>
              <v-spacer></v-spacer>
            <v-text-field class="mt-5" v-model="search" placeholder="Pesquise por país" solo append-icon="fa-search"></v-text-field>
            </v-card-title>
            <v-card-text>
               <v-data-table 
               :headers="headersTable" 
               :search="search" 
               :items="dataTable"
               ></v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      
      </v-container>
      <Footer/>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  data() {
    return {
      objAll: [],
      objSelected: {},
      countries: [],
      select_countries: "",
      barChartCases: [],
      barChartDeaths: [],
      barChartTodayCases: [],
      barChartTodayDeaths: [],
      lineChartCasesBrazil: null,
      search: "",
      countriesByDatePostmanAPI: [],
      dateFormatted:"",
      headersTable: [
          {
            text: 'País',
            align: 'start',
            value: 'country',
          },
          { text: 'Casos', value: 'cases' },
          { text: 'Óbitos', value: 'deaths' },
          { text: 'Recuperados', value: 'recovered' },
          { text: 'Casos Hoje', value: 'todayCases' },
          { text: 'Mortes Hoje', value: 'todayDeaths' },
        ],
        dataTable: [],
    }
  },
  methods: {
    getCountries() {
      axios.get('https://coronavirus-19-api.herokuapp.com/countries')
        .then(resp => {
          for(var i = 1; i < resp.data.length; ++i){
            if(!(resp.data[i].country == 'Total:')){
              this.countries.push(resp.data[i].country)
              this.sortBy(this.coutries)
            }
          }
        })
    },
    sortBy(prop){
      this.countries.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
    },
    setDataBarChartCases() {
      var objAll = []
      axios.get('https://coronavirus-19-api.herokuapp.com/countries')
        .then(resp => {
          objAll = resp.data
          for(var i = 0; i < resp.data.length; ++i){
            if(!(resp.data[i].country == 'Total:'))
              objAll[i] = resp.data[i+1]
          }
          objAll.sort(function (a, b) {
            return (b.cases > a.cases) ? 1 : ((a.cases > b.cases) ? -1 : 0)
          }) 
          for(var j = 0; j < 10; ++j){
            this.barChartCases[j] = [objAll[j].country, objAll[j].cases]
          }
        })
    },
    setDataBarChartDeaths() {
      var objAll = []
      axios.get('https://coronavirus-19-api.herokuapp.com/countries')
        .then(resp => {
          objAll = resp.data
          for(var i = 0; i < resp.data.length; ++i){
            if(!(resp.data[i].country == 'Total:'))
              objAll[i] = resp.data[i+1]
          }
          objAll.sort(function (a, b) {
            return (b.deaths > a.deaths) ? 1 : ((a.deaths > b.deaths) ? -1 : 0)
          }) 
          for(var j = 0; j < 10; ++j){
            this.barChartDeaths[j] = [objAll[j].country, objAll[j].deaths]
          }
        })
    },
    setDataBarChartTodayCases() {
      var objAll = []
      axios.get('https://coronavirus-19-api.herokuapp.com/countries')
        .then(resp => {
          objAll = resp.data
          for(var i = 0; i < resp.data.length; ++i){
            if(!(resp.data[i].country == 'Total:'))
              objAll[i] = resp.data[i+1]
          }
          objAll.sort(function (a, b) {
            return (b.todayCases > a.todayCases) ? 1 : ((a.todayCases > b.todayCases) ? -1 : 0)
          }) 
          for(var j = 0; j < 5; ++j){
            this.barChartTodayCases[j] = [objAll[j].country, objAll[j].todayCases]
          }
        })
    },
    setDataBarChartTodayDeaths() {
      var objAll = []
      axios.get('https://coronavirus-19-api.herokuapp.com/countries')
        .then(resp => {
          objAll = resp.data
          for(var i = 0; i < resp.data.length; ++i){
            if(!(resp.data[i].country == 'Total:'))
              objAll[i] = resp.data[i+1]
          }
          objAll.sort(function (a, b) {
            return (b.todayDeaths > a.todayDeaths) ? 1 : ((a.todayDeaths > b.todayDeaths) ? -1 : 0)
          }) 
          for(var j = 0; j < 5; ++j){
            this.barChartTodayDeaths[j] = [objAll[j].country, objAll[j].todayDeaths]
          }
        })
    },
    setDataTable() {
      var objAll = []
      axios.get('https://coronavirus-19-api.herokuapp.com/countries')
        .then(resp => {
          for(var i = 0; i < resp.data.length-1; ++i){
            if(!(resp.data[i+1].country == 'Total:')){
                var objCountry = {}
                objCountry.country = resp.data[i+1].country 
                objCountry.cases = resp.data[i+1].cases
                objCountry.deaths =  resp.data[i+1].deaths
                objCountry.recovered = resp.data[i+1].recovered
                objCountry.todayCases = resp.data[i+1].todayCases
                objCountry.todayDeaths = resp.data[i+1].todayDeaths  
              }
              objAll.push(objCountry)
          }
          this.dataTable = objAll
        })
    },
    setObjAll() {
      axios.get('https://coronavirus-19-api.herokuapp.com/countries')
        .then(resp => {
          for(var i = 1; i < resp.data.length-1; ++i){
            if(!(resp.data[i+1].country == 'Total:')){
              this.objAll[i] = resp.data[i+1]
            }
          }
          
        })
    },
    getDataCountrySelected() {
      var objAll = []
       axios.get('https://coronavirus-19-api.herokuapp.com/countries')
        .then(resp => {
          for(var i = 0; i < resp.data.length-1; ++i){
            if(!(resp.data[i+1].country == 'Total:')){
              objAll[i] = resp.data[i+1]
            }
          }
          for(var j = 0; j < objAll.length; ++j){
            if(objAll[j].country == this.select_countries) {
              this.objSelected = objAll[j]
            }
          }  
        })
    },
    getTimeUpdate() {
        var date = new Date()
        var hour = date.getHours()
        var minute = date.getMinutes()
        if(hour < 10)
            hour = `0${hour}`
        if(minute < 10)
            minute = `0${minute}`
        this.dateFormatted = `${date.getDate()}/0${date.getMonth()}/${date.getFullYear()} ${hour}:${minute}`
    },

  },
  mounted() {
    axios.get('https://coronavirus-19-api.herokuapp.com/all')
      .then(resp => {
        this.objSelected.cases = resp.data.cases
        this.objSelected.deaths = resp.data.deaths
        this.objSelected.recovered = resp.data.recovered
        this.getCountries()
        this.setDataBarChartCases()
        this.setDataBarChartDeaths()
        this.setDataBarChartTodayCases()
        this.setDataBarChartTodayDeaths()
        this.setDataTable()
        this.setObjAll()
        this.getTimeUpdate()
      })
  },

}
</script>


<style>
.confirmados {
  border-left: 4px solid #49beac
}
.obitos {
  border-left: 4px solid #e74d4b
}
.recuperados {
  border-left: 4px solid #53a857
}

</style>