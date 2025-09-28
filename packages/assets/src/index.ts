import { AssetModule } from "@forge/core"
import { AssetList } from "./components/AssetList"
import { AssetForm } from "./components/AssetForm"
import { AssetDetail } from "./components/AssetDetail"

// Export the module with UI components
export const assetsModule = {
  ...AssetModule,
  components: {
    AssetList,
    AssetForm,
    AssetDetail,
  },
  routes: [
    {
      path: "/assets",
      component: AssetList,
      permissions: ["asset:read"],
    },
    {
      path: "/assets/new",
      component: AssetForm,
      permissions: ["asset:create"],
    },
    {
      path: "/assets/:id",
      component: AssetDetail,
      permissions: ["asset:read"],
    },
    {
      path: "/assets/:id/edit",
      component: AssetForm,
      permissions: ["asset:update"],
    },
  ],
}

export * from "./components/AssetList"
export * from "./components/AssetForm"
export * from "./components/AssetDetail"