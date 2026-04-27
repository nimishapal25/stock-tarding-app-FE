const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[6-9]\d{9}$/;

export const signupSchema = (formData: Record<string, string>) => {
  const errors: Record<string, string> = {};
  const name = formData.name?.trim() ?? "";
  const email = formData.email?.trim() ?? "";
  const mobile = formData.mobile?.trim() ?? "";
  const password = formData.password ?? "";
  const confirmPassword = formData.confirmPassword ?? "";

  if (!name) {
    errors.name = "Full name is required";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email";
  }

  if (!mobile) {
    errors.mobile = "Mobile number is required";
  } else if (!mobileRegex.test(mobile)) {
    errors.mobile = "Enter valid mobile number";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Minimum 6 characters required";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
};
