const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[6-9]\d{9}$/;

export const LoginSchema = (formData: Record<string, string>) => {
  const errors: Record<string, string> = {};
  const value = formData.value?.trim() ?? "";
  const password = formData.password ?? "";

  if (!value) {
    errors.value = "This field is required";
  } else if (value.includes("@")) {
    if (!emailRegex.test(value)) {
      errors.value = "Enter valid email or mobile number";
    }
  } else if (!mobileRegex.test(value)) {
    errors.value = "Enter valid email or mobile number";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Minimum 6 characters required";
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
};
