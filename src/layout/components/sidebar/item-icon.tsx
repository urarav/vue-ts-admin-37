type Tprops = {
  name: string;
};

const renderDom = (props: Tprops) => {
  return <svg-icon name={props.name} color='#fff'></svg-icon>;
};

export default renderDom;
