import { Directive, DirectiveBinding } from "vue";
import { useUserStoreHook } from "@/store/modules/user";

const permission: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<Array<string>>) {
    const currentRoles = useUserStoreHook().roles,
      { value: bindRoles } = binding;
    if (Array.isArray(bindRoles) && bindRoles.length) {
      const isDisPlay = currentRoles.some((role: string) =>
        bindRoles.includes(role)
      );
      !isDisPlay && (el.style.display = "none");
    } else {
      throw new Error("need roles! Like v-permission=\"['admin','editor']\"");
    }
  },
};

export default permission;
