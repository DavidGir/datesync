import mockFeatureDates from './mockFeatureDates';
import FeatureDates from './FeatureDates';
import '../styles/Autoplay.scss'

const FeatureDatesAutoPlayCarousel = () => {
  return (
    <div className="slider">
      <div className="slide-track">
        {/* Map over your mockFeatureDates or similar data */}
        {mockFeatureDates.map((date, index) => (
          <div key={index} className="slide">
            <FeatureDates date={date} />
          </div>
        ))}
        {/* Duplicate to create sense of infinite looping */}
        {mockFeatureDates.map((date, index) => (
          <div key={index + mockFeatureDates.length} className="slide">
            <FeatureDates date={date} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureDatesAutoPlayCarousel;
