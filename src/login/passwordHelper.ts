export const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*_).{8,}$/;
    return regex.test(password);
  }