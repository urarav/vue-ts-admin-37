<script setup lang="ts">
const cvs = ref<HTMLCanvasElement>();
const isDraw = ref<boolean>(false);
onMounted(() => {
  const { value: ele } = cvs;
  if (ele && ele.getContext("2d")) {
    const ctx = ele.getContext("2d") as CanvasRenderingContext2D;
    ele.addEventListener("mousedown", (e) => {
      isDraw.value = true;
      // ctx.beginPath();
      const { offsetX, offsetY } = e;
      // ctx.moveTo(offsetX, offsetY);
    });
    ele.addEventListener("mousemove", (e) => {
      if (isDraw.value) {
        ctx.fillStyle = "#000";
        ctx.lineCap = "round";
        ctx.lineWidth = 5;
        const { offsetX, offsetY } = e;
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    });
    ele.addEventListener("mouseup", () => (isDraw.value = false));
  }
});
</script>

<template>
  <div class="wrapper">
    <canvas ref="cvs" width="500" height="500" id="canvas"></canvas>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  display: grid;
  place-content: center;

  .canvas {
    background-size: contain, 32px 32px, 32px 32px;
    background: url("@/assets/dog.webp"),
      linear-gradient(
        45deg,
        #ccc 25%,
        transparent 25%,
        transparent 75%,
        #ccc 25%
      ),
      linear-gradient(
          45deg,
          #ccc 25%,
          transparent 25%,
          transparent 75%,
          #ccc 25%
        )
        no-repeat center center,
      0 0, 16px 16px;
  }
}
</style>
