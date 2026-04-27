import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupSchema } from "../validation/SignUpSchema";
import { AuthLayout } from "../component/AuthLayout";
import { ButtonComponent } from "../../../components/UI/ButtonComponent";
import { authApi } from "../api/authApi";

export const CreateAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>();
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const signUp = async () => {
    try {
      setLoading(true);
      await authApi.signup({
        name: formData.name ?? "",
        email: formData.email ?? "",
        mobile: formData.mobile ?? "",
        password: formData.password ?? "",
        confirmPassword: formData.confirmPassword ?? "",
      });
      navigate("/");
    } catch {
      setApiError("Unable to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { errors, isValid } = signupSchema(formData);
    if (!isValid) {
      setErrors(errors);
    } else {
      setErrors({});
      setApiError("");
      signUp();
    }
  };

  return (
    <AuthLayout
      badgeText="Join 10M+ users"
      titlePrefix="Start your wealth,"
      titleHighlight="creation journey."
      description="Create your account in minutes. Zero paperwork, 100% digital onboarding process."
      marketName="SENSEX"
      marketExchange="Bombay Stock Exchange"
      marketValue="73,819.15"
      marketChange="+120.50 (0.54%)"
      trendDirection="down"
      chartTone="orange"
      rightTitle="Create your account"
      rightSubtitle="Join millions of investors on TradePro."
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 text-sm">
            Full Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Enter your full name"
            className="block bg-emerald-400/5 p-4 border border-slate-100 focus:border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-200/20 w-full text-gray-900"
          />
          {errors?.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 text-sm">
            Email Address
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="text"
            placeholder="Enter your email"
            className="block bg-emerald-400/5 p-4 border border-slate-100 focus:border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-200/20 w-full text-gray-900"
          />
          {errors?.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 text-sm">
            Mobile Number
          </label>
          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            type="tel"
            placeholder="Enter your mobile number"
            className="block bg-emerald-400/5 p-4 border border-slate-100 focus:border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-200/20 w-full text-gray-900"
          />
          {errors?.mobile && (
            <p className="text-red-500 text-sm">{errors.mobile}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 text-sm">
            Create Password
          </label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Enter password"
            className="block bg-emerald-400/5 p-4 border border-slate-100 focus:border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-200/20 w-full text-gray-900"
          />
          {errors?.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 text-sm">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="Confirm your password"
            className="block bg-emerald-400/5 p-4 border border-slate-100 focus:border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-200/20 w-full text-gray-900"
          />
          {errors?.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit */}
        <div className="space-y-4 pt-4">
          {apiError ? <p className="text-red-500 text-sm">{apiError}</p> : null}
          <ButtonComponent type="submit" variant="secondary" loading={loading}>
            Create Account
          </ButtonComponent>
        </div>
      </form>
      <p className="mt-8 text-gray-500 text-sm text-center">
        <span className="mr-1">Already have an account?</span>
        <ButtonComponent variant="text" onButtonHandle={() => navigate("/")}>
          Log In
        </ButtonComponent>
      </p>
    </AuthLayout>
  );
};
