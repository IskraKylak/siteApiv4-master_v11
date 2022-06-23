<template>
  <div class="main-lc">
    <Navbar :isOpen="isOpen" :title_nav="title_nav" @click-my="isOpen = !isOpen" />
    <Sidebar :isOpen="isOpen" @click-my="isOpen = !isOpen" @editTitle="editTitle"/>
    <main class="main" :class="{ open: isOpen }">
      <router-view  />
    </main>
    <footer class="footer" :class="{ open: isOpen }">
      <div class="footer-box">
        <p>
          @ 2021
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";

export default {
  data: () => ({
    isOpen: true,
    title_nav: 'Кабінет'
  }),
  methods: {
    editTitle (data) {
      this.title_nav = data
    }
  },
  components: {
    Navbar,
    Sidebar
  }
}
</script>
<style scoped src="@/assets/lc/css/style.min.css">
</style>
<style lang="scss">
.main-lc {
  margin-top: -160px;
  @media (max-width: 768px) {
    margin-top: -111px;
  }
  @media (max-width: 480px) {
    margin-top: -92px;
  }
}
body {
  margin: 0;
}

.main-lc .main.open {
  margin-left: 239px;
  width: calc(100% - 239px);
}

.main-lc .main {
  transition: all 0.3s ease;
  margin-left: 0;
  width: 100%;
}

.main_page footer.footer.open {
  width: calc(100% - 239px);
  margin-left: 239px;
  transition: all 0.3s ease;
}

.main_page footer.footer {
  width: 100%;
  margin-left: 0px;
}
</style>
