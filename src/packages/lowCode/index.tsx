import {
  defineComponent,
  reactive,
  ref,
  h,
  resolveComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
} from "vue";
import ToolKit from "@/components/toolkit/canvasCommand";
import Canvas from "@/components/canvas";
import Shape from "@/components/shape";
import MarkLine from "@/components/markLine";
import CommandManager from "@/packages/core/canvas/manager";
import CanvasClass from "@/packages/core/canvas";
import bus, {
  deepClone,
  makeUUID,
  compoundComponents,
  on,
  off,
  query,
} from "@/shared";
import { useContextMenuStore } from "@/store/global";
import { componentList } from "@/config/default";
import styles from "@/style/module/components.module.scss";
import type {
  ExtraProps,
  CanvasItemProps,
  SpecialCanvasCommand,
  NormalCanvasCommand,
  ComponentInfo,
  Direction,
} from "@/@types";

const components = compoundComponents<ComponentInfo<ExtraProps>>(
  componentList,
  "component"
);
export default defineComponent({
  components,
  setup() {
    const app = getCurrentInstance();
    const manager = new CommandManager();
    const C = new CanvasClass();
    const canvas = ref(null);
    const state = reactive({
      bucket: [] as ComponentInfo<ExtraProps>[],
      currEl: {} as ComponentInfo<ExtraProps>,
      slot: () => {},
    });
    const contextMenu = useContextMenuStore();
    const handleDrop = (evt: DragEvent) => {
      const compIndex = evt.dataTransfer?.getData("compIndex");
      if (compIndex) {
        const posX = evt.offsetX;
        const posY = evt.offsetY;
        const compInfo = deepClone(componentList[Number(compIndex)]);
        // 拖拽到画布，需要生成唯一id
        compInfo.elId = makeUUID();
        if (!compInfo.props) {
          compInfo.props = {
            style: {},
          };
        }
        compInfo.props!.style!.left = posX + "px";
        compInfo.props!.style!.top = posY + "px";

        state.bucket.push(compInfo);
        state.currEl = compInfo;
        manager.setRecord(state.bucket);
      }

      evt.preventDefault();
      evt.stopPropagation();
    };
    const handleDropOver = (evt: Event) => {
      evt.preventDefault();
    };
    const handleMouseDown = (
      item: ComponentInfo<ExtraProps>,
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
          upper.x =
            (dom as HTMLElement).clientWidth -
            parseInt(item.props?.style?.width + "");
          upper.y =
            (dom as HTMLElement).clientHeight -
            parseInt(item.props?.style?.height + "");
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
        bus.emit("component:startMove", {
          isDownward: currY - startY > 0,
          isRightward: currX - startX > 0,
        } as Direction);
      };
      const handleMouseUp = () => {
        off(document, "mousemove", handleMouseMove);
        off(document, "mouseup", handleMouseUp);
        manager.setRecord(state.bucket);
        bus.emit("component:endMove");
      };

      on(document, "mousemove", handleMouseMove);
      on(document, "mouseup", handleMouseUp);

      if (item.tag !== "Text") {
        evt.preventDefault();
        evt.stopPropagation();
      }
    };
    const showShortCutMenu = (item: ComponentInfo<ExtraProps>) => {
      state.currEl = item;
      contextMenu.setPanelOrientation("left top");
      contextMenu.setPanelType("canvas:item");
      if (app?.uid) {
        contextMenu.setUniqueId(app?.uid);
      }
      contextMenu.show();
    };

    const removeItem = (item: ComponentInfo<ExtraProps> | null) => {
      if (item) {
        manager.setRecord(state.bucket);
        for (let i = state.bucket.length; i--; ) {
          if (state.bucket[i].elId === item.elId) {
            state.bucket.splice(i, 1);
            break;
          }
        }
      }
    };
    const swapItem = (item: ComponentInfo<ExtraProps> | null, flag: number) => {
      if (!item) return;
      const index = state.bucket.findIndex((i) => i.elId === item.elId);
      if (index !== -1) {
        manager.setRecord(state.bucket);
        if (flag === Infinity || flag === -Infinity) {
          state.bucket[flag === Infinity ? "push" : "unshift"](
            state.bucket.splice(index, 1)[0]
          );
          return;
        }

        let targetIndex = 0;
        if (flag > 0) {
          targetIndex = Math.min(index + flag, state.bucket.length - 1);
        } else if (flag < 0) {
          targetIndex = Math.max(0, index - flag);
        }
        const temp = state.bucket[targetIndex];
        state.bucket[targetIndex] = item;
        state.bucket[index] = temp;
      }
    };

    const processCommand = (info: CanvasItemProps) => {
      if (info.command === "ShiftUp") {
        swapItem(state.currEl, 1);
      }

      if (info.command === "Topic") {
        swapItem(state.currEl, Infinity);
      }

      if (info.command === "ShiftDown") {
        swapItem(state.currEl, -1);
      }

      if (info.command === "Bottom") {
        swapItem(state.currEl, -Infinity);
      }

      if (info.command === "Delete") {
        removeItem(state.currEl);
      }
    };
    const redoCanvas = () => {
      manager.redo();
      state.bucket = manager.getCurrRecord();
      if (state.bucket.length) {
        state.currEl = state.bucket[state.bucket.length - 1];
      }
    };
    const undoCanvas = () => {
      manager.undo();
      state.bucket = manager.getCurrRecord();
      if (state.bucket.length) {
        state.currEl = state.bucket[state.bucket.length - 1];
      }
    };
    const clearCanvas = () => {
      state.bucket.length = 0;
    };
    const processCanvasCommand = (command?: NormalCanvasCommand) => {
      if (command === "Redo") {
        redoCanvas();
      }
      if (command === "Undo") {
        undoCanvas();
      }
      if (command === "Clear") {
        clearCanvas();
      }
    };

    const renderCustomComponent = (
      command?: NormalCanvasCommand,
      canSelected?: SpecialCanvasCommand[]
    ) => {
      return C.render(
        command,
        canSelected,
        <div>
          <button onClick={() => {}}>test</button>
          {state.bucket.map((item, index) => (
            <div
              onMousedown={(evt: MouseEvent) => handleMouseDown(item, evt)}
              onContextmenu={() => showShortCutMenu(item)}
              onClick={() => (state.currEl = item)}
            >
              <Shape
                defaultStyle={item.props?.style}
                active={state.currEl?.elId === item.elId}
                style={{
                  position: "absolute",
                  zIndex: index,
                  ...item.props?.style,
                }}
                onPointMouseMove={(info) => {
                  Object.assign(item.props?.style || {}, info);
                }}
                onPointMouseUp={() => {
                  manager.setRecord(state.bucket);
                }}
              >
                {h(resolveComponent(item.uid), {
                  value: item.value,
                  style: item.props?.style,
                })}
              </Shape>
            </div>
          ))}
          <MarkLine bucket={state.bucket} activeEl={state.currEl}></MarkLine>
        </div>
      );
    };
    onMounted(() => {
      state.slot = renderCustomComponent;

      bus.on("contextMenu:clickItem", (info) => {
        if (contextMenu.uid === app?.uid) {
          processCommand(info as CanvasItemProps);
          contextMenu.hide();
        }
      });
      bus.on("canvasCommand:command", (command) => {
        processCanvasCommand(command as NormalCanvasCommand);
      });
      bus.on("canvasCommand:canSelected", (canSelected) => {
        state.slot = renderCustomComponent.bind(
          null,
          undefined,
          canSelected as SpecialCanvasCommand[]
        );
      });
    });
    onUnmounted(() => {
      bus.off("contextMenu:clickItem");
      bus.off("canvasCommand:command");
      bus.off("canvasCommand:canSelected");
    });
    return () => (
      <div>
        <ToolKit></ToolKit>
        <div onDrop={handleDrop} onDragover={handleDropOver}>
          <Canvas ref={canvas}>{state.slot()}</Canvas>
        </div>
      </div>
    );
  },
});
