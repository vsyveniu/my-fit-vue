

export const mutateResConfig = async (config: any, router: any, axios: any) => {

  try {
    if (config.status === 401) {
      await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/auth/refresh`);
    }
  } catch (e) {
    throw new Error(e.message);
  }
};
