import { createI18n } from "vue-i18n";
const requireAll = import.meta.glob("./lang/*.ts", {
  eager: true,
});
const messages = Object.keys(requireAll).reduce(
  (total, curr): Record<string, any> => {
    const moduleName = curr.replace(/\.\/(\w+)\/(\w+_\w+)\.(ts|js)$/, "$2");
    const moduleValue = (requireAll[curr] as Record<string, string>).default;
    total[moduleName] = moduleValue;
    return total;
  },
  {} as Record<string, any>
);
const i18n = createI18n({
  legacy: false,
  locale: "zh_CN",
  messages,
});

export default i18n;
