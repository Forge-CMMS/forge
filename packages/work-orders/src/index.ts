import { WorkOrderModule } from "@forge/core"
import { WorkOrderList } from "./components/WorkOrderList"

export const workOrdersModule = {
  ...WorkOrderModule,
  components: {
    WorkOrderList,
  },
  routes: [
    {
      path: "/work-orders",
      component: WorkOrderList,
      permissions: ["workorder:read"],
    },
  ],
}

export * from "./components/WorkOrderList"