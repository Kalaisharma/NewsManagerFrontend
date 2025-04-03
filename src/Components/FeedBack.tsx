import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Grid,
  Typography,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
//import SearchIcon from "@mui/icons-material/Search";
import { FeedbackContext } from "../App";
import Swal from "sweetalert2";
import { FeedbackData } from "../Service/NewsServics";

// Country and State Lists
const countries = [
  { name: "India", code: "+91" },
  { name: "United States", code: "+1" },
  { name: "Canada", code: "+1" },
  { name: "Australia", code: "+61" },
  { name: "Germany", code: "+49" },
  { name: "France", code: "+33" },
  { name: "Italy", code: "+39" },
  { name: "Brazil", code: "+55" },
  { name: "Japan", code: "+81" },
  { name: "South Korea", code: "+82" },
  { name: "United Kingdom", code: "+44" },
  { name: "Russia", code: "+7" },
  { name: "Mexico", code: "+52" },
  { name: "China", code: "+86" },
  { name: "South Africa", code: "+27" },
  { name: "Argentina", code: "+54" },
  { name: "Spain", code: "+34" },
  { name: "Saudi Arabia", code: "+966" },
  { name: "Indonesia", code: "+62" },
  { name: "Turkey", code: "+90" },
];

const statesByCountry: Record<string, string[]> = {
  India: [
    "Tamil Nadu",
    "Kerala",
    "Karnataka",
    "Maharashtra",
    "Delhi",
    "Gujarat",
    "Punjab",
    "West Bengal",
    "Rajasthan",
    "Uttar Pradesh",
  ],
  "United States": [
    "California",
    "Texas",
    "New York",
    "Florida",
    "Illinois",
    "Ohio",
    "Georgia",
    "North Carolina",
    "Michigan",
    "Pennsylvania",
  ],
  Canada: [
    "Ontario",
    "Quebec",
    "British Columbia",
    "Alberta",
    "Manitoba",
    "Saskatchewan",
    "Nova Scotia",
    "New Brunswick",
    "Prince Edward Island",
    "Newfoundland and Labrador",
  ],
  Australia: [
    "New South Wales",
    "Victoria",
    "Queensland",
    "Western Australia",
    "South Australia",
    "Tasmania",
    "Australian Capital Territory",
    "Northern Territory",
    "Gold Coast",
    "Sunshine Coast",
  ],
  Germany: [
    "Bavaria",
    "Berlin",
    "Hamburg",
    "Hesse",
    "Saxony",
    "North Rhine-Westphalia",
    "Baden-Württemberg",
    "Lower Saxony",
    "Rhineland-Palatinate",
    "Thuringia",
  ],
  France: [
    "Île-de-France",
    "Provence-Alpes-Côte d'Azur",
    "Occitanie",
    "Nouvelle-Aquitaine",
    "Auvergne-Rhône-Alpes",
    "Brittany",
    "Normandy",
    "Hauts-de-France",
    "Grand Est",
    "Pays de la Loire",
  ],
  Italy: [
    "Lombardy",
    "Lazio",
    "Sicily",
    "Veneto",
    "Emilia-Romagna",
    "Tuscany",
    "Piedmont",
    "Campania",
    "Liguria",
    "Sardinia",
  ],
  Brazil: [
    "São Paulo",
    "Rio de Janeiro",
    "Bahia",
    "Minas Gerais",
    "Paraná",
    "Santa Catarina",
    "Ceará",
    "Amazonas",
    "Pernambuco",
    "Goiás",
  ],
  Japan: [
    "Tokyo",
    "Osaka",
    "Kyoto",
    "Hokkaido",
    "Aichi",
    "Fukuoka",
    "Hiroshima",
    "Kanagawa",
    "Chiba",
    "Saitama",
  ],
  "South Korea": [
    "Seoul",
    "Busan",
    "Incheon",
    "Daegu",
    "Daejeon",
    "Gwangju",
    "Ulsan",
    "Jeju",
    "Gangwon",
    "Gyeonggi",
  ],
  "United Kingdom": [
    "England",
    "Scotland",
    "Wales",
    "Northern Ireland",
    "London",
    "Manchester",
    "Birmingham",
    "Liverpool",
    "Edinburgh",
    "Glasgow",
  ],
  Russia: [
    "Moscow",
    "Saint Petersburg",
    "Novosibirsk",
    "Yekaterinburg",
    "Kazan",
    "Nizhny Novgorod",
    "Chelyabinsk",
    "Omsk",
    "Rostov-on-Don",
    "Ufa",
  ],
  Mexico: [
    "Mexico City",
    "Guadalajara",
    "Monterrey",
    "Puebla",
    "Tijuana",
    "León",
    "Cancún",
    "Chihuahua",
    "Mérida",
    "Toluca",
  ],
  China: [
    "Beijing",
    "Shanghai",
    "Guangzhou",
    "Shenzhen",
    "Chengdu",
    "Hangzhou",
    "Wuhan",
    "Nanjing",
    "Tianjin",
    "Chongqing",
  ],
  "South Africa": [
    "Gauteng",
    "Western Cape",
    "KwaZulu-Natal",
    "Eastern Cape",
    "Limpopo",
    "Mpumalanga",
    "North West",
    "Free State",
    "Northern Cape",
    "Pretoria",
  ],
  Argentina: [
    "Buenos Aires",
    "Córdoba",
    "Rosario",
    "Mendoza",
    "La Plata",
    "Mar del Plata",
    "San Miguel de Tucumán",
    "Salta",
    "Santa Fe",
    "Corrientes",
  ],
  Spain: [
    "Madrid",
    "Barcelona",
    "Valencia",
    "Seville",
    "Zaragoza",
    "Málaga",
    "Murcia",
    "Palma",
    "Bilbao",
    "Alicante",
  ],
  "Saudi Arabia": [
    "Riyadh",
    "Jeddah",
    "Mecca",
    "Medina",
    "Dammam",
    "Ta'if",
    "Tabuk",
    "Buraidah",
    "Abha",
    "Khobar",
  ],
  Indonesia: [
    "Jakarta",
    "Surabaya",
    "Bandung",
    "Medan",
    "Bekasi",
    "Tangerang",
    "Makassar",
    "Depok",
    "Semarang",
    "Palembang",
  ],
  Turkey: [
    "Istanbul",
    "Ankara",
    "Izmir",
    "Bursa",
    "Adana",
    "Gaziantep",
    "Konya",
    "Antalya",
    "Kayseri",
    "Mersin",
  ],
};

