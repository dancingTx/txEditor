import { defineComponent, reactive, computed, type PropType } from "vue";
import {
  DefaultVars,
  screenSize,
  canvasCommands,
  type ScreenProps,
  type SpecialCanvasCommand,
} from "@/config/default";
import { useLayoutStore } from "@/store/layout";
import { useNodeStore } from "@/store/node";
import { screen2BodyRatio } from "@/shared/tool";
import { useI18nTitle } from "@/hook";
import CanvasCommand from "@/packages/core/canvas/command";
import styles from "@/style/module/components.module.scss";
export default defineComponent({
  setup() {
    const node = useNodeStore();
    const layout = useLayoutStore();
    const state = reactive({
      isActiveScreenSize: "",
      isManual: false,
      canvasWidth: layout.canvasWidth,
      canvasHeight: layout.canvasHeight,
    });
    const canvasCommand = computed(
      () => node.getNodeListNS().activate?.canvasCommand || new CanvasCommand()
    );
    const resizeScreen = (item: ScreenProps): void => {
      state.isManual = false;
      state.isActiveScreenSize = item.uid;
      if (item.gte) {
        state.canvasWidth = item.gte;
        state.canvasHeight = screen2BodyRatio(
          item.gte,
          DefaultVars.__CANVAS_RATIO__
        );
        layout.manualControlCanvasSize(state.canvasWidth, state.canvasHeight);
      }
      layout.storeCanvasSize(item.icon || "");
      if (item.icon === "manual") {
        state.isManual = true;
      }
    };
    return () => (
      <div class={styles.toolkit}>
        <div class={styles.toolkit_canvas_size}>
          {screenSize.map((item) => (
            <div
              class={[
                styles.canvas_size_wrapper,
                state.isActiveScreenSize === item.uid && styles.is_active,
              ]}
              onClick={() => resizeScreen(item)}
            >
              <svg-icon
                iconClass={item.icon}
                class={styles.item_icon}
                tip={useI18nTitle(item)}
              ></svg-icon>
            </div>
          ))}
          {state.isManual && (
            <div class={styles.is_manual}>
              <input
                v-model={[state.canvasWidth, "", ["number"]]}
                type="text"
                class={styles.manual_width}
                onBlur={() => {
                  layout.manualControlCanvasSize(state.canvasWidth);
                }}
              />
              <svg-icon iconClass="close"></svg-icon>
              <input
                v-model={[state.canvasHeight, "", ["number"]]}
                type="text"
                class={styles.manual_height}
                onBlur={() => {
                  layout.manualControlCanvasSize(undefined, state.canvasHeight);
                }}
              />
            </div>
          )}
        </div>
        <div class={styles.toolkit_command}>
          {canvasCommands.map((item) => (
            <div
              class={[
                styles.canvas_size_wrapper,
                canvasCommand.value?.canSelected.includes(
                  item.command as SpecialCanvasCommand
                ) && styles.is_active,
              ]}
              onClick={() => canvasCommand.value?.invoke(item.command)}
            >
              <svg-icon
                iconClass={item.icon}
                class={styles.item_icon}
                tip={useI18nTitle(item)}
              ></svg-icon>
            </div>
          ))}
        </div>
      </div>
    );
  },
});
