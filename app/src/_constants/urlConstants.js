export const urlConstants = {
    api_base_url: import.meta.env.VITE_API_URL || "http://localhost:8000/api/",
    app_url: import.meta.env.VITE_APP_URL || "http://localhost:3000/",
};

urlConstants['user_details'] = urlConstants['api_base_url'] + 'user/details/';