const FeedbackForm = () => {
  interface Country {
    name: string;
    code: string;
  }
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+00");
  const feedbackcontext = useContext(FeedbackContext);
  if (!feedbackcontext) {
    throw new Error("FeedbackForm must be used within a FeedbackProvider");
  }
  const {setfeedbackView } = feedbackcontext;
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    email: "",
    mobileNumber: "",
    feedback: "",
    country: "",
    state: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    address: "",
    email: "",
    mobileNumber: "",
    feedback: "",
  });

  const states = selectedCountry?.name
    ? statesByCountry[selectedCountry.name] || []
    : [];

  const validate = () => {
    const newErrors: any = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Invalid Mobile Number";
    }

    if (!formData.feedback.trim()) newErrors.feedback = "Feedback is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async() => {
    if (validate()) {
      console.log("Form Data:", {
        ...formData,
        country:selectedCountry,
        state:selectedState,
      });
      feedBackPopup();
      setfeedbackView(false); // Close the feedback form
      try {
        const response = FeedbackData(formData); 
        console.log("Feedback submitted successfully:", response);
        alert("success!");
      }
      catch (error) {
        console.error("Error submitting feedback:", error);
      }
      
    }
  };
  const feedBackPopup = () => {
      Swal.fire({
        title: "Success!",
        text: "Form Submitted Successfully",
        icon: "success",
        confirmButtonText: "Okay!",
      });
    }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Grid
      container
      alignItems="center"
      style={{ height: "auto", backgroundColor: "none" }}
    >
      <Grid item xs={10} md={8} lg={10}>
        <Paper elevation={3} style={{ padding: "32px", borderRadius: "16px" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ float: "right" }}
            onClick={() => setfeedbackView(false)}
          >
            ❌
          </Button>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Thank you so much for taking the time!
          </Typography>

          <Typography color="textSecondary" gutterBottom>
            Please provide the below details!
          </Typography>

          <TextField
            label="Full Name"
            name="fullName"
            fullWidth
            margin="normal"
            onChange={handleChange}
            error={!!errors.fullName}
            helperText={errors.fullName}
          />

          <TextField
            label="Address"
            name="address"
            fullWidth
            margin="normal"
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={countries}
                getOptionLabel={(option) => option.name}
                value={selectedCountry}
                onChange={(event, newValue: any) => {
                  setSelectedCountry(newValue);
                  setFormData({
                    ...formData,
                    country: newValue ? newValue.name : "",
                  });
                  setSelectedState(null);
                  setSelectedCountryCode(newValue ? newValue.code : "+91");
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Country" margin="normal" />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Autocomplete
                options={states}
                value={selectedState}
                onChange={(event, newValue) => {
                  setSelectedState(newValue)
                  setFormData({
                   ...formData,
                    state: newValue? newValue : "",
                  });
                }
                }
                disabled={!selectedCountry}
                renderInput={(params) => (
                  <TextField {...params} label="State" margin="normal" />
                )}
              />
            </Grid>
          </Grid>

          <TextField
            label="Email Id"
            name="email"
            fullWidth
            margin="normal"
            type="email"
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            label="Mobile Number"
            name="mobileNumber"
            fullWidth
            margin="normal"
            type="tel"
            onChange={handleChange}
            error={!!errors.mobileNumber}
            helperText={errors.mobileNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {selectedCountryCode}
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Feedback"
            name="feedback"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            onChange={handleChange}
            error={!!errors.feedback}
            helperText={errors.feedback}
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ marginTop: "16px" }}
            onClick={handleSubmit}
          >
            Submit Feedback
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FeedbackForm;
