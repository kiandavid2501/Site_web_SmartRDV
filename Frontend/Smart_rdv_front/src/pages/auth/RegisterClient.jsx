import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowLeft,
  Check,
} from "lucide-react";
import "./RegisterClient.css";

const RegisterClient = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("⚠️ Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: formData.lastName,
          prenom: formData.firstName,
          email: formData.email,
          telephone: formData.phone,
          motDePasse: formData.password,
          role: "CLIENT",
        }),
      });

      const responseText = await response.text();
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.error("Erreur parsing JSON:", parseError);
        throw new Error("Le serveur a renvoyé une réponse invalide");
      }

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Erreur lors de l'inscription"
        );
      }

      alert("✅ Inscription réussie ! Vous pouvez maintenant vous connecter.");
      navigate("/login?type=client");
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      alert(`⚠️ ${error.message}`);
    }
  };

  return (
    <div className="register-client-container">
      <div className="register-content">
        <div className="register-header">
          <button
            onClick={() => navigate("/home-second")}
            className="back-link"
          >
            <ArrowLeft size={18} /> Retour
          </button>
          <div className="logo-text">SmartRDV</div>
        </div>

        <div className="register-form-wrapper">
          <div className="form-header">
            <h1 className="form-title">Créer un compte Client</h1>
            <p className="form-subtitle">
              Commencez à gérer vos rendez-vous simplement
            </p>
          </div>

          <form onSubmit={handleRegister} className="register-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Prénom</label>
                <div className="input-group">
                  <User className="input-icon" size={18} />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Nom</label>
                <div className="input-group">
                  <User className="input-icon" size={18} />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Téléphone</label>
              <div className="input-group">
                <Phone className="input-icon" size={18} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-group">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <div className="input-group">
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirmer le mot de passe</label>
              <div className="input-group">
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="terms-checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                J'accepte les <a href="#">conditions générales</a> et la{" "}
                <a href="#">politique de confidentialité</a>
              </label>
            </div>

            <button type="submit" className="submit-btn">
              Créer mon compte
            </button>
          </form>

          <div className="register-footer">
            <p>
              Déjà un compte ?{" "}
              <button onClick={() => navigate("/login?type=client")}>
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterClient;
