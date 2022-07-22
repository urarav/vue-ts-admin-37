import permission from "./perrmission";
import { App } from "vue";

const directiveCollection = {
  permission,
};

const directives = {
  install(app: App) {
    Object.keys(directiveCollection).forEach((name) =>
      app.directive(
        name,
        directiveCollection[name as keyof typeof directiveCollection]
      )
    );
  },
};

export default directives;
