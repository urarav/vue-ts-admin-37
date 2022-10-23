<script setup lang="ts">
import { Ref } from "vue";

type TConfig = {
  color: string;
  width: number;
  cap: CanvasLineCap;
  type: string;
  clear: boolean;
};

const cvs = ref<HTMLCanvasElement>();
const clip = ref<HTMLElement>();
const ctxRef = ref<CanvasRenderingContext2D>();
const isDraw = ref<boolean>(false);
const config = reactive<TConfig>({
  color: "#424242",
  width: 5,
  cap: "round",
  type: "line",
  clear: false,
});
const historyArr = reactive<string[]>([]);

const initOffset = markRaw({
  x: 0,
  y: 0,
});

function setRect(
  left: number | null = 1,
  top: number | null = 1,
  width: number | null = 1,
  height: number | null = 1
): void {
  const { value: clipEle } = clip as Ref<HTMLElement>;
  left && (clipEle.style.left = `${left}px`);
  top && (clipEle.style.top = `${top}px`);
  width && (clipEle.style.width = `${width}px`);
  height && (clipEle.style.height = `${height}px`);
}
function setCircie(
  left: number | null = 1,
  top: number | null = 1,
  diam: number | null = 1
): void {
  const { value: clipEle } = clip as Ref<HTMLElement>;
  left && (clipEle.style.left = `${left}px`);
  top && (clipEle.style.top = `${top}px`);
  diam &&
    (clipEle.style.width = `${diam}px`) &&
    (clipEle.style.height = `${diam}px`);
}

watch(
  () => config.clear,
  (val) => val && (config.type = "rect")
);
onMounted(() => {
  const { value: ele } = cvs;
  if (ele && ele.getContext("2d")) {
    const { width, height } = ele.getBoundingClientRect();
    ele.width = width;
    ele.height = height;

    ctxRef.value = ele.getContext("2d") as CanvasRenderingContext2D;
    const { value: ctx } = ctxRef;
    ele.addEventListener("mousedown", (e) => {
      historyArr.push(ele.toDataURL());
      isDraw.value = true;
      const { offsetX, offsetY } = e;
      const { type } = config;
      if (!/line/i.test(type)) {
        initOffset.x = offsetX;
        initOffset.y = offsetY;
        setRect(offsetX, offsetY);
        setCircie(offsetX, offsetY);
        ctx.beginPath();
      } else {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      }
    });
    ele.addEventListener("mousemove", (e) => {
      if (isDraw.value) {
        ctx.lineCap = config.cap;
        ctx.lineWidth = config.width;
        const { offsetX, offsetY } = e;
        const { type } = config;
        if (/rect/i.test(type)) {
          const { x, y } = initOffset;
          if (offsetX - x < 0) {
            setRect(offsetX, null, Math.abs(offsetX - x), null);
          }
          if (offsetY - y < 0) {
            setRect(null, offsetY, null, Math.abs(offsetY - y));
          }
          if (offsetX - x > 0 && offsetY - y > 0) {
            setRect(null, null, offsetX - x, offsetY - y);
          }
        } else if (type === "line") {
          ctx.lineTo(offsetX, offsetY);
          ctx.strokeStyle = config.color;
          ctx.stroke();
        } else if (/circle/i.test(type)) {
          const { x, y } = initOffset;
          const base = Math.max(offsetX - x, offsetY - y);
          if (offsetX - x < 0) {
            setCircie(offsetX, null, Math.abs(base));
          }
          if (offsetY - y < 0) {
            setCircie(null, offsetY, Math.abs(base));
          }
          if (offsetX - x > 0 && offsetY - y > 0) {
            setCircie(null, null, base);
          }
        }
      }
    });
    ele.addEventListener("mouseup", (e) => {
      const { type, clear } = config;
      const { offsetX, offsetY } = e;
      const { x, y } = initOffset;
      isDraw.value = false;
      if (clear) {
        ctx.clearRect(x, y, offsetX - x, offsetY - y);
        return;
      }
      if (/rect/i.test(type)) {
        if (type.includes("fill")) {
          ctx.fillStyle = config.color;
          ctx.fillRect(x, y, offsetX - x, offsetY - y);
        } else {
          ctx.strokeStyle = config.color;
          ctx.strokeRect(x, y, offsetX - x, offsetY - y);
        }
        setRect();
      } else if (/circle/i.test(type)) {
        const _ox = (offsetX - x) / 2,
          _oy = (offsetY - y) / 2;
        const radius = Math.abs(Math.max(offsetX - x, offsetY - y) / 2);
        ctx.arc(x + _ox, y + _oy, radius, 0, 2 * Math.PI);
        if (type.includes("fill")) {
          ctx.fillStyle = config.color;
          ctx.fill();
        } else {
          ctx.strokeStyle = config.color;
          ctx.stroke();
        }
        setCircie();
      }
    });
  }
});

