import { defineStore } from "pinia";
import type { NotificationItem, NotifyState } from "@/@types";
export const useNotifyStore = defineStore("notify", {
  state: (): NotifyState => {
    return {
      bucket: {},
    };
  },
  actions: {
    setNotifyInBucket(info: NotificationItem) {
      if (!this.bucket[info.id]) {
        this.bucket[info.id] = [];
      }
      this.bucket[info.id].push(info);
    },
    removeNotify(id?: string) {
      if (id) {
        if (this.bucket[id]) {
          this.bucket[id] = [];
        }
      } else {
        this.bucket = {};
      }
    },
  },
});
