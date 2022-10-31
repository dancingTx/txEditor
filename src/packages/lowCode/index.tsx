import {
  defineComponent,
  reactive,
  h,
  resolveComponent,
  type CSSProperties,
} from "vue";
import ToolKit from "@/components/toolkit/canvasCommand";
import Canvas from "@/components/canvas";
import {
  componentList,
  type ComponentInfo,
  type SourceProps,
} from "@/config/default";
import { deepClone } from "@/shared/data";
import { compoundComponents } from "@/shared/component";
const components = compoundComponents<ComponentInfo<SourceProps>>(
  componentList,
  "component"
);
export default defineComponent({
  components,
  setup() {
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
    const handleMouseDown = (evt: MouseEvent) => {
      console.log(evt, "evt");

      const handleMouseMove = (evt: MouseEvent) => {};
      const handleMouseUp = (evt: MouseEvent) => {};
    };
    const renderCustomComponent = (item: ComponentInfo<SourceProps>) => {
      return (
        <div
          style={{
            position: "absolute",
            ...item.props?.style,
          }}
          onMousedown={handleMouseDown}
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
          <Canvas>
            {state.bucket.map((item) => renderCustomComponent(item))}
          </Canvas>
        </div>
      </div>
    );
  },
});
