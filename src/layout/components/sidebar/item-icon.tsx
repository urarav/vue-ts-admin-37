// 插槽显示element-plus图标
// import { useSlots } from "vue";
// const renderDom = (props: Tprops) => {
//   const defaultSlot = useSlots().default;
//   return defaultSlot ? (
//     defaultSlot()
//   ) : (
//     <svg-icon name={props.name} color="#fff"></svg-icon>
//   );
// };
import SvgIconEp from "@/components/svg-icon-ep/index.vue";
import SvgIcon from "@/components/svg-icon/index.vue";
type Tprops = {
  meta: TrouteMeta;
};

const renderDom = (props: Tprops) => {
  if (props.meta.iconEp) {
    return <SvgIconEp name={props.meta.iconEp}></SvgIconEp>;
  } else if (props.meta.icon) {
    return <SvgIcon name={props.meta.icon} color="#fff"></SvgIcon>;
  }
};

export default renderDom;
