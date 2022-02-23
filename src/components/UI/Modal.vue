<template>
  <transition name="modal">
    <div class="modal__wrapper" @click="$emit('close')">
      <div class="modal__content" @click.stop="">
        <div class="modal-header">
          <span class="button-close" @click="$emit('close')">x</span>
        </div>
        <div class="modal-body">
          <slot name="body">default body</slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  //   name: "Modal",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  mounted() {
    document.body.addEventListener("keyup", (e) => {
      if (e.keyCode === 27) {
        this.$emit("close");
      }
    });
  },
  computed: {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* // animation */

.modal-enter,
.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal__content,
.modal-leave-active .modal__content {
  transform: scale(1.2);
}

.modal__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: opacity 0.3s ease;
  z-index: 1002;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal__content {
  position: relative;
  max-width: 600px;
  width: 100%;
  background-color: #fff;
  transition: all 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
  padding-bottom: 20px;
}

.modal-header {
  display: flex;
  align-self: center;
  justify-content: space-between;
  position: relative;
}
.button-close {
  position: absolute;
  right: 20px;
  top: 14px;
  cursor: pointer;
  color: #fff;
  font-size: 20px;
}
.modal-body {
  text-align: center;
}
</style>
