export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('projectflow_user') || 'null');
  } catch {
    return null;
  }
};

export const isAdmin = () =>
  ['admin', 'administrator', 'system admin'].includes(
    String(getUser()?.role || '').trim().toLowerCase()
  );
