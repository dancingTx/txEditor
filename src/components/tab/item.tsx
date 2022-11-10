import {
  computed,
  defineComponent,
  getCurrentInstance,
  ref,
  withDirectives,
} from "vue";
import { useI18nTitle } from "@/hook";
import { dragDirective } from "@/directive/drag";
import { Vars } from "@/config/default";
import { definePropType, noop } from "@/shared";
import styles from "@/style/module/components.module.scss";
import type { ExtraProps } from "@/@types/core";

export default defineComponent({
  props: {
    item: {
      type: definePropType<ExtraProps>(Object),
      default: () => ({}),
    },
    total: {
      type: definePropType<number>(Number),
      default: 0,
    },
    hasTitle: {
      type: definePropType<boolean>(Boolean),
      default: false,
    },
    onHeaderClick: {
      type: definePropType<(item: ExtraProps, evt?: Event) => void>(Function),
      default: () => noop,
    },
    onHeaderContextMenu: {
      type: definePropType<(item: ExtraProps, evt?: Event) => void>(Function),
      default: () => noop,
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
