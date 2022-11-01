import { defineComponent, reactive, ref, h, resolveComponent } from "vue";
import ToolKit from "@/components/toolkit/canvasCommand";
import Canvas from "@/components/canvas";
import {
  Vars,
  componentList,
  type ComponentInfo,
  type SourceProps,
} from "@/config/default";
import { on, off, query } from "@/shared/domOp";
import { deepClone } from "@/shared/data";
import { compoundComponents } from "@/shared/component";
import styles from "@/style/module/components.module.scss";
const components = compoundComponents<ComponentInfo<SourceProps>>(
  componentList,
  "component"
);
export default defineComponent({
  components,
  setup() {
    const canvas = ref(null);
    const state = reactive({
      bucket: [] as ComponentInfo<SourceProps>[],
    });
    const handleDrop = (evt: DragEvent) => {
      const compIndex = Number(evt.dataTransfer?.getData("compIndex"));
      if (compIndex || compIndex === 0) {
        const posX = evt.offsetX;
        const posY = evt.offsetY;
        const compInfo = deepClone(componentList[compIndex]);
        if (!compInfo.props) {
          compInfo.props = {
            style: {},
          };
        }
        compInfo.props!.style!.left = posX + "px";
        compInfo.props!.style!.top = posY + "px";

        state.bucket.push(compInfo);
      }

      evt.preventDefault();
      evt.stopPropagation();
    };
    const handleDropOver = (evt: Event) => {
      evt.preventDefault();
    };
    const handleMouseDown = (
      item: ComponentInfo<SourceProps>,
      evt: MouseEvent
    ) => {
      const startX = evt.clientX;
      const startY = evt.clientY;

      const startLeft = parseInt(item.props?.style?.left + "");
      const startTop = parseInt(item.props?.style?.top + "");

      const handleMouseMove = (evt: Event) => {
        const upper = {
          x: 0,
          y: 0,
        };
        const lower = {
          x: 0,
          y: 0,
        };
        if (canvas.value) {
          const dom = query(
            `.${styles.canvas}`,
            (canvas.value as InstanceType<typeof Canvas>).$el
          );
          upper.x = (dom as HTMLElement).clientWidth - Vars.__ASIDE_WIDTH__;
          upper.y =
            (dom as HTMLElement).clientHeight - Vars.__ASIDE_WIDTH__ / 2;
        }
        const currX = (evt as MouseEvent).clientX;
        const currY = (evt as MouseEvent).clientY;
        const disX = Math.min(
          Math.max(currX - startX + startLeft, lower.x),
          upper.x
        );
        const disY = Math.min(
          Math.max(currY - startY + startTop, lower.y),
          upper.y
        );

        item.props!.style!.left = disX + "px";
        item.props!.style!.top = disY + "px";
      };
      const handleMouseUp = () => {
        off(document, "mousemove", handleMouseMove);
        off(document, "mouseup", handleMouseUp);
      };

      on(document, "mousemove", handleMouseMove);
      on(document, "mouseup", handleMouseUp);

      // evt.preventDefault();
      evt.stopPropagation();
    };
    const renderCustomComponent = (item: ComponentInfo<SourceProps>) => {
      return (
        <div
          style={{
            position: "absolute",
            ...item.props?.style,
          }}
          onMousedown={(evt: MouseEvent) => handleMouseDown(item, evt)}
        >
          {h(resolveComponent(item.uid), {
            value: item.value,
          })}
        </div>
      );
    };
    return () => (
      <div>
        <ToolKit></ToolKit>
        <div onDrop={handleDrop} onDragover={handleDropOver}>
          <Canvas ref={canvas}>
            {state.bucket.map((item) => renderCustomComponent(item))}
          </Canvas>
        </div>
      </div>
    );
  },
});
