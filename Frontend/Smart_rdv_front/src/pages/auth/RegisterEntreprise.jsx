import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Building2, MapPin, Eye, EyeOff, ArrowLeft, Briefcase, TrendingUp, Users } from 'lucide-react';
import './RegisterEntreprise.css';

const RegisterEntreprise = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    companyType: '',
    address: '',
    siret: '',
    managerFirstName: '',
    managerLastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('⚠️ Les mots de passe ne correspondent pas !');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/api/auth/register/professional', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          motDePasse: formData.password,
          nomEntreprise: formData.companyName,
          prenom: formData.managerFirstName,
          telephone: formData.phone,
          typeEntreprise: formData.companyType,
          siret: formData.siret,
          adresse: formData.address
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
      navigate('/login?type=entreprise');

    } catch (error) {
      console.error("Erreur d'inscription:", error);
      alert(`⚠️ ${error.message}`);
    }
  };

  return (
    <div className="register-entreprise-container">
      <div className="register-content">
        <div className="register-header">
          <button onClick={() => navigate('/home-second')} className="back-link">
            <ArrowLeft size={18} /> Retour
          </button>
          <div className="logo-text">SmartRDV</div>
        </div>

        <div className="register-form-wrapper">
          <div className="form-header">
            <h1 className="form-title">Espace Entreprise</h1>
            <p className="form-subtitle">Développez votre activité avec SmartRDV</p>
          </div>

          <form onSubmit={handleRegister} className="register-form">
            <div className="form-group">
              <label className="form-label">Nom de l'entreprise</label>
              <div className="input-group">
                <Building2 className="input-icon" size={18} />
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="form-input"

                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Prénom du responsable</label>
                <div className="input-group">
                  <Users className="input-icon" size={18} />
                  <input
                    type="text"
                    name="managerFirstName"
                    value={formData.managerFirstName}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Nom du responsable</label>
                <div className="input-group">
                  <Users className="input-icon" size={18} />
                  <input
                    type="text"
                    name="managerLastName"
                    value={formData.managerLastName}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Type d'entreprise</label>
                <div className="input-group">
                  <Briefcase className="input-icon" size={18} />
                  <select
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Choisir un type</option>
                    <option value="bank">Banque</option>
                    <option value="health">Santé</option>
                    <option value="training">Formation</option>
                    <option value="administration">Administration</option>
                    <option value="beauty">Beauté & Bien-être</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">SIRET</label>
                <div className="input-group">
                   <Building2 className="input-icon" size={18} />
                  <input
                    type="text"
                    name="siret"
                    value={formData.siret}
                    onChange={handleInputChange}
                    className="form-input"

                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Adresse</label>
              <div className="input-group">
                <MapPin className="input-icon" size={18} />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-input"

                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Téléphone</label>
              <div className="input-group">
                <Users className="input-icon" size={18} />
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
              <label className="form-label">Email professionnel</label>
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

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Mot de passe</label>
                <div className="input-group">
                  <Lock className="input-icon" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
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
                <label className="form-label">Confirmation</label>
                <div className="input-group">
                  <Lock className="input-icon" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="form-input"

                    required
                  />
                </div>
              </div>
            </div>

            <div className="terms-checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                J'accepte les <a href="#">CGU</a> et la <a href="#">politique de confidentialité</a>
              </label>
            </div>

            <button type="submit" className="submit-btn enterprise-btn">
              Inscrire mon entreprise
            </button>
          </form>

          <div className="register-footer">
            <p>Déjà un compte ? <button onClick={() => navigate('/login?type=entreprise')}>Se connecter</button></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterEntreprise;