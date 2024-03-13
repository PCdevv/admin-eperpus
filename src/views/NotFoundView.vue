<template>
  <div class="h-100">
    <v-container class="d-flex h-screen">
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <h1 class="text-h3 text-primary">Whoops, 404</h1>
          <p>The page you were looking for does not exist</p>
          <router-link to="/">
            <p>
              <v-btn color="primary" variant="outlined"> Get me out of here! </v-btn>
            </p>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
