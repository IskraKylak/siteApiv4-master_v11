<template>
  <div class="item_question">
    <p>Питання "1"</p>
    <div class="wrap_input">
      <button class="remove_btn"></button>
      <input type="text">
    </div>
    <p>Тип питання "1"</p>
    <div class="wrap_type_question">
      <div class="wrap_radio">
        <input type="radio" id="radio1">
        <label for="radio1">Одиничний вибір</label>
      </div>
      <div class="wrap_radio">
        <input type="radio" id="radio2">
        <label for="radio2">Множинний вибір</label>
      </div>
    </div>
    <p>Відповіді до питання "1"</p>
    <div class="btn_add_answer">
      Додати відповідь
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>
