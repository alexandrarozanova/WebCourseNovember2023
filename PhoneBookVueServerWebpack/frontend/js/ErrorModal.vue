<template>
  <div ref="modal" class="modal fade" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="header"></slot>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <button @click="hide" type="button" class="btn btn-danger">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Modal} from "bootstrap";

export default {
  name: "ErrorModal",

  data() {
    return {
      modal: null
    };
  },

  mounted() {
    this.modal = new Modal(this.$refs.modal, {});
  },

  methods: {
    show() {
      this.modal.show();
    },

    hide() {
      this.modal.hide();
    }
  }
}
</script>