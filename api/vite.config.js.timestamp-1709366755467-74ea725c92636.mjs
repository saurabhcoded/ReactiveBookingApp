// vite.config.js
import { defineConfig } from "file:///opt/lampp/htdocs/bookingapp/node_modules/vite/dist/node/index.js";
import laravel from "file:///opt/lampp/htdocs/bookingapp/node_modules/laravel-vite-plugin/dist/index.js";
import react from "file:///opt/lampp/htdocs/bookingapp/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "/opt/lampp/htdocs/bookingapp";
var vite_config_default = defineConfig({
  plugins: [
    laravel({
      input: [
        "resources/sass/app.scss",
        "resources/js/app.js"
      ],
      refresh: true
    }),
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "/src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvb3B0L2xhbXBwL2h0ZG9jcy9ib29raW5nYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvb3B0L2xhbXBwL2h0ZG9jcy9ib29raW5nYXBwL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9vcHQvbGFtcHAvaHRkb2NzL2Jvb2tpbmdhcHAvdml0ZS5jb25maWcuanNcIjtpbXBvcnQge2RlZmluZUNvbmZpZ30gZnJvbSAndml0ZSc7XG5pbXBvcnQgbGFyYXZlbCBmcm9tICdsYXJhdmVsLXZpdGUtcGx1Z2luJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIGxhcmF2ZWwoe1xuICAgICAgICAgICAgaW5wdXQ6IFtcbiAgICAgICAgICAgICAgICAncmVzb3VyY2VzL3Nhc3MvYXBwLnNjc3MnLFxuICAgICAgICAgICAgICAgICdyZXNvdXJjZXMvanMvYXBwLmpzJyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWZyZXNoOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgICAgcmVhY3QoKSxcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy9zcmMnKSxcbiAgICAgICAgfSxcbiAgICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1EsU0FBUSxvQkFBbUI7QUFDalMsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFIakIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsUUFBUTtBQUFBLE1BQ0osT0FBTztBQUFBLFFBQ0g7QUFBQSxRQUNBO0FBQUEsTUFDSjtBQUFBLE1BQ0EsU0FBUztBQUFBLElBQ2IsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILEtBQUssS0FBSyxRQUFRLGtDQUFXLE1BQU07QUFBQSxJQUN2QztBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
