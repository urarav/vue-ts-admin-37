<script setup lang="ts">
const cvs = ref<HTMLCanvasElement>();
let ctx = reactive<any>({})
onMounted(() => {
  const { value: cvsEle } = cvs;
  if (cvsEle) {
    ctx = cvsEle.getContext("2d") as CanvasRenderingContext2D;
    drawModal(ctx);

    cvsEle.addEventListener("mousedown", function () {
      this.addEventListener("mousemove", move);
    });

    cvsEle.addEventListener("mouseup", function () {
      this.removeEventListener("mousemove", move);
    });
  }
});

function move(e: MouseEvent) {
    const { offsetX, offsetY } = e;
    clearRect(offsetX, offsetY, 10, 10);
}
function drawModal(ctx: CanvasRenderingContext2D): void {
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(0, 0, 500, 500);
  ctx.restore();
}
function clearRect(
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  ctx.clearRect(x, y, w, h);
  ctx.restore();
}
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

  #canvas {
    background: url("@/assets/dog.webp") no-repeat;
    background-size: contain;
    background-position: center center;
  }
}
</style>
