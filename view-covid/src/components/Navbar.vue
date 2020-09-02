<template>
    <nav>  
      <v-toolbar height="70px">
        <div>
          <img src="/icone-corona.png" class="pa-0 ml-5">
        </div>
        
        <v-toolbar-title class="font-weight-light font-weight-bold text-uppercase pa-0 headline"
        style="color: #3c5e91;">covid-19</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn-toggle borderless mandatory class="mr-5 mt-5 pr-5">
          
          <v-btn tile group to="/" class="white">
            <v-icon small left class="grey--text">fa-globe</v-icon>
            <span>Mundial</span>
          </v-btn>

          <v-btn to="/panel-brasil" class="white">
            <v-icon small left class="grey--text">fa-flag</v-icon>
            <span>Brasil</span>
          </v-btn>

          <v-btn to="/sobre" class="white">
            <v-icon small left class="grey--text">fa-info-circle</v-icon>
            <span>Sobre</span>
          </v-btn>

        </v-btn-toggle>
      </v-toolbar>   
    </nav>
</template>

<script>

export default {
  data() {
    return {
      
    }
  }
}
</script>
