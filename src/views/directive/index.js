export default {
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  }
}
