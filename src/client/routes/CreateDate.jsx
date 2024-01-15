import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "../styles/CreateDate.scss";
import "../styles/SearchModals.scss";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FeatureDates from "../components/FeatureDates";
import mockFeatureDates from "../components/mockFeatureDates";
import CitySelector from "../components/CitySelector";
import SearchButtons from "../components/SearchButtons";
import SelectedRestaurantCard from "../components/add-to-date-displays/SelectedRestaurantCard";
import SelectedEventCard from "../components/add-to-date-displays/SelectedEventCard";
import SelectedActivityCard from "../components/add-to-date-displays/SelectedActivityCard";
import SelectedMovieCard from "../components/add-to-date-displays/SelectedMovieCard";

const CreateDate = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [cityString, setCityString] = useState('');
  const [componentsList, setComponentsList] = useState([{ category:'add' }]);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const { user, isAuthenticated } = useAuth0();
  // This is using react routers useNavigate which can redirect the user to a specified page seamlessly:
  const navigate = useNavigate();

  const handleCityChange = (selectedCoordinates) => {
    setCoordinates(selectedCoordinates);
  };

  const handleCityStringChange = (selectedCityString) => {
    setCityString(selectedCityString);
  };

  // Function to handle selections of any category of date component such as restaurant, activity, event and movie:
  const handleSelection = (category, data) => {
    // Add the selected item to componentsList and a new empty container:
    setComponentsList([...componentsList.slice(0, -1), { category, data }, { category: 'add' }]);
  };

  // This is a helper function to extract and format component data from the componentsList:
  const extractComponentData = (componentsList) => {
    return componentsList
      .filter(component => component.category !== 'add')
      .map(component => {
        // Format each component based on its category
        switch (component.category) {
          case 'restaurant':
            return formatRestaurantData(component.data);
          case 'event':
            return formatEventData(component.data);
          case 'movie':
            return formatMovieData(component.data);
          case 'activity':
            return formatActivityData(component.data);
          default:
            return null;
        }
      });
  };

  // Functions to format data for each date category:
  const formatRestaurantData = (data) => {
    return {
      category: 'restaurant',
      name: data.title,
      address: data.address,
      rating: data.rating,
      price_level: convertPriceLevel(data.price),
      cuisine_type: data.type,
      opening_hours: data.operating_hours,
      closing_hours: null, 
      website_url: data.website,
      photo_url: data.thumbnail
    };
  };

  const formatEventData = (data) => {
    return {  
      category: 'event',
      title: data.title,
      description: data.description,
      start_date_time: data.time, 
      end_date_time: null,     
      location_name: data.venue,
      address: data.address,
      event_type: null,
      price: null,
      event_url: data.link,
      photo_url: data.thumbnail
    };
  };

  const formatMovieData = (data) => {
    return {
      category: 'movie',
      movie_title: data.movie.title,
      start_time: data.showtime.time,
      duration: null,
      movie_theatre: data.showtime.theater.name,
      synopsis: data.movie.details,
      photo_url: data.movie.image,
      address: data.showtime.theater.address,
      movie_url: null
    };
  };

  const formatActivityData = (data) => {
    return {
      category: 'activity',
      activity_type: data.type,
      location_name: data.title,
      address: data.address,
      description: data.description,
      photo_url: data.thumbnail,
      activity_url: null
    };
  };

  // Function to convert the price level string to integer as we have it in $$:
  const convertPriceLevel = (priceLevelString) => {
    switch (priceLevelString) {
      case '$':
        return 1;
      case '$$':
        return 2;
      case '$$$':
        return 3;
      case '$$$$':
        return 4;
      default:
        return 0; 
    }
  };
  
  // Function to handle the 'Complete Date' button click:
  const handleCompleteDate = async () => {
    if (isAuthenticated && user) {
      // We extract and format the component data
      const formattedComponents = extractComponentData(componentsList);
      console.log(user.email);

      // We check if a date and time have been selected:
      let isDraft = false;
      let scheduledDate = null;
      if (!selectedDateTime) {
        isDraft = true;
      } else {
        scheduledDate = selectedDateTime.toISOString();
      }

      // We can prepare the data including the user email and formatted date and time from the date picker:
      const completeDateData = {
        user_email: user.email, 
        // Based on selected date and time from user we need to format the selected date and time in ISO 8601 format for the db to accept it:
        scheduled_date: scheduledDate,
        is_draft: isDraft,
        default_location: cityString,
        components: formattedComponents
      }

      try {
        // API call to save date details and navigate to dashboard upon success:
        const response = await axios.post('/api/save-complete-date', completeDateData);
        console.log('Date saved successfully:', response.data);
        navigate("/dashboard");
      } catch (error) {
        console.error('Error with handleCompleteDate for saving date:', error);
      }
    };
  };

  // Function to render an added date component container based on its category:
  const renderContainer = (item, index) => {
    switch (item.category) {
      case 'restaurant':
        return <SelectedRestaurantCard key={index} restaurant={item.data} />;
      case 'event':
        return <SelectedEventCard key={index} eventData={item.data} />;
      case 'movie':
        return <SelectedMovieCard key={index} movie={item.data} />;
      case 'activity':
        return <SelectedActivityCard key={index} activity={item.data} />;
      case 'add':
        return (
          <div key={index} className="component">
              <Box sx={{ "& > :not(style)": { m: 1 } }}>
                 <Fab
                  className="add-button"
                  size="small"
                  color="secondary"
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </Box>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <main className="create-date">
        <section className="featured">
          <div className="feature-carousel">
            <div className="feature-title">
              <h2>Feature Dates</h2>
            </div>
            <div className="cards">
              {mockFeatureDates.map((date, index) => (
                <div key={index}>
                  <FeatureDates date={date} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="date-time-pickers">
        <section className="city-picker">
            <CitySelector
              onCitySelect={handleCityChange}
              onCityNameSelect={handleCityStringChange}
            />
          </section>
          <section className="time-picker">
            <DateTimePicker
              className="picker"
              labelId="time-picker"
              label="Select Date & Time"
              sx={{ minWidth: 200 }}
              value={selectedDateTime}
              onChange={setSelectedDateTime}
              slotProps={{ textField: { variant: 'outlined' } }}
            />
          </section>
        </div>

        <section className="date-components">
            <div className="component">
              <SearchButtons 
                coordinates={coordinates} 
                cityString={cityString} 
                handleSelection={handleSelection}
                />
            </div>
          {/* Map over componentsList and render based on the category */}
          {componentsList.map((item, index) => renderContainer(item, index))} 
        </section>
        <section className="complete">
          <div className="buttons">
            <button onClick={handleCompleteDate}>Complete Date</button>
          </div>
        </section>
      </main>
    </LocalizationProvider>
  );
};

export default CreateDate;
