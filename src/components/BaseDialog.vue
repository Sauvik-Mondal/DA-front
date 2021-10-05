<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <dialog open v-if="show">
      <v-card class="mx-auto container" max-width="650">
        <header>
          <v-card-title>{{ title}}</v-card-title>
          <v-card-subtitle></v-card-subtitle>
        </header>
        <section>
          <slot></slot>
        </section>
        <v-card-actions >
          <v-spacer></v-spacer>
          <slot name="actions">
            <v-btn color="orange lighten-2" text @click="tryClose">Close</v-btn>
          </slot>
        </v-card-actions>
      </v-card>
    </dialog>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    }
  },
  emits: ["close"],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 30vh;
  left: 28%;
  width: 45%;
  z-index: 100;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
  border-radius: 5px;
}

header {
  background-color: orange;
  color: white;
  width: 100%;
  height:40%;
  padding: 1rem;
}
section {
  padding: 1rem;
}
.v-card-title {
  padding: 0;
  margin:0;
}
</style>