<template>
	<div class="panel-brasil">
        <v-container class="my-1">

            <v-row>
                <v-col cols="6">
                    <div class="display-1"><b>Dashboard</b> Coronavírus</div>
                    <div class="grey--text">Atualizado em: {{dateFormatted}}</div>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="3">
                    <v-select @input="getDataSelectedEstado()" v-model="selectedEstado" :items="estados" placeholder="Selecione um estado" solo></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col align="center" justify="center">
                    <v-card width="250px">
                        <v-card-text class="display-1 text-center primary--text">
                            <v-icon left color="primary">fa-virus</v-icon>
                            {{ objSelected.cases }}
                        </v-card-text>
                        <v-card-title class="confirmados justify-center pa-0">Casos confirmados</v-card-title>
                    </v-card>
                </v-col>
                <v-col align="center" justify="center">
                    <v-card width="250px">
                        <v-card-text class="display-1 text-center secondary--text">
                            <v-icon left color="secondary">fa-skull-crossbones</v-icon>
                            {{ objSelected.deaths }}
                        </v-card-text>
                        <v-card-title class="obitos justify-center pa-0">Óbitos</v-card-title>
                    </v-card>
                </v-col>
            </v-row>

            <v-row class="mt-4">
                <v-col cols="6">
                <v-card>
                    <v-card-title class="subtitle-1 grey--text pa-2">
                    <v-icon right color="primary">fa-chart-bar</v-icon>
                    <span class="ml-3">Top 10 casos por Estado</span> 
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
                    <span class="ml-3">Top 10 óbitos por Estado</span> 
                    </v-card-title>
                    <v-card-text>
                    <bar-chart :data="barChartDeaths" height="300px" :colors="['#31b5a1']"></bar-chart>
                    </v-card-text>
                </v-card>
                </v-col>
            </v-row>

            <v-row class="mt-4">
                <v-col>
                    <v-card>
                        <v-card-title class="subtitle-1 grey--text pa-2">
                            <v-icon right color="primary">fa-chart-area</v-icon>
                            <span class="ml-3">Novos casos da doença no Brasil por Dia</span> 
                        </v-card-title>
                        <v-card-text>
                            <area-chart :data="lineChartCasesBrazil" :colors="['#31b5a1']"></area-chart>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>     
            <v-row class="mt-4">
                <v-col>
                    <v-card>
                        <v-card-title class="subtitle-1 grey--text pa-2">
                            <v-icon right color="primary">fa-chart-area</v-icon>
                            <span class="ml-3">Novos óbitos pela doença no Brasil por Dia</span> 
                        </v-card-title>
                        <v-card-text>
                            <area-chart :data="lineChartDeathsBrazil" :colors="['#e74d4b']"></area-chart>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row> 
            <v-row >
        <v-col>
          <v-card>
            <v-card-title class="confirmados">
              <span class="pt-0">Síntese de casos, óbitos, suspeitos e descartados</span>
              <v-spacer></v-spacer>
            <v-text-field class="mt-5" v-model="search" placeholder="Pesquise por estado" solo append-icon="fa-search"></v-text-field>
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
    </div>
</template>

<script>
const axios = require('axios')

export default {
    
  data: () => ({
    selectedEstado: "",
    estados: [],
    objSelected: {},
    lineChartCasesBrazil: null,
    lineChartDeathsBrazil: null,
    barChartCases: [],
    barChartDeaths: [],
    dateFormatted: "",
    headersTable: [
          {
            text: 'Estado',
            align: 'start',
            value: 'state',
          },
          { text: 'Casos', value: 'cases' },
          { text: 'Óbitos', value: 'deaths' },
          { text: 'Suspeitos', value: 'suspects' },
          { text: 'Descartados', value: 'refuses' },
        ],
    dataTable: [],
    search: "",
  }),
 methods: {
    getEstados() {
            axios.get('https://covid19-brazil-api.now.sh/api/report/v1')
                .then(resp => {
                    for(var i = 0; i < resp.data.data.length; ++i) {
                        this.estados.push(resp.data.data[i].state)
                    }
                })
    },
    setDataSelectedEstados() {
            axios.get('https://covid-api-brasil.herokuapp.com/casos')
                .then(resp => {
                    this.objSelected.cases = resp.data.totalCasos
                    this.objSelected.deaths = resp.data.totalMortes
                })
    },
    setDataLineChartCasesBrazil() {
        var objAll = {}
        var date = ''
        axios.get('https://covid-api-brasil.herokuapp.com/casos')
            .then(resp => {
                for(var i = 0; i < resp.data.casos.length; ++i){
                    date = resp.data.casos[i].data
                    objAll[date] = resp.data.casos[i].casos
                } 
                this.lineChartCasesBrazil = objAll
        })
    },
    setDataLineChartDeathsBrazil() {
        var objAll = {}
        var date = ''
        axios.get('https://covid-api-brasil.herokuapp.com/casos')
            .then(resp => {
                for(var i = 0; i < resp.data.casos.length; ++i){
                    date = resp.data.casos[i].data
                    objAll[date] = resp.data.casos[i].mortes
                } 
                this.lineChartDeathsBrazil = objAll
        })
    },
    getDataSelectedEstado() {
            var objAll = []
            axios.get('https://covid19-brazil-api.now.sh/api/report/v1')
                .then(resp => {
                    for(var i = 0; i < resp.data.data.length; ++i) {
                        objAll[i] = resp.data.data[i]
                    }
                    for(var j = 0; j < objAll.length; ++j){
                        if(objAll[j].state == this.selectedEstado) {
                            this.objSelected = objAll[j]
                        }
                    }  
                })
        },
  setDataBarChartCases() {
        var objAll = []
         axios.get('https://covid19-brazil-api.now.sh/api/report/v1')
            .then(resp => {
                for(var i = 0; i < resp.data.data.length; ++i){
                    objAll[i] = resp.data.data[i]
                }
                for(var j = 0; j < 10; ++j){
                    this.barChartCases[j] = [objAll[j].uf, objAll[j].cases]
                }
            })
    },
    setDataBarChartDeaths() {
        var objAll = []
         axios.get('https://covid19-brazil-api.now.sh/api/report/v1')
            .then(resp => {
                for(var i = 0; i < resp.data.data.length; ++i){
                    objAll[i] = resp.data.data[i]
                }
                objAll.sort(function (a, b) {
                    return (b.deaths > a.deaths) ? 1 : ((a.deaths > b.deaths) ? -1 : 0)
                })
                for(var j = 0; j < 10; ++j){
                    this.barChartDeaths[j] = [objAll[j].uf, objAll[j].deaths]
                }
            })
    },
    setDataTable() {
      var objAll = []
      axios.get('https://covid19-brazil-api.now.sh/api/report/v1')
        .then(resp => {
            for(var i = 0; i < resp.data.data.length; ++i){
                var objEstado = {}
                objEstado.state = resp.data.data[i].state 
                objEstado.cases = resp.data.data[i].cases
                objEstado.deaths =  resp.data.data[i].deaths
                objEstado.suspects = resp.data.data[i].suspects
                objEstado.refuses = resp.data.data[i].refuses
                objAll.push(objEstado)
            }
          this.dataTable = objAll
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
    this.setDataSelectedEstados()
    this.getEstados()
    this.setDataLineChartCasesBrazil()
    this.setDataLineChartDeathsBrazil()
    this.setDataBarChartCases()
    this.setDataBarChartDeaths()
    this.getTimeUpdate()
    this.setDataTable()
  }

}

</script>
