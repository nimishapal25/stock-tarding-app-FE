import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "../validation/LoginSchema";
import { AuthLayout } from "../component/AuthLayout";
import { ButtonComponent } from "../../../components/UI/ButtonComponent";
import { authApi } from "../api/authApi";
import Cookies from "js-cookie";

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>();
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const login = async () => {
    try {
      setLoading(true);
      const res = await authApi.login({
        value: formData.value ?? "",
        password: formData.password ?? "",
      });

      const token = res.data?.token as string | undefined;
      if (token) {
        Cookies.set("token", token, { expires: 7 });
      }
      window.open(
        `${import.meta.env.VITE_API_ENDPOINT}/users/zerodha-login`,
        "_blank",
      );
    } catch {
      setApiError("Unable to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
    console.log(formData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { errors, isValid } = LoginSchema(formData);
    if (!isValid) {
      setErrors(errors);
    } else {
      setErrors({});
      setApiError("");
      login();
    }
  };

  return (
    <AuthLayout
      badgeText="Live Markets"
      titlePrefix="Invest in everything,"
      titleHighlight="all in one place."
      description="Zero brokerage on equity delivery. Access stocks, mutual funds, and F&O with advanced charting tools."
      marketName="NIFTY 50"
      marketExchange="National Stock Exchange"
      marketValue="22,419.95"
      marketChange="+120.50 (0.54%)"
      trendDirection="up"
      chartTone="emerald"
      trustedText="Trusted by over 10 million investors"
      rightTitle="Welcome Back"
      rightSubtitle="Enter your details to access your portfolio."
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Mobile number */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 text-sm">
            Mobile Number or Email
          </label>
          <input
            name="value"
            value={formData.value}
            onChange={handleChange}
            id="mobile"
            type="text"
            className="block bg-emerald-400/5 p-4 border border-slate-100 focus:border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-200/20 w-full text-gray-900 transition-all duration-200 placeholder-gray-400"
          />
          {errors?.value && (
            <p className="mt-1 text-red-500 text-sm">{errors.value}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 text-sm">
            Password
          </label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            className="block bg-emerald-400/5 p-4 border border-slate-100 focus:border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-200/20 w-full text-gray-900 transition-all duration-200 placeholder-gray-400"
          />
          {errors?.password && (
            <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <div className="flex justify-end mt-2">
          <ButtonComponent variant="text">Forgot Password?</ButtonComponent>
        </div>

        {/* Action buttons */}
        <div className="space-y-4 pt-4">
          {apiError ? <p className="text-red-500 text-sm">{apiError}</p> : null}

          <ButtonComponent type="submit" variant="primary" loading={loading}>
            Sign In to Dashboard
          </ButtonComponent>

          <div className="relative flex items-center py-2">
            <div className="border-surface-border border-t grow"></div>
            <div className="mx-4 font-medium text-gray-400 text-sm shrink-0">
              New to TradePro?
            </div>
            <div className="border-surface-border border-t grow"></div>
          </div>

          <ButtonComponent
            variant="secondary"
            onButtonHandle={() => navigate("/register")}
          >
            Create Account
          </ButtonComponent>
        </div>
      </form>
    </AuthLayout>
  );
};
