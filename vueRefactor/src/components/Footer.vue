<script setup>

</script>

<template>
  <footer class="site-footer flex-box justify-content-center">
    <a href="https://discord.gg/vYmvFBZQsM" class="social-icon">discord</a>
    <a href="https://www.linkedin.com/in/scott-casey-20210398/" class="social-icon">linkedin</a>
    <div class="flex-box flex-column">
      <span>Scott Casey | Kurohyou Studios</span>
    </div>
    <a href="https://www.patreon.com/kurohyoustudios?fan_landing=true" class="social-icon">patreon</a>
    <a href="https://github.com/Kurohyou" class="social-icon">github</a>
    <a href="https://twitter.com/Kurohyoustudios" class="social-icon">twitter</a>
  </footer>
</template>

<style lang="scss">
.site-footer{
  background-color:var(--back-color-1);
  position:sticky;
  bottom:-1px;
  min-height:30px;
  box-shadow:var(--box-shadow-1);
  flex-wrap:wrap;
  gap:var(--tiny-gap) var(--big-gap);
  padding:var(--half-gap);
  background-color:var(--back-color-2);
  > div{
    order:-1;
    width:100%;
    text-align:center;
  }
}
</style>