import FeatureDates from "../components/FeatureDates";
import "../styles/LandingPage.scss";
import CreateAccountButton from "../components/auth/buttons/create-account-button";
import TryWithoutAccountButton from "../components/auth/buttons/try-without-account-button";
import FeatureDatesAutoPlayCarousel from "../components/FeatureDatesAutoPlayCarousel";

const LandingPage = () => {

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-inner">
          <h1>DateSync</h1>
          <h3>The best place to plan your Perfect Dates</h3>
          <section className="buttons">
            <CreateAccountButton className="btn btn-secondary" />
            <TryWithoutAccountButton className="btn btn-secondary" />
           </section>
        </div>
      </section>
      <main className="featured">
        <div className="feature-carousel">
          <div className="feature-title">
            <h2>Feature Dates</h2>
          </div>
          <FeatureDatesAutoPlayCarousel />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
