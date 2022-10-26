import {
  computed,
  defineComponent,
  getCurrentInstance,
  ref,
  withDirectives,
  type PropType,
} from "vue";
import { useI18nTitle } from "@/hook";
import { dragDirective } from "@/directive/drag";
import { Vars, type SourceProps } from "@/config/default";
import styles from "@/style/module/components.module.scss";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<SourceProps>,
      default: () => ({}),
    },
    total: {
      type: Number as PropType<number>,
      default: 0,
    },
    hasTitle: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    onHeaderClick: {
      type: Function as PropType<(item: SourceProps, evt?: Event) => void>,
      default: () => () => {},
    },
    onHeaderContextMenu: {
      type: Function as PropType<(item: SourceProps, evt?: Event) => void>,
      default: () => () => {},
    },
  },
  setup(props, { slots }) {
    const app = getCurrentInstance();
    const tabHeader = ref(null);
    const isActive = computed(() => app?.parent?.props.modelValue as string);

    const calcContentHeight = () => {
      if (tabHeader.value && isActive.value === props.item.uid) {
        const headerDom = tabHeader.value as HTMLDivElement;
        const restHeight =
          headerDom.offsetHeight * props.total +
          (props.hasTitle ? Vars.__MENU_TITLE_HEIGHT__ : 0) +
          Vars.__STATUS_BAR_HEIGHT__;
        return {
          height: `calc(100vh - ${restHeight}px)`,
        };
      }

      return {};
    };
    return () => (
      <div class={styles.tab_item}>
        <div
          ref={tabHeader}
          class={[
            styles.tab_item__header,
            isActive.value !== props.item.uid && styles.is_collapse,
          ]}
          onClick={(evt: Event) => props.onHeaderClick(props.item, evt)}
          onContextmenu={(evt: Event) =>
            props.onHeaderContextMenu(props.item, evt)
          }
        >
          {props.item?.icon && (
            <svg-icon
              iconClass={props.item?.icon}
              class={styles.tab_icon}
            ></svg-icon>
          )}
          <span>{useI18nTitle(props.item)}</span>
        </div>
        {withDirectives(
          <div
            class={[
              styles.tab_item__content,
              isActive.value !== props.item.uid && styles.is_collapse,
            ]}
            style={calcContentHeight()}
          >
            {slots.default && slots.default()}
          </div>,
          [[dragDirective, "", "", { vertical: true }]]
        )}
      </div>
    );
  },
});
