<template>
  <div class="contacts">
    <div class="box_bread_crumbs">
      <div class="box_content container">
        <a href="#">Головна </a><a href="#">Контакти</a>
      </div>
    </div>
    <section class="contacts_section-1">
      <h2>контакти</h2>
      <div class="box_content container">
        <div class="box_top">
          <div class="box_mini box_mini-1">
            <div class="box_adress">
              <h5>Адреса:</h5>
              <p>04053, м. Київ,</p>
              <p>вул. Кудрявська</p>
              <p>буд. 3/5, оф. 4</p>
            </div>
          </div>
          <div class="box_mini box_mini-2">
            <div class="box_mail">
              <h5>Email:</h5>
              <a href="mailto:asprofosvit@gmail.com">asprofosvit@gmail.com</a>
            </div>
          </div>
          <div class="box_mini box_mini-3">
            <div class="box_tel">
              <h5>телефон</h5>
              <a class="tel" href="tel:+380443604550">+38 (044) 360-45-50</a>
              <a class="tel" href="tel:+380672337591">+38 (067) 233-75-91</a>
            </div>
          </div>
        </div>
        <div class="box_bottom">
          <h2>підпишись на новини, щоб бути у курсі</h2>
          <div class="box_form">
            <form>
              <input type="text" class="input_email" placeholder="e-mail" />
              <input type="submit" class="input_submit" value="OK" />
            </form>
            <p>або</p>
            <div class="box_messendger">
              <a class="link_facebook" href="https://www.facebook.com/"
                >facebook</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="contacts_section-2">
      <div class="box_content">
        <iframe class="GoogleMaps_wrapper__128ML" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.137654933049!2d30.4989720511683!3d50.457161294661866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce66582595b5%3A0x7b5ada9cb8f548e2!2z0YPQuy4g0JrRg9C00YDRj9Cy0YHQutCw0Y8sIDMvNSwg0JrQuNC10LIsIDAyMDAw!5e0!3m2!1sru!2sua!4v1604348613190!5m2!1sru!2sua" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "contact",
  data() {
    return {
      title: "Contact",
    };
  },
};
</script>
<style scoped src="@/assets/css/screen.css" >
</style>
<style scoped>
</style>