const onReset = () => {
  const { value: ctx } = ctxRef;
  const { value: ele } = cvs;
  if (ele && ctx) {
    ctx.clearRect(0, 0, ele.width, ele.height);
    historyArr.length = 0;
    config.color = "#424242";
    config.width = 5;
    config.type = "line";
    config.clear = false;
  }
};

const onWithdraw = async () => {
  const lastRecord = historyArr.pop();
  if (lastRecord) {
    const img = new Image();
    img.src = lastRecord;
    await img.onload;
    const { value: ele } = cvs;
    const { value: ctx } = ctxRef;
    if (ele && ctx) {
      ctx.clearRect(0, 0, ele.width, ele.height);
      ctx.drawImage(img, 0, 0, img.width, img.height);
    }
  }
};
</script>

<template>
  <div class="wrapper">
    <section class="wrapper-paint">
      <canvas class="wrapper-paint__canvas" ref="cvs"></canvas>
      <div
        v-show="isDraw"
        :style="{ 'border-radius': /circle/i.test(config.type) ? '50%' : '0' }"
        class="wrapper-paint__clip"
        ref="clip"
      ></div>
    </section>
    <section class="wrapper-board">
      <div class="wrapper-board__config">
        <h3>Color:</h3>
        <input type="text" v-model="config.color" />
        <input type="color" v-model="config.color" />
      </div>
      <div class="wrapper-board__config">
        <h3>Width:</h3>
        <input type="number" v-model="config.width" />
      </div>
      <div class="wrapper-board__config">
        <h3>Type:</h3>
        <select name="type" v-model="config.type">
          <option value="line">line</option>
          <option value="rect">rect</option>
          <option value="fillRect">fillRect</option>
          <option value="circle">circle</option>
          <option value="fillCircle">fillCircle</option>
        </select>
      </div>
      <div class="wrapper-board__config is-inline">
        <h3>Clear:</h3>
        <input type="checkbox" v-model="config.clear" />
      </div>
      <div class="wrapper-board__btn">
        <button class="reset" @click="onReset">Reset</button>
        <button class="withdraw" @click="onWithdraw">Withdraw</button>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  &-paint {
    position: relative;
    width: 0;
    flex: 1;
    &__canvas {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
    &__clip {
      position: absolute;
      border: 1px dashed #2f7575;
      pointer-events: none;
      top: 0;
      left: 0;
    }
  }

  &-board {
    width: 20%;
    padding: 20px;
    background-color: whitesmoke;
    &__config {
      display: grid;
      grid-template-columns: 3fr 1fr;
      gap: 5px;
      align-items: center;
      h3 {
        grid-column: span 2;
      }
      select {
        border: 1px solid #2f7575;
        outline: none;
        padding: 5px;
        border-radius: 3px;
        grid-column: span 2;
      }
      input {
        border: 1px solid #2f7575;
        outline: none;
        padding: 5px;
        border-radius: 3px;
        width: 100%;
        &:not([type="text"]) {
          grid-column: span 2;
        }
        &[type="color"] {
          flex: 1;
          padding: 0;
          grid-column: span 1;
          border: none;
          cursor: pointer;
          &::-webkit-color-swatch-wrapper {
            padding: 0;
          }
          &::-webkit-color-swatch {
            border: 0;
            border-radius: 3px;
          }
        }
      }
      & + & {
        margin-top: 5px;
      }

      &.is-inline {
        display: flex;
        align-items: center;
        input {
          width: auto;
          margin: 0;
        }
      }
    }
    &__btn {
      margin-top: 5px;
      display: flex;
      gap: 5px;
      > button {
        flex: 1;
        border: none;
        border-radius: 4px;
        padding: 8px;
        color: #fff;
        cursor: pointer;

        &.reset {
          background-color: #f56c6c;
        }
        &.withdraw {
          background-color: #e6a23c;
        }
      }
    }
  }
}
</style>
